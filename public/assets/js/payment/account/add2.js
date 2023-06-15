export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/add2.css">
    <div class="addcard main mt15 pb70" v-if="show">
        <div class="addstep mb10">
            <div class="step">
                <img src="/assets/images/step2.png" alt="">
            </div>
            <div class="txt">
                <p class="active">确认信息</p>
                <p class="active">身份验证</p>
                <p>上传证件</p>
                <p>开户完成</p>
            </div>
        </div>
        <div class="changecard">
            <div class="ts">
                我们将为您注册北京农商银行II类电子账户，并与您银行卡进行绑定，用于党费缴纳账户，请准备好您本人的二代身份证、一张银行卡（储蓄卡）以及您的手机。
            </div>
            <ul>
                <li>
                    <div class="name">发 卡 行</div>
                    <div class="input">
                        <select name="" id="select" v-model="bankSelectedId" @change="getBankSelected">
<!--                            <option value="0">请选择发卡银行</option>-->
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
            <p>
                <i @click="agree()"></i>同意<span @click="fuwu">《电子账户客户服务协议》</span>、 <span @click="yinsi">《隐私保护协议》</span>内容，本人充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本人账户。
            </p>
        </div>
        <div class="c_bot_btn"><input @click="next" :class="{'gray': (code == '' || (isagree != 1) || phone == '')}" type="button" value="下一步"></div>
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
            bankSelectedId: 0, // 选择的银行id 也是银行编号
            BankName: '', // 银行名字
            BankLimit: '', // 单笔限额
            BankDayLimit: '', // 日累计限额,
            phone: '',
            mobileState: false,
            show:false
        }
    },
    created () {
        setTimeout(()=>{
            let This = this;
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
            this.show = true;
        },500)


    },
    mounted () {
        let This = this;
        let userInfo = localStorage.getItem('userInfo');
        This.userInfo = JSON.parse(userInfo);
        This.getBankList();
    },
    methods: {
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
            if(this.bankSelectedId<=0){
                this.$msg('请选择发卡银行');
                return false;
            }
            if ((This.isagree == 1) && This.code && This.cardNo && This.phone && This.bankSelectedId) {
                if(This.sendCodeVerify != This.code){
                    layer.open({
                        content:'验证码输入错误',
                        skin:'msg',
                        time:2
                    });
                    return false;
                }
                localStorage.setItem('NewBankName', This.BankName);
                localStorage.setItem('NewBankSelectedId', This.bankSelectedId);
                localStorage.setItem('NewCardNum', This.cardNo);
                localStorage.setItem('NewPhoneCode', This.code);
                localStorage.setItem('Newisagree', This.isagree);
                localStorage.setItem('NewCardPhone', This.phone);
                This.$router.replace('/account/add3');
                // This.getTabBankCard();
            } else {
                layer.open({
                    content:'请把信息填写完整',
                    skin:'msg',
                    time:2
                });
            }
        },
        getBankList () {
            let This = this;
            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/banklist',{},res=>{
                layer.closeAll();
                console.log(res);
                this.bankList = res.data.data;
                This.bankSelectedId = this.bankList[0].BankId;
                this.getBankSelected();
            });
        },
        getBankSelected () {
            let This = this;
            let sid = this.bankSelectedId;
            console.log(sid);
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
            console.log(this.bankSelectedId);
            console.log(!this.bankSelectedId);
            if(!This.phone || !This.cardNo || !This.bankSelectedId || !This.BankName){
                layer.open({
                    content: '请先完善信息'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            let telreg=/^[1][0-9]{10}$/;
            if (!telreg.test(This.phone)) {
                layer.open({
                    content: '手机号格式不正确'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
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
                }, 1000)
                This.timer = Timer;
            }
        },
        getBankCode () {
            let This = this;
            let name = localStorage.getItem('NewCardName');
            let IdCardNum = localStorage.getItem('NewIdCardNum');
            let mobile = This.phone;
            let params = {
                'UserId': localStorage.getItem('userId'),
                'client_id': localStorage.getItem('clientId'),
                'MobilePhone': mobile,
                'AccountName': name,
                'CertNo': IdCardNum,
                'BankCardNo': This.cardNo,
                'BankName': This.BankName,
                'BankNo': This.bankSelectedId,
                'BankLimit': This.BankLimit,
                'BankDayLimit': This.BankDayLimit
            };

            layer.open({type:2,shadeClose:false});
            this.$post('/wap/payment/openverify',params,res=>{
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