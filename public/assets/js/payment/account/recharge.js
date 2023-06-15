export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/recharge.css">
    <div class="accountIndex main mt15 pb70">
        <div class="accountInfo mb10">
            <div class="top">
                <div class="img fl"><img src="/assets/images/logo1.png" alt=""></div>
                <div class="info fl">
                    <p>{{userInfo.is_open == 1 ? userInfo.account_name : '自助开户'}}</p>
                    <p></p>
                </div>
                <div class="cb"></div>
            </div>
            <div class="bot oh"><span class="fl">人民币余额：{{AccountMoney.acfreebal}}元</span><span class="fr">可用余额：{{AccountMoney.freezeamount}}元</span></div>
        </div>
        <div class="cardList c_mode_box mb10">
            <h2>已绑定银行卡</h2>
            <ul>
                <li>
                    <div class="top oh">
                        <div class="bank fl pr">{{userInfo.bank.issuing_bank}}<span>储蓄卡</span></div>
                        <div class="card fr">{{userInfo.bank.card_number}}</div>
                    </div>
                    <div class="bot">
                        <div class="img fl"><img src="/assets/images/xian.png" alt=""></div>
                        <div class="txt fl">
                            <p>单笔限额：{{userInfo.bank.single_quota}}元</p>
                            <p>日累计限额：{{userInfo.bank.daily_cumulative_limit}}元（剩余{{AccountMoney.acfreebal}}元）</p>
                        </div>
                        <div class="cb"></div>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="c_list">
            <li>
                <div class="name">充值金额</div>
                <div class="val"><input type="number" v-model="money" placeholder="最少充值0.01元"></div>
            </li>
        </ul>
        <div class="c_bot_btn"><input @click="next" :class="{gray: money == ''}" type="button" value="提交"></div>
        <!--签约界面-->
        <div class="signBox" v-show="signState">
            <div class="center">
            <h2>请输入银行发送的验证码</h2>
            <p class="input pr"><input class="txt" type="tel" maxlength="6" v-model="smsKey" placeholder="请输入"><input type="button" class="btn"  @click="getma" v-model="matxt"></p>
            <p class="tel_ts">请输入 <span>{{userInfo.bank.mobile | mobileFormat}}</span>接收的验证码</p>
            <p class="btn">
                <!--<input type="button" @click="gocancel" value="取消">-->
                <input type="button" @click="gosign" value="确定">
            </p>
            </div>
        </div>
        <!--签约界面 end-->
        <!--开户提示框-->
        <div class="kaihu" v-show="showKai">
            <div class="center">
                <p class="txt">是否确认充值{{money}}元</p>
                <p class="btn">
                    <span @click="cancelKai()">取消</span>
                    <span @click="goKai()">确认</span>
                </p>
            </div>
        </div>
        <!--开户提示框 end-->
    </div>
    
    <!-- 判断用户信息完整性 -->
    <div class="kaihu" v-if="showKai2.show">
      <div class="center">
        <p class="txt">{{showKai2.message}}</p>
        <p class="btn">
          <span @click="gourl(showKai2.url)">{{showKai2.button}}</span>
        </p>
      </div>
    </div>
    <!-- 判断用户信息完整性 end -->
</div>
    `,
    data () {
        return {
            ismeau: false,
            money: '',
            userInfo: '',
            AccountMoney: '', // 账户余额
            signState: false, // 签约弹出框
            TransNo: '',
            msgdate: '',
            smsKey: '',
            matxt: '获取动态码', // 验证码
            maState: true, // 是否可以发送验证码
            showKai: false, // 显示开户提示
            showKai2:{
                show:false,
                url:'',
                message:'',
                button:''
            },//709,809,909,99报错
        }
    },
    created () {
        let This = this;
        let userInfo = localStorage.getItem('userInfo');
        This.userInfo = JSON.parse(userInfo);

        let AccountMoney = localStorage.getItem('AccountMoney');
        This.AccountMoney = JSON.parse(AccountMoney);
    },
    methods: {
        gocancel(){
            this.signState = false;
        },
        todetail () {
            let This = this;
            This.$router.push('/self/detail');
        },
        tabmeau () {
            let This = this;
            This.ismeau = !This.ismeau;
        },
        changecard () {
            let This = this;
            This.$router.push('/account/changecard');
        },
        addcard () {
            let This = this;
            This.$router.push('/account/addcard1');
        },
        next () {
            let This = this;
            // 去充值
            if(This.money){
                This.showKai = true;
            }
        },
        cancelKai () {
            this.showKai = false;
        },
        goKai () {
            this.showKai = false;
            this.getAccountRecharge();
            // This.$router.push('/account/recharge/pay?money=' + This.money);
        },
        gourl(url){
            if(url){
                this.$router.push(url);
            }else{
                this.showKai2 = false;
            }
        },
        getAccountRecharge () {
            // 获取账户余额
            let This = this;
            let params = {
                'Amount': This.money
            };
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/entryrecharge',params,res=>{
                layer.closeAll();

                if(res.data.code== '0709' || res.data.code=='0809' || res.data.code=='0909' || res.data.code=='099'){
                    if(res.data.code=='0709'){
                        this.showKai2 = {
                            show:true,
                            message:res.data.data,
                            url:'/account/identity',
                            button:'去认证'
                        }
                    }else if(res.data.code=='0909'){
                        this.showKai2 = {
                            show:true,
                            message:res.data.data,
                            url:'/account/myaccount',
                            button:'去补充'
                        }
                    }else if(res.data.code=='0809'){
                        this.showKai2 = {
                            show:true,
                            message:res.data.data,
                            url:'/account/identity?toinfo=1',
                            button:'去补充'
                        }
                    }else if(res.data.code=='099'){
                        this.showKai2 = {
                            show:true,
                            message:res.data.data,
                            url:'',
                            button:'确定'
                        }
                    }
                    return false;
                }




                if(res.data.code==0){
                    This.signState = false;
                    This.$msg('充值成功');
                    let timer = setTimeout(function(){
                        This.$router.replace('/account');
                        clearTimeout(timer);
                    },2000)
                }else if(res.data.code==6){
                    // this.$msg(res.data.data);
                    this.signState = true;
                    this.getma();
                }else{
                    this.$msg(res.data.data);
                }
            });
        },
        getma () {
            let This = this;
            if (This.maState) {
                This.getSignCodeA();
                This.maState = false;
                let i = 60;
                This.matxt = i + 's';
                let Timer = setInterval(function () {
                    if (i > 1) {
                        i--;
                        This.matxt = i + 's';
                    } else {
                        This.matxt = '获取动态码';
                        clearInterval(Timer);
                        This.maState = true;
                    }
                }, 1000)
            }
        },
        getSignCodeA () {
            // 获取账户余额
            console.log("签约发送验证码");
            let This = this;

            this.$post('/wap/payment/othersigncode',{},res=>{
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    // This.$msg('验证码发送成功');
                    console.log("签约发送验证码返回Rqirqsn="+res.data.data.Rqirqsn);
                    console.log("签约发送验证码返回Rqirqdate="+res.data.data.Rqirqdate);
                    This.TransNo = res.data.data.Rqirqsn;
                    This.msgdate = res.data.data.Rqirqdate;
                }
            });
        },
        gosign(){
            // 去签约
            let This = this;
            if(!This.smsKey){
                This.$msg("请输入验证码");
                return false;
            }
            This.signState = false;
            let params = {
                'TransNo': This.TransNo, // 发送验证码流水号 Rqirqsn
                'msgdate': This.msgdate, // 发送验证码时间 Rqirqdate
                'smsKey': This.smsKey // 短信验证码
            };
            console.log("去签约=params");
            console.log(params);
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/othersignadd',params,res=>{
                layer.closeAll();
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    This.getAccountRecharge();
                }
            });
        }
    }
}