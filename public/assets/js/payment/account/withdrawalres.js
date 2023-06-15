export default {
    template:`
<div style="margin-top:74px;">
    <div class="selfPay pb70 main">
        <div class="c_mode_box">
            <div class="tmoney tc">
                <img src="/assets/images/suc1.png" alt="">
                <h2>提现成功</h2>
                <p class="money">提现金额<i>{{money}}</i><span>元</span></p>
            </div>
        </div>
        <!-- 待缴费详情 end-->
        <div class="c_bot_btn"><input @click="next()" type="button" value="确定"></div>
    </div>
</div>
    `,
    data () {
        return {
            money: ''
        }
    },
    created(){
        this.money = this.$route.query.money;
        console.log(this.money);
    },
    methods: {
        next () {
            this.$router.replace('/');
        }
    }
}