export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/withdrawal.css">
    <div class="selfPay pb70 main mt15">
        <div class="accountInfo mb10">
            <div class="top">
                <div class="img fl"><img src="/assets/images/logo1.png" alt=""></div>
                <div class="info fl" @click="addAccount(userInfo.is_open)">
                    <p>{{userInfo.is_open == 1 ? userInfo.account_name : '自助开户'}}</p>
                    <p v-if="userInfo.is_open == 1">{{userInfo.bank.virtualacno}}（II类）</p>
                </div>
                <div class="cb"></div>
            </div>
            <div class="bot">账户余额：{{AccountMoney.acfreebal}}</div>
        </div>
    <h2 class="c_tit">转入账户</h2>
    <div class="changecard">
        <ul>
            <li>
                <div class="name">提现金额</div>
                <div class="input"><input type="number" v-model="money" placeholder="最少提现0.01"></div>
                <div class="cb"></div>
            </li>
        </ul>
    </div>
    <!-- 待缴费详情 end-->
    <div class="c_bot_btn" @click="next()"><input :class="{gray:!money}"  type="button" value="提交"></div>
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
            code: '', // 验证码
            pass: '', // 交易密码
            userInfo: '', // 个人信息
            AccountMoney: '', // 个人信息
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
        console.log(this.money);
        if (userInfo.zuser.is_open == 1) {
            This.getAccountMoney();
        }
    },
    methods: {
        next () {
            let This = this;
            if(This.money){
                This.tixian();
            }
        },
        getAccountMoney () {
            // 获取账户余额
            let This = this;
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/otherusesurplus',{},res=>{
                layer.closeAll();
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    This.AccountMoney = res.data.data;
                    console.log(this.AccountMoney);
                    localStorage.setItem('AccountMoney', JSON.stringify(res.data.data));
                }
            });
        },
        tixian () {
            let This = this;
            let params = {
                'Amount': This.money
            };
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/yieldcash',params,res=>{
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


                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    This.$router.replace('/account/withdrawal/res?money=' + This.money);
                }
            });
        },
        delcode () {
            this.code = '';
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