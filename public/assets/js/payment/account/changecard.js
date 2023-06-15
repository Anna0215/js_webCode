export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/changecard.css">
    <div class="changecard main mt15 pb70">
        <div class="accountInfo mb10">
            <div class="top">
                <div class="img fl"><img src="/assets/images/logo1.png" alt=""></div>
                <div class="info fl">
                    <p>{{userInfo.is_open == 1 ? userInfo.account_name : '自助开户'}}</p>
                    <p>{{userInfo.bank.virtualacno}}（II类）</p>
                </div>
                <div class="cb"></div>
            </div>
        </div>
        <div class="changecard">
            <h2 class="c_tit">添加银行卡</h2>
            <ul>
                <li>
                    <div class="name">发 卡 行</div>
                    <div class="input select">
<!--                        <input type="tel" @click="showYearTermPopup" v-model="BankName" readonly placeholder="请选择发卡行">-->
<!--                        <sy-picker :slots="slots" :visible="yearTermShow" @values="onReceiveYearTermValues"></sy-picker>-->
                        <select name="" class="select" v-model="bankSelectedId" @change="getBankSelected">
<!--                            <option value="0" selected>请选择地址类型</option>-->
                            <option :value="item.BankId" v-for="(item, index) in bankList" :item="item" :key="index" >{{item.BankName}}</option>
                        </select>
                    </div>
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">银行卡号</div>
                    <div class="input"><input type="tel" v-model="cardNo" placeholder="请输入您的银行卡号"></div>
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">手 机 号</div>
                    <div class="input pr"><input type="tel" placeholder="请输入银行预留手机号" v-model="phone" value=""><span class="close" @click="del"></span></div>
                    <div class="cb"></div>
                </li>
                <li>
                    <div class="name">验 证 码</div>
                    <div class="input input2"><input type="tel" maxlength="6" v-model="code" placeholder="请输入验证码"></div>
                    <div class="getma" @click="getma">{{matxt}}</div>
                    <div class="cb"></div>
                </li>
            </ul>
            <p class="tel_ts" v-show="mobileState">请输入 <span v-if="phone">{{phone | mobileFormat}}</span>接收的验证码</p>
        </div>
        <div class="agree" :class="{'active': (isagree == 1)}">
            <p><i @click="agree()"></i>同意<span @click="fuwu">《电子账户客户服务协议》</span>、 <span  @click="yinsi">《隐私保护协议》</span>内容，本人充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本人账户。</p>
        </div>
        <div class="c_bot_btn"><input :class="{gray:((isagree != 1) || cardNo === '' || code === '' || phone == '')}" @click="next" type="button" value="下一步"></div>
    </div>
</div>
    `,
    data () {
        return {
            ismeau: false,
            isagree: 2, // 1 同意 2 不同意
            code: '', // 验证码
            sendCodeVerify: '', // 这是我从接口获取的发送的验证码，来验证用户输入的验证码是不是正确
            matxt: '获取动态码', // 验证码
            timer: null, // 全局定时器
            maState: true, // 是否可以发送验证码
            userInfo: '',
            bankList: '', // 绑定银行卡列表
            cardNo: '', // 卡号
            bankSelectedId: '', // 选择的银行id 也是银行编号
            BankName: '', // 银行名字
            BankLimit: '', // 单笔限额
            BankDayLimit: '', // 日累计限额
            yearTermShow: {
                show: false
            },
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            phone: '',
            mobileState: false
        }
    },
    created () {
        let This = this;
        let userInfo = localStorage.getItem('userInfo');
        This.userInfo = JSON.parse(userInfo);
        This.getBankList();

        let NewBankName = localStorage.getItem('NewBankName');
        let NewBankSelectedId = localStorage.getItem('NewBankSelectedId');
        let NewCardNum = localStorage.getItem('NewCardNum');
        let NewPhoneCode = localStorage.getItem('NewPhoneCode');
        let Newisagree = localStorage.getItem('Newisagree');
        let NewCardPhone = localStorage.getItem('NewCardPhone');
        if(NewBankName){
            This.BankName = NewBankName;
        }
        if(NewBankSelectedId){
            This.bankSelectedId = NewBankSelectedId;
        }
        if(NewCardNum){
            This.cardNo = NewCardNum;
        }
        if(NewPhoneCode){
            This.code = NewPhoneCode;
        }
        if(Newisagree){
            This.isagree = Newisagree;
        }
        if(NewCardPhone){
            This.phone = NewCardPhone;
        }
    },
    components: {
        // 'sy-picker': SyPicker
    },
    methods: {
        // 显示滚轮选择器
        showYearTermPopup () {
            this.yearTermShow.show = true;
        },
        // 点击确定之后接收选择的值
        onReceiveYearTermValues (values) {
            console.log('receive', values);
            this.bankSelectedId = values[0].id;
            this.BankName = values[0].name;
        },
        onValuesChange (picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        agree () {
            let This = this;
            if(This.isagree == 1){
                This.isagree = 2;
            }else{
                This.isagree = 1;
            }
        },
        next () {
            let This = this;
            if (This.isagree==1 && This.code && This.cardNo && This.phone && This.bankSelectedId) {
                if(This.sendCodeVerify != This.code){
                    this.$msg('验证码输入错误');
                    return false;
                }
                localStorage.setItem('NewBankName', This.BankName);
                localStorage.setItem('NewBankSelectedId', This.bankSelectedId);
                localStorage.setItem('NewCardNum', This.cardNo);
                localStorage.setItem('NewPhoneCode', This.code);
                localStorage.setItem('Newisagree', This.isagree);
                localStorage.setItem('NewCardPhone', This.phone);
                This.getTabBankCard();
            } else {
                this.$msg('请把信息填写完整');
            }
        },
        getBankList () {
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/banklist',{},res=>{
                layer.closeAll();
                let data = res.data.data;
                this.bankList = data;
                this.bankSelectedId = this.bankList[0].BankId;
                this.BankName = this.bankList[0].BankName;
                let narr = [];
                for (let i = 0; i < data.length; i++) {
                    let eJson = {
                        'id': data[i].BankId,
                        'name': data[i].BankName
                    };
                    narr.push(eJson);
                }
                this.slots[0].values = narr;
            });
        },
        getBankSelected () {
            let This = this;
            let sid = this.bankSelectedId;
            let bankList = This.bankList;
            for (let i = 0; i < bankList.length; i++) {
                if (sid === bankList[i].BankId) {
                    This.BankName = bankList[i].BankName;
                    This.BankLimit = bankList[i].BankLimit;
                    This.BankDayLimit = bankList[i].BankDayLimit;
                    This.BankNo = bankList[i].BankNo;
                }
            }
        },
        getma () {
            let This = this;
            if(!This.phone || !This.cardNo || !This.bankSelectedId || !This.BankName){
                layer.open({
                    content:'请先完善信息',
                    skin:'msg',
                    time:2
                });
                return false;
            }
            let telreg=/^[1][0-9]{10}$/;
            if (!telreg.test(This.phone)) {
                layer.open({
                    content:'手机号格式不正确',
                    skin:'msg',
                    time:2
                });
                return false;
            }
            if (This.maState) {
                This.getBankSelected();
                This.getBankCode();
                This.maState = false;
                let i = 60;
                This.matxt = i + 's';
                let Timer = setInterval(function () {
                    if (i > 1) {
                        i--;
                        This.matxt = i + 's';
                    } else {
                        This.matxt = '获取动态码';
                        clearInterval(Timer);
                        This.maState = true;
                    }
                }, 1000);
                This.timer = Timer;
            }
        },
        getBankCode () {
            let This = this;
            let userInfo = This.userInfo;
            let mobile = This.phone;
            let params = {
                'UserId': localStorage.getItem('userId'),
                'client_id': localStorage.getItem('clientId'),
                'MobilePhone': mobile,
                'AccountName': userInfo.bank.full_num,
                'CertNo': userInfo.bank.id_card,
                'BankCardNo': This.cardNo,
                'BankName': This.BankName,
                'BankNo': This.bankSelectedId,
                'BankLimit': This.BankLimit,
                'BankDayLimit': This.BankDayLimit
            };

            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/bindcardverify',params,res=>{
                layer.closeAll();
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                    clearInterval(This.timer);
                    This.matxt = '获取动态码';
                    This.maState = true;
                }else{
                    layer.open({
                        content:'验证码发送成功',
                        skin:'msg',
                        time:2
                    });
                    This.mobileState = true;
                    This.sendCodeVerify = res.data.data.code;
                }
            });
        },
        getTabBankCard () {
            let This = this;
            let userInfo = This.userInfo;
            let oldCardNo = '';
            if (userInfo.bank.card_number) {
                oldCardNo = userInfo.bank.card_number;
            }
            let params = {
                'MobilePhone': oldCardNo,
                'MobileCode': This.code,
                'BankCardNo': This.cardNo
            };
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/bindcardedit',params,res=>{
                layer.closeAll();
                let data = res.data;
                if(data.code!=0){
                    this.$msg(data.data);
                }else{
                    This.$router.push('/account/changesuccess');
                }
            });
        },
        fuwu () {
            let This = this;
            localStorage.setItem('NewBankName', This.BankName);
            localStorage.setItem('NewBankSelectedId', This.bankSelectedId);
            localStorage.setItem('NewCardNum', This.cardNo);
            localStorage.setItem('NewPhoneCode', This.code);
            localStorage.setItem('Newisagree', This.isagree);
            localStorage.setItem('NewCardPhone', This.phone);
            This.$router.push('/common/fuwu');
        },
        yinsi () {
            let This = this;
            localStorage.setItem('NewBankName', This.BankName);
            localStorage.setItem('NewBankSelectedId', This.bankSelectedId);
            localStorage.setItem('NewCardNum', This.cardNo);
            localStorage.setItem('NewPhoneCode', This.code);
            localStorage.setItem('Newisagree', This.isagree);
            localStorage.setItem('NewCardPhone', This.phone);
            This.$router.push('/common/yinsi');
        },
        del () {
            let This = this;
            This.phone = '';
        }
    }
}