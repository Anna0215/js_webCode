export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/self/payres.css">
    <div class="selfPay pb70 main" v-if="show" style="margin-top:74px;">
        <div class="c_mode_box">
            <div class="tmoney tc" v-if="payres.status == 1">
                <img src="/assets/images/suc1.png" alt="">
                <h2>缴费完成</h2>
                <p class="money"><i>￥</i>{{payres.pay_money | moneyFormat}}</p>
            </div>
            <div class="tmoney tc" v-else>
                <img src="/assets/images/error.png" alt="">
                <h2>缴费失败</h2>
            </div>
            <div class="payres" v-if="payres.status == 1">
                <ul>
                    <li>
                        <div class="name">付 款 信 息</div>
                        <div class="val">{{payres.pay_bank}}({{payres.pay_number.substring(payres.pay_number.length-4)}})</div>
                    </li>
                    <li>
                        <div class="name">收 费 单 位</div>
                        <div class="val">{{payres.charging_unit\t}}(代收)</div>
                    </li>
                    <li>
                        <div class="name">党 员 姓 名</div>
                        <div class="val">{{userInfo.nickname}}</div>
                    </li>
                    <li>
                        <div class="name">身 份 证 号</div>
                        <div class="val">{{userInfo.idcard | idcardFormat}}</div>
                    </li>
                    <li>
                        <div class="name">所 在 支 部</div>
                        <div class="val">{{userInfo.department.name}}</div>
                    </li>
                    <li>
                        <div class="name">交 易 时 间</div>
                        <div class="val">{{dateFormat(payres.merchant_date)}}</div>
                    </li>
                    <li>
                        <div class="name">交 易 单 号</div>
                        <div class="val">{{payres.number}}</div>
                    </li>
                    <li>
                        <div class="name">银行流水号</div>
                        <div class="val">{{payres.acqssn\t}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 待缴费详情 end-->
        <div class="c_bot_btn"><input @click="next()" type="button" value="完成"></div>
    </div>
</div>
    `,
    data () {
        return {
            payres: '', // 支付返回结果
            userInfo: '',
            show:false
        }
    },
    created () {
        let This = this;
        let payres = localStorage.getItem('payres');
        This.payres = JSON.parse(payres);
        console.log(this.payres);
        console.log(this.payres.pay_number.substring(this.payres.pay_number.length - 4));
        let userInfo = localStorage.getItem('userInfo');
        This.userInfo = JSON.parse(userInfo);
        setTimeout(()=>{
            this.show = true;
        },500);
    },
    methods: {
        dateFormat (date) {
            console.log(date);
            let y = date.substr(0,4);
            let m = date.substr(4,2);
            let d = date.substr(6,2);
            let h = date.substr(8,2);
            let mm = date.substr(10,2);
            let s = date.substr(12,2);
            let str = y+'-'+m+'-'+d+' '+h+':'+mm +':'+s;
            return str;
        },
        next () {
            this.$router.replace('/');
        }
    }
}