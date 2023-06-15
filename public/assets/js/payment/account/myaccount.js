const account = {
    template:`
<div>
<link rel="stylesheet" href="/assets/js/payment/account/myaccount.css">
<div class="addcard main mt15 pb70">
    <div class="changecard">
      <ul>
        <li><h3>补录个人信息</h3></li>
      </ul>
    </div>
    <div style="height:10px;"></div>

    <div class="changecard">
      <ul>
        <li>
          <div class="name" >姓名</div>
          <div class="input tr" >
            {{formData.username}}
          </div>
        </li>
        <li>
          <div class="name" >身份证号</div>
          <div class="input tr" >
            {{formData.IdentNo}}
          </div>
        </li>

        <li v-if="formData.hasOwnProperty('Gender')">
          <div class="name">性别</div>
          <div class="input tr pr">
            <select name="" class="select" v-model="formData.Gender">
              <option value="">请选择性别</option>
              <option :value="item.id" v-for="(item, index) in sex" :item="item" :key="index" >{{item.name}}</option>
            </select>
          </div>
        </li>

        <li v-if="formData.hasOwnProperty('Birthday')">
          <div class="name">出生日期</div>
          <div class="input tr pr">
            <div class="c_select_val" @click="cardSelect(1)">{{formData.Birthday ? formData.Birthday : '请选择出生日期'}}</div>
          </div>
          <div class="cb"></div>
        </li>

        <li v-if="formData.hasOwnProperty('HomeAddr')">
          <div class="name" >家庭住址</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入家庭地址" v-model="formData.HomeAddr" value="">
          </div>
          <div class="cb"></div>
        </li>

        <li v-if="formData.hasOwnProperty('UnitAddr')">
          <div class="name" >单位地址</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入单位地址" v-model="formData.UnitAddr" value="">
          </div>
        </li>
        <li v-if="formData.hasOwnProperty('MobileIphone')">
          <div class="name" >手机号码</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入手机号码" v-model="formData.MobileIphone" value="">
          </div>
        </li>
        <li v-if="formData.hasOwnProperty('UnitTel')">
          <div class="name" >固定号码</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入固定电话" v-model="formData.UnitTel" value="">
          </div>
        </li>

        <li v-if="formData.hasOwnProperty('CareerType')">
          <div class="name" >职业</div>
          <div class="input tr" >
            <select name="" class="select" v-model="formData.CareerType">
              <option value="0">请选择职业</option>
              <option :value="item.id" v-for="(item, index) in career" :item="item" :key="index" >{{item.name}}</option>
            </select>
          </div>
          <div class="cb"></div>
        </li>

        <li v-if="formData.hasOwnProperty('IdentOrg')">
          <div class="name" style="">证件签发机关</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入证件签发机关" v-model="formData.IdentOrg" value="">
          </div>
        </li>

        <li v-if="formData.hasOwnProperty('UnitName')">
          <div class="name" >工作单位</div>
          <div class="input tr" >
            <input type="text" placeholder="请输入工作单位" v-model="formData.UnitName" value="">
          </div>
        </li>

      </ul>
    </div>
    <div class="c_bot_btn"><input @click="onSubmit()" type="button" value="提交"></div>

    <!--日期选择插件-->
    <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate='endDate'
        @confirm="confirm"
        v-model="pickerValue"
    ></mt-datetime-picker>


  <!-- 判断用户信息完整性 -->
    <div class="kaihu" v-if="showKai2.show">
      <div class="center">
        <p class="txt">{{showKai2.message}}</p>
        <p class="btn">
          <span @click="gourl(showKai2.url)">{{showKai2.button}}</span>
        </p>
      </div>
    </div>
    <!-- 判断用户信息完整性 end -->
  </div>
</div>
    
    
    ` ,
    data() {
        return {
            startDate: new Date('1900/01/01'),
            endDate: new Date('2080/01/01'),
            toinfo:0,
            formData: {
                username: "",
                IdentNo: "",
                // Gender: 0,
                // Birthday: "",
                // HomeAddr: "",
                // UnitAddr: "",
                // MobileIphone: "",
                // UnitTel: "",
                // CareerType: 0,
                // IdentOrg: "",
                // UnitName: ""
            },
            pickerValue:new Date(),
            sex:[
                {id:"01",name:'男性'},
                {id:"02",name:'女性'},
                {id:"03",name:'未知性别'},
                {id:"99",name:'未说明的性别'},
            ],
            career: [
                // 职业
                { id: "100", name: "国家机关、党群组织、企业、事业单位负责人" },
                { id: "200", name: "专业技术人员" },
                { id: "300", name: "办事人员和有关人员" },
                { id: "400", name: "商业、服务业人员" },
                { id: "500", name: "农、林、牧、渔、水利业生产人员" },
                { id: "600", name: "生产、运输设备操作人员及有关人员" },
                { id: "X00", name: "军人" },
                { id: "700", name: "自由职业者、个体户" },
                { id: "800", name: "在校学生" },
                { id: "900", name: "退休" },
                { id: "Z00", name: "待业（无业）" }
            ],
            cardSelectState:false,
            showKai2:{
                show:false,
                url:'',
                message:'',
                button:''
            },//709,809,909,99报错
        };
    },
    created(){
        if(this.$route.query.toinfo==1){
            this.toinfo = 1;
        }
        this.initData();
    },
    methods: {
        gourl(url){
            if(url){
                this.$router.push(url);
            }else{
                this.showKai2 = false;
            }
        },
        confirm (e) {
            let This = this;
            let y = new Date(e).getFullYear();
            let m = new Date(e).getMonth() + 1;
            let d = new Date(e).getDate();
            if (m.toString().length == 1) {
                m = '0' + m;
            }
            if (d.toString().length == 1) {
                d = '0' + d;
            }
            let date = y+''+m+''+d;
            This.formData.Birthday = date;
        },
        async initData(){
            //获取数据库用户信息
            let user = await this.getUser();
        },
        //检查用户信息完整性
        checkUserIntegrity(user){
            let params = {
                IdentNo:this.formData.IdentNo,
                UserId:user.id
            }

            this.$post('/wap/payment/checkUserIntegrity',params,res=>{
                if(res.data.code=='099'){
                    this.showKai2 = {
                        show:true,
                        message:res.data.data,
                        url:'',
                        button:'确定'
                    }
                }
                if(res.data.data.hasOwnProperty('FildName')){
                    let field = res.data.data.FildName.split('&');
                    this.formData = {
                        username: this.formData.username,
                        IdentNo: this.formData.IdentNo,
                    };
                    for(let v of field){
                        this.$set(this.formData,v,"");
                    }
                }
            })
        },

        async getUser(){
            let params = {};
            await this.$post('/wap/payment/get_user',params,res=>{
                console.log(res.data);
                let data = res.data.result;
                localStorage.setItem('userInfo', JSON.stringify(data));
                localStorage.setItem('userId', data.id);

                this.formData.username = data.nickname;
                this.formData.IdentNo = data.idcard;

                this.checkUserIntegrity(data)
            });
        },
        cardSelect (state) {
            let This = this;
            This.cardSelectState = false;
            if(state == 1){
                This.IDEndTime = '';
                This.openPicker();
            }
        },
        openPicker() {
            this.$refs.picker.open();
        },
        onSubmit() {
            let This = this;
            let phone = /^[1][0-9]{10}$/;
            let telreg = /^[0-9]{7}$/;
            for(let v in this.formData){
                if(this.formData[v]==''){
                    switch(v){
                        case 'Gender':
                            This.$toast("请选择性别");
                            return false;
                        case 'Birthday':
                            This.$toast("请选择出生日期");
                            return false;
                        case 'HomeAddr':
                            This.$toast("请填写家庭地址");
                            return false;
                        case 'UnitAddr':
                            This.$toast("请填写单位地址");
                            return false;
                        case 'MobileIphone':
                            This.$toast("请输入手机号码");
                            return false;
                        case 'UnitTel':
                            This.$toast("请输入固定电话");
                            return false;
                        case 'CareerType':
                            This.$toast("请选择职业");
                            return false;
                        case 'IdentOrg':
                            This.$toast("请输入工作证件签发机关");
                            return false;
                        case 'UnitName':
                            This.$toast("请输入工作单位");
                            return false;
                    }
                }
                if(v=='MobileIphone'){
                    if(!phone.test(this.formData.MobileIphone)){
                        This.$toast("请输入手机号码正确格式");
                        return false;
                    }
                }
                if(v=='UnitTel'){
                    if(!phone.test(this.formData.MobileIphone)){
                        This.$toast("请输入固定号码正确格式");
                        return false;
                    }
                }
            }

            let userId = localStorage.getItem('userId');
            this.$set(this.formData,'UserId',userId);

            this.$post('/wap/payment/infoChange',this.formData,res=>{
                this.$toast(res.data.data);
                if(res.data.code==0){
                    setTimeout(()=>{
                        if(this.toinfo==1){
                            this.$router.go(-2);
                        }else{
                            this.$router.go(-1);
                        }
                    },2000)
                }else{
                    if(res.FildName){
                        let field = res.data.FildName.split('&');
                        this.formData = {
                            username: this.formData.username,
                            IdentNo: this.formData.IdentNo,
                        };
                        for(let v of field){
                            this.$set(this.formData,v,"");
                        }
                        console.log(this.formData);
                    }
                }
            });
        }
    }
};
export default account;