export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/self/index.css">
    <div class="selfIndex pb70" v-if="userInfo">
        <div class="info main">
            <ul class="c_list">
                <li>
                    <div class="name">姓　　名</div>
                    <div class="val">{{userInfo.nickname ? userInfo.nickname : ''}}</div>
                </li>
                <li v-if="userInfo.idcard">
                    <div class="name">身份证号</div>
                    <div class="val">{{userInfo.idcard | idcardFormat}}</div>
                </li>
                <li v-if="userInfo.department.name">
                    <div class="name">所在支部</div>
                    <div class="val">{{userInfo.department.name}}</div>
                </li>
            </ul>
        </div>
        <div class="no tc" v-if="billList.length == 0">
            <img src="/assets/images/ts1.png" alt="">
            <p>暂无待缴党费</p>
        </div>
        <div class="list main" v-if="billList.length > 0">
            <h2 class="c_tit">待缴党费</h2>
            <ul>
                <li @click="todetail(item.id)" v-for="(item, index) in billList" :item="item" :key="index">
                    <div class="left">
                        <p class="title ellipsis">{{item.pay.project}}</p>
                        <p class="labels">
                            <span>{{item.pay_type == 1 ? '党费' : '特殊党费'}}</span>
                        </p>
                    </div>
                    <div class="right">
                    <p class="money" v-if="item.money_type == 1 && item.pay_type == 2">自定义金额</p>
                    <p class="money" v-if="item.money_type == 2 || item.pay_type == 1"><i>￥</i>{{item.money | moneyFormat}}</p>
                    <p class="time">{{item.pay.payment_deadline}} 截止</p>
                    </div>
                </li>
            </ul>
        </div>
        <!--开户提示框-->
        <div class="kaihu" v-show="showKai">
            <div class="center">
                <p class="txt">您暂未开户，请先进行开户操作</p>
                <p class="btn">
                    <span @click="cancelKai()">取消</span>
                    <span @click="goKai()">去开户</span>
                </p>
            </div>
        </div>
    <!--开户提示框 end-->
    </div>
</div>
    `,
    data () {
        return {
            userInfo: '', // 个人信息
            showKai: false, // 显示开户提示
            billList: [], // 账单列表
            isMoreLoad: true,
            page:1
        }
    },
    created () {
        this.getUserInfo();

        // 清除代人缴费的输入信息
        localStorage.removeItem('daiName');
        localStorage.removeItem('daiIDcard');
    },
    watch:{
    },
    mounted () {
        var _this = this;
        window.addEventListener('scroll', function(){
            // 向上滚动的那一部分高度
            var scr = document.documentElement.scrollTop || document.body.scrollTop;
            // 屏幕高度也就是当前设备静态下你所看到的视觉高度
            var clientHeight = document.documentElement.clientHeight;
            // 整个网页的实际高度，兼容Pc端
            var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            // 当滚动到距离页面底部100px时触发加载更多
            if(scr + clientHeight + 100 >= scrHeight){
                if(_this.$route.path == '/self/index'){
                    if(_this.isMoreLoad){ //this.isMoreLoad控制滚动是否加载更多，防止多次加载，是data里面设置的一个全局监控状态
                        // 开始请求数据时，isMoreLoad变为false,等数据请求结束时，再变为true
                        _this.isMoreLoad = false;
                        _this.getBillList();
                    }else{
                        return;
                    }
                }
            }
        });
    },
    methods: {
        //获取用户信息
        getUserInfo () {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.getBillList();
        },
        getBillList () {
            let state = 2; // 1已缴费 2 未缴费
            let This = this;
            let page = This.page;
            let arr = This.billList;
            let params = {
                state: state,
                page: page,
                page_size: 100
            };

            this.$post('/wap/payment/get_bill',params,res=>{
                console.log('账单');
                if(res.data.result.length>0){
                    this.page++;
                    this.billList = arr.concat(res.data.result);
                }else{
                    console.log("滑动到了底部");
                }
                this.isMoreLoad = true;
            });
        },
        todetail (id) {
            let This = this;

            This.$router.push('/self/detail?id=' + id);


            if(This.userInfo.zuser.is_open == 0){
                This.showKai = true;
            }else{
                This.$router.push('/self/detail?id=' + id);
            }

        },
        cancelKai () {
            this.showKai = false;
        },
        goKai () {
            this.showKai = false;
            this.$router.push('/account/add1');
        }
    }
}