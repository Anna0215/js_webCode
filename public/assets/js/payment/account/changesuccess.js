export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/changesuccess.css">
    <div class="changesuccess">
        <div class="center tc">
            <img src="/assets/images/suc1.png" alt="">
            <p class="txt">银行卡绑定成功！</p>
            <p class="btn"><input @click="toaccount" type="button" value="完成"></p>
        </div>
    </div>
</div>
    `,
    data () {
        return {
        }
    },
    created () {
        let This = this;
        This.getUserInfo();
        localStorage.removeItem('NewCardName');
        localStorage.removeItem('NewCardNum');
        localStorage.removeItem('NewCardPhone');
    },
    methods: {
        toaccount () {
            this.$router.replace('/account');
        },
        getUserInfo () {
            let This = this;

            this.$post('/wap/payment/get_user',{},res=>{
                let data = res.data.result;
                This.userInfo = data;
                localStorage.setItem('userInfo', JSON.stringify(data));
                // This.getBillList();
            });
        }
    }
}