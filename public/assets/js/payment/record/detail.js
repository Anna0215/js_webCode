export default {
    template:`
<div style="margin-top:30px;">
    <link rel="stylesheet" href="/assets/js/payment/record/detail.css">
    <div class="selfIndex pb70 pt15" v-if="billDetail">
        <div class="main mb10">
            <div class="c_mode_box">
                <div class="tmoney tc" v-if="billDetail.order.status == 1">
                    <img src="/assets/images/suc1.png" alt="">
                    <h2>缴费完成</h2>
                    <p class="money"><i>￥</i>{{billDetail.money | moneyFormat}}</p>
                </div>
                <div class="tmoney tc" v-else >
                    <img src="/assets/images/error.png" alt="">
                    <h2>缴费失败</h2>
                </div>
            </div>
        </div>
        <div class="main" v-if="billDetail.order.status == 1">
            <div class="c_mode_box">
                <div class="payres">
                    <ul>
                        <li>
                            <div class="name">付 款 信 息</div>
                            <div class="val">{{billDetail.order.pay_bank}}({{billDetail.order.pay_number.substring(billDetail.order.pay_number.length-4)}})</div>
                        </li>
                        <li>
                            <div class="name">交 易 单 号</div>
                            <div class="val">{{billDetail.order.acqssn}}</div>
                        </li>
                        <li>
                            <div class="name">银行流水号</div>
                            <div class="val">{{billDetail.order.bank_number\t}}</div>
                        </li>
                        <li>
                            <div class="name">交 易 时 间</div>
                            <div class="val">{{dateFormat(billDetail.order.merchant_date)}}</div>
                        </li>
                        <li>
                            <div class="name">收 费 单 位</div>
                            <div class="val">{{billDetail.order.charging_unit}}(代收)</div>
                        </li>
                        <li>
                            <div class="name">缴 费 人 员</div>
                            <div class="val">{{billDetail.brawee_name}}<span class="dairen" v-if="billDetail.type == 2">代人缴费</span><span class="dairen" v-if="billDetail.type == 3">他人代缴</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="info main">
            <h2 class="c_tit">党员信息</h2>
            <ul class="c_list">
                <li>
                    <div class="name">姓　　名</div>
                    <div class="val">{{billDetail.uid.nickname}}</div>
                </li>
                <li>
                    <div class="name">身份证号</div>
                    <div class="val">{{billDetail.uid.idcard | idcardFormat}}</div>
                </li>
                <li>
                    <div class="name">所在支部</div>
                    <div class="val">{{userInfo.department.name}}</div>
                </li>
            </ul>
        </div>
        <!-- 待缴费详情-->
        <div class="detail main" v-if="billDetail">
            <h2 class="c_tit">党费详情</h2>
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
                    <div class="val red" >￥{{billDetail.money | moneyFormat}}</div>
                </li>
            </ul>
        </div>
        <!-- 待缴费详情 end-->
        <div class="c_bot_btn" @click="next()"><input type="button" value="返回"></div>
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
            paymoney: '' // 要缴费用
        }
    },
    created () {
        let This = this;
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        This.userInfo = userInfo;
        This.billid = This.$route.query.id;
        // This.getBillDetail();
        This.getUserBillHistoryDetail();
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
        getUserBillHistoryDetail () {
            let This = this;
            let params = {
                'id': This.billid
            };

            this.$post('/wap/payment/billyj_detail',params,res=>{
                let data = res.data;
                if(data.code==0){
                    This.billDetail = data.data;
                    if (data.data.pay_type === 1 || data.data.money_type === 2) {
                        // 是普通党费 或者 是自由缴费时金额是固定的
                        This.paymoney = data.data.money;
                    }
                    if (data.data.month) {
                        var billmonth = data.data.month.split(',');
                        This.billmonth = billmonth;
                    }
                }else{
                    this.$msg(data.data);
                }
            });
        },
        next () {
            let This = this;
            This.$router.go(-1);
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
        }
    }
}