export default {
    template:`
<div style="margin-top:30px;">
    <link rel="stylesheet" href="/assets/js/payment/record/index.css">
    <div class="recordIndex pb70">
        <div class="kong" v-if="billList.length == 0">
            <div class="center">
                <img src="/assets/images/kong.png" alt="">
                <p>暂无缴费记录</p>
            </div>
        </div>
        <ul class="recordList main" v-if="billList.length > 0">
            <li  @click="todetail(item.id)" v-for="(item, index) in billList" :item="item" :key="index">
                <div class="left">
                    <h2 class="name ellipsis">{{item.pay.project}}</h2>
                    <p class="time">{{item.payment_time | dateStrFormat}}</p>
                </div>
                <div class="right">
                    <p class="money" :calss="{'dan': (item.type == 1)}"><span>￥</span>{{item.money}}</p>
                    <p class="dai" v-if="item.type == 2"><span>代人缴纳</span></p>
                    <p class="dai" v-if="item.type == 3"><span>他人代缴</span></p>
                </div>
            </li>
        </ul>
    </div>
</div>
    `,
    data () {
        return {
            billList: [], // 账单列表
            isMoreLoad: true,
            page:1
        }
    },
    created () {
        let This = this;
        // This.getBillList();
        This.getUserBillHistory();

        // 清除代人缴费的输入信息
        localStorage.removeItem('daiName');
        localStorage.removeItem('daiIDcard');
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
                if(_this.$route.path == '/record/index'){
                    if(_this.isMoreLoad){ //this.isMoreLoad控制滚动是否加载更多，防止多次加载，是data里面设置的一个全局监控状态
                        // 开始请求数据时，isMoreLoad变为false,等数据请求结束时，再变为true
                        _this.isMoreLoad = false;
                        _this.getUserBillHistory();
                        console.log();
                    }else{
                        return;
                    }
                }
            }
        });
    },
    methods: {
        todetail (id) {
            let This = this;
            This.$router.push('/record/detail?id=' + id);
        },
        getBillList () {
            let state = 1; // 1已缴费 2 未缴费
            let This = this;
            let params = {'usernumber': localStorage.getItem('userId'), 'client_id': localStorage.getItem('clientId'), 'state': state, 'page': 1, 'page_size': 20};
            this.$api.getBillList(params).then((data) => {
                This.billList = data;
            }).catch(err => {
                    console.log(err)
                }
            )
        },
        getUserBillHistory () {
            let state = 1; // 1已缴费 2 未缴费
            let This = this;
            let page = This.page;
            let arr = This.billList;
            let params = {
                page,
                'page_size': 20
            };

            this.$post('/wap/payment/bill_history',params,res=>{
                let data = res.data.result;
                if(data.length>0){
                    this.page++;
                    this.billList = arr.concat(data);
                }else{
                    console.log('滑动到了底部');
                }
                this.isMoreLoad = true;
            });
        }
    }
}