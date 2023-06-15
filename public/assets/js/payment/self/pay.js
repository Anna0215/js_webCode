export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/self/pay.css">
    <div class="selfPay pb70 main">
        <div class="c_mode_box tmoney tc">
            <h2>缴费金额</h2>
            <p class="money"><i>￥</i>{{money | moneyFormat}}</p>
        </div>
        <h2 class="c_tit">支付账号</h2>
            <div class="c_mode_box account">
            <p class="name">绑定账号：{{userInfo.bank.issuing_bank}}（{{userInfo.bank.card_number.substring(userInfo.bank.card_number.length-4)}}）</p>
            <p class="xian">限额单笔：{{userInfo.bank.single_quota | moneyFormat}}元 日累计{{userInfo.bank.daily_cumulative_limit | moneyFormat}}元</p>
        </div>
        <!-- 待缴费详情 end-->
        <div class="c_bot_btn" @click="next()"><input type="button" value="确认支付"></div>
        <!--确认缴费提示框-->
        <div class="xiaohu" v-show="showJie">
            <div class="center">
<!--                <p class="txt">点击确认支付，将从您尾号{{userInfo.bank.card_number.substring(userInfo.bank.card_number.length-4)}}的{{userInfo.bank.issuing_bank}}储蓄卡扣除{{money}}元作为本次党费？</p>-->
                    <p class="txt">点击确认支付，将从您的余额中扣除{{money}}元作为本次党费？</p>
                <p class="btn">
                    <span @click="cancelJie()">取消</span>
                    <span @click="goJie()">确定支付</span>
                </p>
            </div>
        </div>
        <!--确认缴费提示框 end-->
        <!--签约界面-->
        <div class="signBox" v-show="signState">
            <div class="center">
                <h2>请输入银行发送的验证码</h2>
                <p class="input pr"><input class="txt" type="tel" maxlength="6" v-model="smsKey" placeholder="请输入">
                    <input type="button" class="btn"  @click="getma" v-model="matxt">
                </p>
                <p class="tel_ts">请输入 <span>{{userInfo.bank.mobile | mobileFormat}}</span>接收的验证码</p>
                <p class="btn">
                    <input type="button" @click="gosign" value="确定">
                </p>
            </div>
        </div>
        <!--签约界面 end-->
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
            money: '', // 缴费金额
            payid: '', //
            billid: '', //
            code: '', // 验证码
            matxt: '获取动态码', // 验证码
            maState: true, // 是否可以发送验证码
            userInfo: '', // 个人信息
            showJie: false, // 显示解绑提示
            signState: false, // 签约弹出框
            TransNo: '',
            msgdate: '',
            smsKey: '',
            ispaying: true, // 支付中，不能重复点击
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
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        This.userInfo = userInfo;
        This.money = This.$route.query.money;
        This.payid = This.$route.query.payid;
        This.billid = This.$route.query.billid;
    },
    methods: {
        next () {
            let This = this;
            if(Number(This.money) > Number(This.userInfo.bank.single_quota)){
                This.$msg('支付金额超出单笔限额');
                return false;
            }
            if(Number(This.money) > Number(This.userInfo.bank.daily_cumulative_limit)){
                This.$msg('支付金额超出日累计限额');
                return false;
            }
            This.showJie = true;
        },
        gocancel(){
            this.signState = false;
        },
        delcode () {
            this.code = '';
        },
        cancelJie () {
            this.showJie = false;
        },
        goJie () {
            this.showJie = false;
            // 去支付
            this.getPay();
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
        getPay () {
            let This = this;
            if(!This.ispaying){
                console.log('支付中不支持重复提交');
                return false;
            }
            This.ispaying = false;
            let params = {
                'TranAmt': This.money,
                'pay_id': This.payid,
                'bill_id': This.billid,
                'type': '1' // `type 1给自己缴费2代缴',
            };

            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/orderpay',params,res=>{
                layer.closeAll();
                let data = res.data;

                if(data.code== '0709' || data.code=='0809' || data.code=='0909' || data.code=='099'){
                    if(data.code=='0709'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/identity',
                            button:'去认证'
                        }
                    }else if(data.code=='0909'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/myaccount',
                            button:'去补充'
                        }
                    }else if(data.code=='0809'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/identity?toinfo=1',
                            button:'去补充'
                        }
                    }else if(data.code=='099'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'',
                            button:'确定'
                        }
                    }
                    return false;
                }


                if(data.code==0){
                    localStorage.setItem('payres', JSON.stringify(data.data));
                    This.$router.replace('/self/payres');
                }else if(data.code==6){
                    // 去充值
                    This.getAccountRecharge()
                }else{
                    this.ispaying = true;
                    this.$msg(data.data);
                }
                This.ispaying = true;
            });
        },
        getAccountRecharge () {
            // 去充值
            let This = this;
            let params = {
                'Amount': This.money
            };

            this.$post('/wap/payment/entryrecharge',params,res=>{
                let data = res.data;

                if(data.code== '0709' || data.code=='0809' || data.code=='0909' || data.code=='099'){
                    if(data.code=='0709'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/identity',
                            button:'去认证'
                        }
                    }else if(data.code=='0909'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/myaccount',
                            button:'去补充'
                        }
                    }else if(data.code=='0809'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'/account/identity?toinfo=1',
                            button:'去补充'
                        }
                    }else if(data.code=='099'){
                        this.showKai2 = {
                            show:true,
                            message:data.data,
                            url:'',
                            button:'确定'
                        }
                    }
                    return false;
                }

                if(data.code==0){
                    This.ispaying = true;
                    This.getPay();
                }else if(data.code==6){
                    // 返回6去签约
                    This.signState = true;
                    This.getma();
                }else{
                    this.$msg(data.data);
                }
            });
        },
        getSignCodeA () {
            // 签约发送验证码
            console.log("签约发送验证码");
            let This = this;

            this.$post('/wap/payment/othersigncode',{},res=>{
                if(res.data.code==0){
                    This.$msg('验证码发送成功');
                    This.TransNo = res.data.data.Rqirqsn;
                    This.msgdate = res.data.data.Rqirqdate;
                }else{
                    this.$msg(res.data.data);
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

            this.$post('/wap/payment/othersignadd',params,res=>{
                if(res.data.code==0){
                    This.ispaying = true;
                    This.getPay();
                }else{
                    this.$msg(res.data.data);
                }
            });
        },
        gourl(url){
            if(url){
                this.$router.push(url);
            }else{
                this.showKai2 = false;
            }
        },
    }
}