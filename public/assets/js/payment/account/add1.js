const add1 = {
    template:`
<div>
    <div class="addcard main mt15 pb70" v-cloak>
    <link rel="stylesheet" href="/assets/js/payment/account/add1.css">
        <div class="addstep mb10">
            <div class="step">
                <img src="/assets/images/step1.png" alt="">
            </div>
            <div class="txt">
                <p class="active">确认信息</p>
                <p>身份验证</p>
                <p>上传证件</p>
                <p>开户完成</p>
            </div>
        </div>
        <div class="changecard">
            <ul>
                <li>
                    <div class="name">姓　　名</div>
                    <div class="input">
                        <!--<div class="input"><input type="text" placeholder="请输入您的姓名" v-model="name" readonly value=""></div>-->
                        <div class="input"><span>{{name}}</span></div>
                    </div>
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">身份证号</div>
                    <div class="input"><input type="text" placeholder="请输入您的身份证号" v-model="idcard" value=""></div>
                    <div class="cb"></div>
                </li>
            </ul>
            <p style="font-size: 14px; color: red; padding:10px 0;">请确认以上信息正确，否则不能正常开户。</p>
        </div>
        <div class="wents">
            <h2><i>*</i>温馨提示</h2>
            <p>1. 您将通过此功能完成党费缴纳账户开户操作；</p>
            <p>2. 请核对以上信息是否正确，如有问题请联系管理人员；</p>
        </div>
        <div class="c_bot_btn"><input :class="[(name == '' || idcard == '')?'gray':'']" @click="next" type="button" value="下一步"></div>
    </div>
</div>
   
    `,
    data(){
        return {
            ismeau: false,
            name: '',
            idcard: ''
        }
    },
    created (){
        let userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        console.log(userInfo);
        let This = this;
        // This.name = userInfo.realname;
        This.name = userInfo.nickname;
        This.idcard = userInfo.idcard;

        // 清空下一个页面需要输入的东西
        localStorage.removeItem('NewBankName');
        localStorage.removeItem('NewBankSelectedId');
        localStorage.removeItem('NewCardNum');
        localStorage.removeItem('NewPhoneCode');
        localStorage.removeItem('Newisagree');
        localStorage.removeItem('NewCardPhone');
    },
    methods: {
        next () {
            let This = this;
            this.idcard = this.idcard.toUpperCase();
            let regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/;
            if (!regIdCard.test(This.idcard)) {
                layer.open({
                    content: '身份证号填写有误'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }

            if (This.name && This.idcard) {
                localStorage.setItem('NewCardName', This.name);
                localStorage.setItem('NewIdCardNum', This.idcard);
                this.$router.push('/account/add2');
            } else {
                layer.open({
                    content: '请将信息填写完整'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
        }
    }
};

export default add1;
