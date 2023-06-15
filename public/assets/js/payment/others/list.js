export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/others/list.css">
    <div class="selfIndex pb70" v-if="userInfo" style="margin-top:49px;">
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
    </div>
</div>
    `,
    data () {
        return {
            userInfo: '', // 个人信息
            name: '',
            idcard: '',
            billList: [], // 账单列表
            isMoreLoad: true,
            page:1
        }
    },
    created () {
        // this.$toast('提示信息');
        this.name = this.$route.query.name;
        this.idcard = this.$route.query.idcard;
        this.getOthersPayList();
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
                if(_this.$route.path == '/others/list'){
                    if(_this.isMoreLoad){ //this.isMoreLoad控制滚动是否加载更多，防止多次加载，是data里面设置的一个全局监控状态
                        // 开始请求数据时，isMoreLoad变为false,等数据请求结束时，再变为true
                        _this.isMoreLoad = false;
                        _this.getOthersPayList();
                        console.log();
                    }else{
                        return;
                    }
                }
            }
        });
    },
    methods: {
        getOthersPayList () {
            let This = this;
            let page = This.page;
            let arr = This.billList;
            let params = {
                'realname': This.name,
                'id_card': This.idcard,
                'page': page,
                'page_size': 100
            };

            this.$post('/wap/payment/get_dbill',params,res=>{
                let data = res.data;
                if(data.code==0){
                    localStorage.removeItem('daiName');
                    localStorage.removeItem('daiIDcard');
                    This.userInfo = data.data.user;
                    localStorage.setItem('otherUserInfo', JSON.stringify(data.data.user));
                    localStorage.setItem('otherUserId', data.data.user.id);
                    if(data.data.arr.length > 0){
                        page++;
                        let narr = arr.concat(data.data.arr);
                        This.page = page;
                        This.billList = narr;
                    }else{
                        console.log("滑动到了底部");
                    }
                    This.isMoreLoad = true;
                }else{
                    this.$msg(data.data);
                    let timer = setTimeout(function(){
                        This.$router.go(-1);
                        clearTimeout(timer);
                    },2000);
                    return false;
                }
            });
        },
        getBillList () {
            // 1已缴费 2 未缴费
            let This = this;
            let params = {'usernumber': localStorage.getItem('userId'), 'client_id': localStorage.getItem('clientId'), 'state': 2, 'page': 1, 'page_size': 20};
            this.$api.getBillList(params).then((data) => {
                console.log(data);
                This.billList = data;
                This.$router.push('/account/changesuccess');
            }).catch(err => {
                    console.log(err)
                }
            )
        },
        todetail (id) {
            let This = this;
            This.showMessage = true;
            This.$router.push('/others/detail?id=' + id);
        }
    }
}