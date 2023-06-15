export default {
    template:`
<div style="margin-top:30px;">
    <link rel="stylesheet" href="/assets/js/payment/others/detail.css">
    <div class="selfIndex pb70">
        <div class="info main">
            <ul class="c_list">
                <li>
                    <div class="name">姓　　名</div>
                    <div class="val">{{userInfo.nickname}}</div>
                </li>
                <li>
                    <div class="name">身份证号</div>
                    <div class="val">{{userInfo.idcard | idcardFormat}}</div>
                </li>
                <li>
                    <div class="name">所在支部</div>
                    <div class="val">{{userInfo.branchname}}</div>
                </li>
            </ul>
        </div>
        <!-- 待缴费详情-->
        <div class="detail main" v-if="billDetail">
            <h2 class="c_tit">待缴费详情</h2>
            <ul class="c_list mb10">
                <li>
                    <div class="name">缴费类型</div>
                    <div class="val">{{billDetail.pay_type == 1 ? '党费' : '特殊党费'}}</div>
                </li>
                <li>
                    <div class="name">缴费项目</div>
                    <div class="val">{{billDetail.pay.project}}</div>
                </li>
            </ul>
            <ul class="c_list jiao_detail mb10" v-if="billDetail.pay_type == 1">
                <li>
                    <div class="name title">缴费明细</div>
                </li>
                <li v-for="(item, index) in billmonth" :item="item" :key="index">
                    <div class="name dot">{{item}}</div>
                    <div class="val red">￥{{billDetail.money/billmonth.length | moneyFormat}}</div>
                </li>
            </ul>
            <ul class="c_list mb10">
                <li>
                    <div class="name title">缴费说明</div>
                </li>
                <li>
                    <div class="name title">{{billDetail.pay.explain}}</div>
                    <div class="imgs">
                        <div class="img" v-for="(item, index) in billDetail.pay.imgs" :item="item" :key="index" @click="seeBigImg(item)">
                            <img :src="item" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="c_list mb10">
                <li>
                    <div class="name">截止时间</div>
                    <div class="val">{{billDetail.pay.payment_deadline}}</div>
                </li>
                <li>
                    <div class="name">缴费金额</div>
                    <div class="val red" v-if="billDetail.money_type == 1 && billDetail.pay_type == 2"><input type="number" style="text-align: right;" placeholder="请输入金额" v-model="paymoney"></div>
                    <div class="val red" v-if="billDetail.pay_type == 1 || billDetail.money_type == 2">￥{{billDetail.money | moneyFormat}}</div>
                </li>
            </ul>
        </div>
        <!-- 待缴费详情 end-->
        <div class="c_bot_btn" @click="next()"><input :class="{gray:(paymoney === '' || paymoney === '0.00' || paymoney === '0.0' || paymoney === '0')}" type="button" value="支付"></div>
        <!--查看大图-->
        <div id="bigImg" v-show="bigState">
            <div class="img">
                <div class="center">
                    <span class="close" @click="close"></span>
                    <img :src="bigSrc" alt="">
                </div>
            </div>
        </div>
        <!--查看大图 end-->
        <!--公用弹出框-->
<!--        <c_message v-show="showMessage" :title="title" :desc="desc" @psure="sure" @pcancel="cancel"></c_message>-->
        <div class="message" v-if="showMessage">
            <div class="c_message_box">
                <div class="close" @click="cancel"><img src="/assets/images/close3.png" alt=""></div>
                <h2 class="c_message_title">{{title}}</h2>
                <div class="c_message_txt">{{desc}}</div>
                <div class="c_message_btns">
                    <div class="cancel" @click="cancel">取消</div>
                    <div class="sure" @click="sure">确定</div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    data () {
        return {
            bigState: false, // 是否显示大图
            bigSrc: '', // 大图路径
            userInfo: '', // 用户信息
            billDetail: '', // 账单详情
            billid: '', // 账单id
            billmonth: [], // 缴费明细 的月份
            title: '缴费提醒',
            desc: '代他人缴费将从您的账户扣款，缴费前请详细确认人员信息是否正确。',
            paymoney: '',
            showMessage: false,
            pay_id: '', //
            bill_id: '', //
        }
    },
    components: {
        // c_message: Message
    },
    created () {
        let This = this;
        var userInfo = localStorage.getItem('otherUserInfo');
        userInfo = JSON.parse(userInfo);
        This.userInfo = userInfo;
        This.billid = This.$route.query.id;
        This.getBillDetail();
    },
    methods: {
        getBillDetail () {
            let This = this;
            let params = {
                id: This.billid,
                uid:this.userInfo.id
            };
            this.$post('/wap/payment/bill_detail',params,res=>{
                let data = res.data.result;
                This.billDetail = data;
                This.bill_id = data.id;
                This.pay_id = data.pay.id;
                if (data.pay_type === 1 || data.money_type === 2) {
                    This.paymoney = data.money;
                }
                if (data.month) {
                    var billmonth = data.month.split(',');
                    This.billmonth = billmonth;
                }
            });
        },
        next () {
            let This = this;
            This.showMessage = true;
            console.log(1111);
        },
        seeBigImg (src) {
            let This = this;
            This.bigSrc = src;
            console.log(src);
            This.bigState = true;
        },
        close () {
            let This = this;
            This.bigState = false;
        },
        cancel () {
            let This = this;
            This.showMessage = false;
        },
        sure () {
            let This = this;
            This.showMessage = false;
            if(This.paymoney != '' && This.paymoney != '0.00' && This.paymoney != '0.0' && This.paymoney != '0'){
                This.$router.replace('/others/pay?money=' + This.paymoney +'&payid='+This.pay_id+'&billid='+This.bill_id);
            } else {
                This.$toast('请输入缴费金额');
            }
            // This.$router.push('/others/choosebank?money=' + This.paymoney);
        }
    }
}