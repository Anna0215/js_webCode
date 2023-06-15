export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/others/index.css">
    <div class="othsersindex pb70">
        <div class="info main">
            <ul class="c_list">
                <li>
                    <div class="name">姓　　名</div>
                    <div class="val"><input type="text" placeholder="请输入姓名" v-model="name" ></div>
                </li>
                <li>
                    <div class="name">身份证号</div>
                    <div class="val"><input type="text" placeholder="请输入身份证号" v-model="idcard" ></div>
                </li>
            </ul>
        </div>
        <div class="wents">
            <h2><i>*</i>温馨提示</h2>
            <p>输入对方的姓名、身份证号码后，即可进行党费代缴。</p>
        </div>
        <div class="c_bot_btn"><input :class="{gray:( !name|| !idcard )}" @click="next" type="button" value="确定"></div>
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
            name: '', // 姓名
            idcard: '', // 身份证号
            userInfo: '',
            showKai: false, // 显示开户提示
        }
    },
    created () {
        let This = this;
        let userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        This.userInfo = userInfo;
        let daiName = localStorage.getItem('daiName');
        if(daiName){
            This.name = daiName;
        }
        let daiIDcard = localStorage.getItem('daiIDcard');
        if(daiIDcard){
            This.idcard = daiIDcard;
        }
    },
    methods: {
        next () {
            let This = this;
            this.idcard = this.idcard.toUpperCase();
            let regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/;
            if (!regIdCard.test(This.idcard)) {
                layer.open({
                    content:'身份证号填写错误',
                    skin:'msg',
                    time:2
                });
                return false;
            }
            if(This.name && This.idcard){
                if(This.userInfo.zuser.is_open == 0){
                    This.showKai = true;
                }else{
                    localStorage.setItem('daiName', This.name);
                    localStorage.setItem('daiIDcard', This.idcard);
                    This.$router.push({path: '/others/list', query: {name: This.name, idcard: This.idcard}});
                }
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