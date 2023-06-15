export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/add4.css">
    <div class="addcard main mt15 pb70">
        <div class="addstep mb10">
            <div class="step">
                <img src="/assets/images/step4.png" alt="">
            </div>
            <div class="txt">
                <p class="active">确认信息</p>
                <p class="active">身份验证</p>
                <p class="active">上传证件</p>
                <p class="active">开户完成</p>
            </div>
        </div>
        <div class="changecard">
            <div class="addsuc tc">
                <img src="/assets/images/suc1.png" alt="">
                <p>党费缴纳账户开户成功！</p>
            </div>
            <ul>
                <li>
                    <div class="name">开户账号</div>
                    <div class="input">{{userInfo.bank.virtualacno}}（II类）</div>
<!--                    <div class="input">（II类）</div>-->
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">户　　名</div>
                    <div class="input">{{userInfo.bank.full_num}}</div>
<!--                    <div class="input">全名</div>-->
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">开户银行</div>
                    <div class="input">北京农村商业银行</div>
                    <div class="cb"></div>
                </li>
            </ul>
        </div>
        <div class="c_bot_btn"><input @click="next" type="button" value="去缴党费"></div>
    </div>
</div>
    `,
    data () {
        return {
            ismeau: false,
            userInfo: ''
        }
    },
    created () {
        let This = this;
        This.getUserInfo();
    },
    methods: {
        next () {
            this.$router.replace('/');
        },
        getUserInfo () {
            this.$post('/wap/payment/get_user',{},res=>{
                this.userInfo = res.data.result;
                localStorage.setItem('userInfo', JSON.stringify(res.data.result));
            });
        }
    }
}