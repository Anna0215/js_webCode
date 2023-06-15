const account = {
    template:`
<div>
<link rel="stylesheet" href="/assets/js/payment/account/identity.css">
<div class="addcard main mt15 pb70">
    <div class="changecard">
      <ul>
        <li><h3>身份验证</h3></li>
      </ul>
    </div>
    <div style="height:10px;"></div>
    <div class="changecard">
      <ul>
        <li>
          <div class="name" >姓名</div>
          <div class="input tr" >
            {{formData.CustName}}
          </div>
        </li>
        <li>
          <div class="name" >身份证号</div>
          <div class="input tr" >
            {{formData.IdNo}}
          </div>
        </li>

        <li>
          <div class="name" style="width: 120px;">身份证到期时间</div>
          <div class="input tr pr" style=" width: calc(100% - 120px);">
            <div class="c_select_val" @click="cardSelect(1)">{{ formData.IdExDate ? formData.IdExDate : "身份证到期时间" }}</div>
          </div>
          <div class="cb"></div>
        </li>

      </ul>
    </div>
    <div class="upcard mb10">
      <h2>上传身份证照片</h2>
      <div class="cardImg oh">
        <div class="img fl">
          <div class="card pr">
            <label for="filefront">
              <input type="file" @change="filefront" accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none;" id="filefront" name="filefront" value=""/>
              <span class="upbtn"></span>
              <img v-if="!formData.ImageBaseFront" src="~@/assets/images/card_f.png" alt="">
              <img v-else :src="formData.ImageBaseFront" alt="">
            </label>
          </div>
          <p>有照片的一面</p>
        </div>
        <div class="img fr">
          <div class="card pr">
            <label for="fileback">
              <input type="file" style="display: none;" accept="image/png,image/jpeg,image/gif,image/jpg" @change="fileback" id="fileback" name="fileback" value=""/>
              <span class="upbtn"></span>
              <img v-if="!formData.ImageBaseBack" src="~@/assets/images/card_b.png" alt="">
              <img v-else :src="formData.ImageBaseBack" alt="">
            </label>
          </div>
          <p>有国徽的一面</p>
        </div>
      </div>
    </div>
    <div class="c_bot_btn"><input @click="onSubmit" :class="{gray:!formData.IdExDate || !formData.ImageBaseFront || !formData.ImageBaseBack}" type="button" value="提交"></div>

    <!--日期选择插件-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="confirm"
      v-model="pickerValue"
    >
    </mt-datetime-picker>
    <!--日期选择插件 end-->

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
            startDate: new Date("1990/01/01"),
            endDate: new Date("2080/01/01"),
            pickerValue: "2010-12-24",
            formData: {
                CustName: "",
                IdNo: "",
                IdExDate: "",
                ImageBaseFront: "", // 正面临时图片地址
                ImageBaseBack: "" // 反面临时图片地址
            },
            toinfo:0,
            FormData: new FormData(),
            cardSelectState: false,
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
        this.getUserInfo();
    },
    methods: {
        gourl(url){
            if(url){
                this.$router.push(url);
            }else{
                this.showKai2 = false;
            }
        },
        getUserInfo(){
            let params = {
                'usernumber': localStorage.getItem('app_uid'),
                'client_id': localStorage.getItem('clientId'),
                'enterId': localStorage.getItem('app_enterId'),
                'token': localStorage.getItem('app_token')
            };
            this.$post('/wap/payment/get_user',params,(res)=>{
                let data = res.data.result;
                localStorage.setItem('userInfo', JSON.stringify(data));
                localStorage.setItem('userId', data.id);

                this.formData.CustName = data.nickname
                this.formData.IdNo = data.idcard
            })
        },
        confirm(e) {
            let This = this;
            let y = new Date(e).getFullYear();
            let m = new Date(e).getMonth() + 1;
            let d = new Date(e).getDate();
            if (m.toString().length == 1) {
                m = "0" + m;
            }
            if (d.toString().length == 1) {
                d = "0" + d;
            }
            let date = y + "-" + m + "-" + d;
            This.formData.IdExDate = date;
        },
        onSubmit() {
            let This = this;
            if (
                This.formData.IdExDate &&
                This.formData.ImageBaseFront &&
                This.formData.ImageBaseBack != ""
            ) {
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                let FormData = This.FormData; // 创建form对象
                FormData.delete('CustName');
                FormData.delete('IdNo');
                FormData.delete('IdExDate');
                FormData.append('CustName', this.formData.CustName); // 通过append向form对象添加数据
                FormData.append('IdNo', this.formData.IdNo); // 通过append向form对象添加数据
                FormData.append('IdExDate', this.formData.IdExDate); // 通过append向form对象添加数据
                FormData.append('client_id', localStorage.getItem('clientId'));

                let userId = localStorage.getItem('userId');
                FormData.append('UserId',userId);

                let params = FormData;

                layer.open({type:2,shadeClose:false});
                this.$post('/wap/payment/checkIdCardTime',params,res=>{
                    this.$toast(res.data.data);
                    layer.closeAll();
                    if(this.toinfo==1){
                        if(res.data.code==0){
                            this.$router.push('/account/myaccount?toinfo=1');
                        }
                    }else{
                        this.$router.go(-1);
                    }
                });
            } else {
                This.$toast("请把信息填写完整");
            }
        },
        tabSelect() {
            let This = this;
            This.cardSelectState = !This.cardSelectState;
        },
        cardSelect(state) {
            let This = this;
            This.cardSelectState = false;
            if (state == 1) {
                This.formData.IdExDate = "";
                This.openPicker();
            } else {
                This.formData.IdExDate = "长期";
            }
        },
        openPicker() {
            this.$refs.picker.open();
        },
        filefront_suo(event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            let files = event.target.files[0];
            console.log("正面-压缩前大小=" + files);
            console.log(files);
            function callback(data) {
                //回调获取压缩后的Blog
                if (data) {
                    console.log("压缩成功1");
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete("filefront");
                    FormData.append("filefront", data, "filefront.jpg"); // 通过append向form对象添加数据
                    console.log(FormData);
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(data); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function() {
                        _this.formData.ImageBaseFront = this.result;
                    };
                } else {
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete("filefront");
                    FormData.append("filefront", files, files.name); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function() {
                        _this.formData.ImageBaseFront = this.result;
                    };
                }
            }
            _this.compress(files, callback);
        },
        filefront(event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            let files = event.target.files[0];
            let FormData = _this.FormData; // 创建form对象
            FormData.delete("filefront");
            FormData.append("filefront", files, files.name); // 通过append向form对象添加数据
            _this.FormData = FormData;
            if (!event || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function() {
                _this.formData.ImageBaseFront = this.result;
            };

            return false;
            /**
             * 图片上传功能
             *
             let This = this;
             let file = event.target.files[0];
             let param = This.FormData; // 创建form对象
             param.append('filefront', file, file.name); // 通过append向form对象添加数据
             // param.append('type', '1'); // 添加form表单中其他数据
             // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
             let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
             // 添加请求头
             This.$api.$axios.post('upload/upImg', param, config)
             .then(response => {
          if (response.data.status === 200) {
            This.form.img = response.data.data.img;
            This.form.imgURL = 'http://www.baidu.com/' + response.data.data.img;
          }
        });
             */
        },
        fileback_suo(event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            var files = event.target.files[0];
            console.log("反面-压缩前大小=" + files);
            console.log(files);
            function callback(data) {
                //回调获取压缩后的Blog
                if (data) {
                    console.log("压缩成功2");
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete("fileback");
                    FormData.append("fileback", data, "fileback.jpg"); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(data); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function() {
                        _this.formData.ImageBaseBack = this.result;
                    };
                } else {
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete("fileback");
                    FormData.append("fileback", files, files.name); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function() {
                        _this.formData.ImageBaseBack = this.result;
                    };
                }
            }
            _this.compress(files, callback);
        },
        fileback(event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            var files = event.target.files[0];
            let FormData = _this.FormData; // 创建form对象
            FormData.delete("fileback");
            FormData.append("fileback", files, files.name); // 通过append向form对象添加数据
            _this.FormData = FormData;
            if (!event || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function() {
                _this.formData.ImageBaseBack = this.result;
            };
        },
        compress(fileObj, callback) {
            function dataURLtoBlob(dataurl) {
                //base64格式图片 转为Blob
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }
            if (typeof FileReader === "undefined") {
                console.log("当前浏览器内核不支持base64图标压缩");
                return false;
            } else {
                try {
                    var reader = new FileReader();
                    var image = new Image();
                    reader.readAsDataURL(fileObj); //开始读取指定的Blob中的内容。返回base64
                    reader.onload = function(ev) {
                        image.src = ev.target.result;
                        image.onload = function() {
                            var imgWidth = this.width,
                                imgHeight = this.height; //获取图片宽高
                            if (imgWidth > 640) {
                                //设置图片的最大宽度为640
                                imgWidth = 640;
                                imgHeight = (640 / this.width) * imgHeight; //设置等比例高度
                                var canvas = document.createElement("canvas");
                                var ctx = canvas.getContext("2d");
                                canvas.width = imgWidth;
                                canvas.height = imgHeight;
                                ctx.drawImage(this, 0, 0, imgWidth, imgHeight); //根据宽高绘制图片
                                var fullQuality = canvas.toDataURL("image/jpg", 1.0); //canvas转为base64
                                var blogData = dataURLtoBlob(fullQuality);
                                callback(blogData);
                            } else {
                                callback(false);
                            }
                        };
                    };
                } catch (e) {
                    console.log("压缩失败!");
                }
            }
        }
    }
};
export default account;