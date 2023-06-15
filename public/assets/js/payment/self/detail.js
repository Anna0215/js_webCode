export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/self/detail.css">
    <div class="selfIndex pb70">
        <div class="info main">
            <ul class="c_list" v-if="userInfo">
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
                    <div class="val">{{userInfo.department.name}}</div>
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
            paymoney: '', // 要缴费用
            pay_id: '', //
            bill_id: '', //
            type: '' // 是否是消息列表点击过来的，如果有值，则是，否则不是
        }
    },
    created () {
        let This = this;
        // this.$toast('提示信息');
        function getparam (str) {
            if(location.href.indexOf("?") < 0){
                return false;
            }
            let href = location.href.split('?')[1];
            if(href.indexOf("&") < 0){
                let pair = href.split('=');
                if (pair[0] === str) {
                    return pair[1];
                }
            }else{
                let vars = href.split('&');
                for (let i = 0; i < vars.length; i++) {
                    let pair = vars[i].split('=');
                    if (pair[0] === str) {
                        return pair[1];
                    }
                }
            }
        }

        if(getparam ('type')){
            This.type = getparam ('type');
            // 有type则是从消息点击过来的
            This.billid = getparam('id');
        }else{
            // 直接
            This.billid = This.$route.query.id;
        }

        this.getUserInfo();
        this.getBillDetail();

    },
    methods: {
        getUserInfo () {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log(this.userInfo);
        },
        getBillDetail () {
            let This = this;
            let params = {
                id: This.billid
            };

            this.$post('/wap/payment/bill_detail',params,res=>{
                let data = res.data.result;
                console.log(data);
                this.billDetail = data;
                this.bill_id = data.id;
                this.pay_id = data.pay.id;
                if(data.pay_type===1||data.money_type===2){
                    // 是普通党费 或者 是自由缴费时金额是固定的
                    this.paymoney = data.money;
                }
                if(data.month){
                    this.billmonth = data.month.split(',');
                }

                if(this.type){
                    if(data.state==1){
                        this.$route.replace('record/detail?id='+this.billid);
                    }
                }
            });
        },
        next () {
            let This = this;

            if(This.userInfo.zuser.state == 5 || This.userInfo.zuser.state == 0){
                layer.open({
                   content:'您暂未绑定银行卡',
                   skin:'msg',
                   time:2
                });
                return false;
            }

            if (This.paymoney != '' && This.paymoney != '0.00' && This.paymoney != '0.0' && This.paymoney != '0') {
                This.$router.replace('/self/pay?money=' + This.paymoney+'&payid='+This.pay_id+'&billid='+This.bill_id);
            } else {
                layer.open({
                    content:'请输入缴费金额',
                    skin:'msg',
                    time:2
                });
            }
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