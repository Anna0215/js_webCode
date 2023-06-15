const account = {
    template:`
    <div class="accountIndex main mt15 pb20" v-cloak>
        <link rel="stylesheet" href="/assets/js/payment/account/account_index.css">
    
        <div class="accountInfo mb10" v-if="userInfo.zuser.is_open == 1">
            <div class="top" @click="tabmeau()">
                <div class="img fl"><img src="/assets/images/logo1.png" alt=""></div>
                <div class="info fl" @click="addAccount(userInfo.zuser.is_open)">
                    <p>{{userInfo.zuser.is_open == 1 ? userInfo.zuser.account_name : '自助开户'}}</p>
                    <p v-if="userInfo.zuser.is_open == 1">{{userInfo.bank.virtualacno}}（II类）</p>
                </div>
                <div class="meau fr" v-show="userInfo.zuser.is_open == 1 && userInfo.zuser.state != 5 && userInfo.zuser.state != 0"><span><i></i><i></i><i></i></span>
                    <div class="meauSelect" :class="{'onemeau': (userInfo.zuser.state == 5 || userInfo.zuser.state == 0)}" v-show="ismeau">
                        <p class="item" @click="tabmeau(1)"><span>充值</span></p>
                        <p class="item" @click="tabmeau(2)"><span>提现</span></p>
                        <p class="item" @click="tabmeau(3)"><span>销户</span></p>
                        <p class="item" @click="tabmeau(4)"><span>信息更新</span></p>
                    </div>
                </div>
                <div class="cb"></div>
            </div>
            <div class="bot">账户余额：{{AccountMoney.acfreebal}}</div>
        </div>
        <div class="cardList c_mode_box" v-if="userInfo.zuser.is_open == 1">
            <h2>已绑定银行卡</h2>
            <div class="cardno" v-if="(userInfo.zuser.is_open == 1 && (userInfo.zuser.state == 5 || userInfo.zuser.state == 0)) || (userInfo.zuser.is_open == 0)">
                <p class="img"><img src="/assets/images/card.png" alt=""></p>
                <p class="txt">您的账户暂未绑定银行卡</p>
                <p class="add" @click="addcard()"><span>添加银行卡</span></p>
            </div>
            <ul v-else>
                <li >
                    <div class="top oh">
                        <div class="bank fl pr">{{userInfo.bank.issuing_bank}}<span>储蓄卡</span></div>
                        <div class="card fr">{{userInfo.bank.card_number}}</div>
                    </div>
                    <div class="bot">
                        <div class="img fl"><img src="/assets/images/xian.png" alt=""></div>
                        <div class="txt fl">
                            <p>单笔限额：{{userInfo.bank.single_quota}}元</p>
                            <p>日累计限额：{{userInfo.bank.daily_cumulative_limit}}元</p>
                        </div>
                        <div class="handles fr">
                            <span @click="showJieFun">解绑</span>
                            <span @click="changecard">换卡</span>
                        </div>
                        <div class="cb"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cardList c_mode_box" v-if="userInfo.zuser.is_open == 0">
            <div class="cardno">
                <p class="img"><img src="/assets/images/card.png" alt=""></p>
                <p class="txt">您的账户未开通缴纳账户</p>
                <p class="add" @click="goKai()"><span>开户</span></p>
            </div>
        </div>
        <div class="kaihu" v-show="showKai">
            <div class="center">
                <p class="txt">您暂未开户，请先进行开户操作</p>
                <p class="btn">
                    <span @click="cancelKai()">取消</span>
                    <span @click="goKai()">去开户</span>
                </p>
            </div>
        </div>
    
        <div class="xiaohu" v-show="showXiao">
            <div class="center">
                <p class="txt">您确认进行销户操作吗？</p>
                <p class="btn">
                    <span @click="cancelXiao()">取消</span>
                    <span @click="goXiao()">销户</span>
                </p>
            </div>
        </div>
        <div class="xiaohu" v-show="showJie">
            <div class="center">
                <p class="txt">是否解除该银行卡绑定？</p>
                <p class="btn">
                    <span @click="cancelJie()">取消</span>
                    <span @click="goJie()">确定</span>
                </p>
            </div>
        </div>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
    
    
    ` ,
    data(){
        return {
            ismeau: false,
            userInfo: '',
            sheetVisible:false,
            actions:[
                {name:'身份证有效期修改',method:()=>{
                        this.$router.push("/account/identity");
                    }},
                {name:'个人信息补录',method:()=>{
                        this.$router.push("/account/myaccount");
                    }},
            ],
            AccountMoney: '', // 账户余额
            showKai: false, // 显示开户提示
            showXiao: false, // 显示销户提示
            showJie: false // 显示解绑提示
        }
    },
    created(){
        this.getNewInfo();
        // 清除代人缴费的输入信息
        localStorage.removeItem('daiName');
        localStorage.removeItem('daiIDcard');
    },
    mounted(){

    },
    methods:{
        getNewInfo(){
            let userInfo = localStorage.getItem('userInfo');//存在本地的用户
            // userInfo =
            userInfo = JSON.parse(userInfo);
            this.userInfo = userInfo;
            console.log(this.userInfo);
            console.log('是否开户');
            if (this.userInfo.zuser.is_open == 1) {
                this.getAccountMoney();
            }
        },
        tabmeau (id) {
            this.ismeau = !this.ismeau;
            if (id === 1) {
                // 充值
                this.$router.push('/account/recharge');
            } else if (id === 2) {
                // 提现
                this.$router.push('/account/withdrawal');
            } else if (id === 3) {
                // 注销
                if(this.AccountMoney.acfreebal != '0.00' && this.AccountMoney.acfreebal != '0' && this.AccountMoney.acfreebal != '0.0'){
                    this.$msg("您的账户余额不为0，暂不能销户");
                    return false;
                }
                this.showXiao = true;
            }else if(id===4){
                this.sheetVisible = true;
            }
        },
        changecard () {


            // 清空下一个页面需要输入的东西
            localStorage.removeItem('NewBankName');
            localStorage.removeItem('NewBankSelectedId');
            localStorage.removeItem('NewCardNum');
            localStorage.removeItem('NewPhoneCode');
            localStorage.removeItem('Newisagree');
            localStorage.removeItem('NewCardPhone');

            this.$router.push('/account/changecard');
        },
        addcard () {

            var isopen = this.userInfo.zuser.is_open;
            var state = this.userInfo.zuser.state;
            if(isopen == 1){
                if(state == 5 || state == 0){
                    // state为5时去走换卡流程
                    this.changecard();
                }else{
                    this.$router.push('/account/addcard1');
                }
            }else{
                // 去开户
                this.showKai = true;
            }
        },
        cancelKai () {
            this.showKai = false;
        },
        goKai () {
            this.showKai = false;
            this.$router.push("/account/add1");
        },
        cancelXiao () {
            this.showXiao = false;
        },
        goXiao () {
            this.showXiao = false;
            // 开始销户
            this.deleteUser();
        },
        showJieFun () {
            if(this.AccountMoney.acfreebal != '0.00' && this.AccountMoney.acfreebal != '0' && this.AccountMoney.acfreebal != '0.0'){
                this.$msg("您的账户余额不为0，暂不能解绑");
                return false;
            }
            this.showJie = true;
        },
        cancelJie () {
            this.showJie = false;
        },
        goJie () {
            this.showJie = false;
            // 开始解绑
            this.getUntyingCard();
        },
        addAccount (state) {
            console.log(state);
            if (state === 1) {
                return false;
            } else {
                this.$router.push('/account/addAccount1');
            }
        },
        getUntyingCard () {
            this.$post('/wap/payment/bindcarddel',{},(res)=>{
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    console.log('解绑成功');
                    this.getUserInfo('jiebang');
                }
            });
        },
        deleteUser () {
            this.$post('/wap/payment/bindaccountdel',{},res=>{
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    this.getUserInfo('xiaohu');
                }
            });
        },
        getUserInfo (state) {
            this.$post('/wap/payment/get_user',{},res=>{
                let data = res.data.result;
                localStorage.setItem('userInfo', JSON.stringify(data));
                this.getNewInfo();
                let timer = setTimeout(function(){
                    this.$router.replace('/account');
                },1500);
                if(state === 'jiebang'){
                    this.userInfo = data;
                    this.$msg('解绑成功');
                }else if(state === 'xiaohu'){
                    this.$msg('销户成功');
                }
            });
        },
        getAccountMoney () {
            // 获取账户余额
            this.$post('/wap/payment/otherusesurplus',{},res=>{
                if(res.data.code!=0){
                    layer.open({
                        content:res.data.data,
                        skin:'msg',
                        time:2
                    });
                }else{
                    this.AccountMoney = res.data.data;
                    localStorage.setItem('AccountMoney',JSON.stringify(res.data.data));
                }
            });
        }
    },
};
// import '/assets/js/payment/account/css.css';
export default account;