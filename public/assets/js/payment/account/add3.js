// import layui from '/plugins/layui/layui.js'
export default {
    template:`
<div>
    <link rel="stylesheet" href="/assets/js/payment/account/add3.css">
    
    
    <div class="addcard main mt15 pb70" v-if="show">
    <div class="addstep mb10">
        <div class="step">
            <img src="/assets/images/step3.png" alt="">
        </div>
        <div class="txt">
            <p class="active">确认信息</p>
            <p class="active">身份验证</p>
            <p class="active">上传证件</p>
            <p>开户完成</p>
        </div>
    </div>
    <div class="upcard mb10">
        <h2>上传身份证照片</h2>
        <div class="cardImg oh">
            <div class="img fl">
                <div class="card pr">
                    <label for="filefront">
                        <input type="file" @change="filefront" accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none;" id="filefront" name="filefront" value=""/>
                        <span class="upbtn"></span>
                        <img v-if="!frontSrc" src="/assets/images/card_f.png" alt="">
                        <img v-else :src="frontSrc" alt="">
                    </label>
                </div>
                <p>有照片的一面</p>
            </div>
            <div class="img fr">
                <div class="card pr">
                    <label for="fileback">
                        <input type="file" style="display: none;" @change="fileback" accept="image/png,image/jpeg,image/gif,image/jpg" id="fileback" name="fileback" value=""/>
                        <span class="upbtn"></span>
                        <img  v-if="!backSrc" src="/assets/images/card_b.png" alt="">
                        <img v-else :src="backSrc" alt="">
                    </label>
                </div>
                <p>有国徽的一面</p>
            </div>
        </div>
    </div>
    <div class="changecard">
        <ul>
            <li>
                <div class="name" style="width: 120px;">身份证到期时间</div>
                <div class="input tr pr" style=" width: calc(100% - 120px);">
                    <div class="c_select_val" @click="tabSelect()">{{IDEndTime ? IDEndTime : '身份证到期时间'}}</div>
                    <div class="c_select" v-show="cardSelectState">
                        <div class="item" @click="cardSelect(1)" id="date">身份证到期时间</div>
                        <div class="item" @click="cardSelect(2)">长期</div>
                    </div>
                </div>
                <div class="cb"></div>
            </li>
            <li>
                <div class="name" >地址</div>
                <div class="input tr" >
                    <input type="text" placeholder="请输入地址" v-model="Address" value="">
                </div>
                <div class="cb"></div>
            </li>
            <li>
                <div class="name" >地址类型</div>
                <div class="input tr" >
                    <select name="" class="select" v-model="addressTypeId">
                        <option value="0">请选择地址类型</option>
                        <option :value="item.id" v-for="(item, index) in addressType" :item="item" :key="index" >{{item.name}}</option>
                    </select>
                </div>
                <div class="cb"></div>
            </li>
            <li>
                <div class="name" >工作单位</div>
                <div class="input tr" >
                    <input type="text" placeholder="请输入工作单位" v-model="WkUnit" value="">
                </div>
                <div class="cb"></div>
            </li>
            <li>
                <div class="name" >职业</div>
                <div class="input tr" >
                    <select name="" class="select" v-model="careerId">
                        <option value="0">请选择职业</option>
                        <option :value="item.id" v-for="(item, index) in career" :item="item" :key="index" >{{item.name}}</option>
                    </select>
                </div>
                <div class="cb"></div>
            </li>
        </ul>
    </div>
    <div class="wents">
        <h2><i>*</i>温馨提示</h2>
        <p>1. 身份证图片正面朝上，不要颠倒；</p>
        <p>2. 请尽量保证身份证图片满屏显示；</p>
        <p>3. 请保证上传图片的质量及清晰度。</p>
    </div>
    <div class="c_bot_btn"><input @click="next" :class="{'gray': (!IDEndTime || !frontSrc || !backSrc || !Address || !WkUnit)}" type="button" value="下一步"></div>
    
    </div>
</div>
    `,
    data () {
        return {
            startDate: new Date('1990/01/01'),
            endDate: new Date('2080/01/01'),
            ismeau: false,
            name: '', // 姓名
            idnum: '', // 身份证号
            IDEndTime: '', // 身份证过期时间 例如：20210304
            frontSrc: '', // 正面临时图片地址
            backSrc: '', // 反面临时图片地址
            FormData: new FormData(), // 反面临时图片地址
            Address: '', // 地址
            WkUnit: '', // 工作单位
            careerId: 0, // 职业id
            career: [ // 职业
                {'id': '100', 'name': '国家机关、党群组织、企业、事业单位负责人'},
                {'id': '200', 'name': '专业技术人员'},
                {'id': '300', 'name': '办事人员和有关人员'},
                {'id': '400', 'name': '商业、服务业人员'},
                {'id': '500', 'name': '农、林、牧、渔、水利业生产人员'},
                {'id': '600', 'name': '生产、运输设备操作人员及有关人员'},
                {'id': 'X00', 'name': '军人'},
                {'id': '700', 'name': '自由职业者、个体户'},
                {'id': '800', 'name': '在校学生'},
                {'id': '900', 'name': '退休'},
                // {'id': 'Y00', 'name': '不便分类的其他从业人员'},
                {'id': 'Z00', 'name': '待业（无业）'}
            ],
            addressTypeId: 0, // 地址类型id
            addressType: [ // 地址类型
                {'id': '114', 'name': '家庭地址'},
                {'id': '115', 'name': '公司地址'}
//        {'id': '199', 'name': '其它'}
            ],
            cardSelectState: false,
            pickerValue: '2010-12-24',
            show:false
        }
    },
    created () {

    },
    mounted(){
        let This = this;
        setTimeout(()=>{
            this.show = true;
            This.$nextTick(()=>{
                layui.use(['laydate'], function () {
                    var laydate = layui.laydate;
                    // 格式
                    let date = new Date();
                    let endYear = date.getFullYear()+30;
                    new Rolldate({
                        el: '#date',
                        format: 'YYYY-MM-DD',
                        beginYear: "2018",
                        endYear,
                        value: "",
                        confirm:  (date)=> {
                            console.log(date)
                            This.IDEndTime = date.replace(/-/g,"");
                            console.log(This.IDEndTime);
                        }
                    });
                });
            });

        },500);

    },
    methods: {
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
            This.IDEndTime = date;
        },
        tabSelect () {
            let This = this;
            This.cardSelectState = !This.cardSelectState;
        },
        cardSelect (state) {
            let This = this;
            This.cardSelectState = false;
            if(state == 1){
                This.IDEndTime = '';
                // This.openPicker();
            }else{
                This.IDEndTime = '长期';
            }
        },
        openPicker() {
            this.$refs.picker.open();
        },
        next () {
            let This = this;

            // this.$router.replace('/account/add4');

            if(This.IDEndTime && This.frontSrc && This.backSrc && This.Address && This.WkUnit && This.careerId && This.addressTypeId){
                This.getAuthentication();
            }else{
                this.$msg('请完整填写信息');
            }
        },
        filefront_suo (event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            let files = event.target.files[0];
            console.log("正面-压缩前大小="+files);
            console.log(files);
            //回调获取压缩后的Blog
            function callback(data){
                if(data){
                    console.log("压缩成功1");
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete('filefront');
                    FormData.append('filefront', data, 'filefront.jpg'); // 通过append向form对象添加数据
                    console.log(FormData);
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(data); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function () {
                        _this.frontSrc = this.result
                    };
                }else{
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete('filefront');
                    FormData.append('filefront', files, files.name); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function () {
                        _this.frontSrc = this.result
                    };
                }
            }
            _this.compress(files, callback);
        },
        filefront (event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            let files = event.target.files[0];
            let FormData = _this.FormData; // 创建form对象
            FormData.delete('filefront');
            FormData.append('filefront', files, files.name); // 通过append向form对象添加数据
            _this.FormData = FormData;
            if (!event || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function () {
                _this.frontSrc = this.result
            };

            return false;
        },
        fileback_suo (event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            var files = event.target.files[0];
            console.log("反面-压缩前大小="+files);
            console.log(files);
            //回调获取压缩后的Blog
            function callback(data){
                if(data){
                    console.log("压缩成功2");
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete('fileback');
                    FormData.append('fileback', data, 'fileback.jpg'); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(data); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function () {
                        _this.backSrc = this.result
                    };
                }else{
                    let FormData = _this.FormData; // 创建form对象
                    FormData.delete('fileback');
                    FormData.append('fileback', files, files.name); // 通过append向form对象添加数据
                    _this.FormData = FormData;
                    if (!event || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function () {
                        _this.backSrc = this.result
                    };
                }
            }
            _this.compress(files, callback);
        },
        fileback (event) {
            /**
             * 简单的本地预览功能
             * */
            let _this = this;
            var files = event.target.files[0];
            let FormData = _this.FormData; // 创建form对象
            FormData.delete('fileback');
            FormData.append('fileback', files, files.name); // 通过append向form对象添加数据
            _this.FormData = FormData;
            if (!event || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function () {
                _this.backSrc = this.result
            };
        },
        getAuthentication () {
            let This = this;
            if (!This.IDEndTime || !This.frontSrc || !This.backSrc || !This.Address || !This.WkUnit) {
                this.$msg('请将信息填写完整');
                return false;
            }
            layer.open({type:2,shadeClose:false});
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            let FormData = This.FormData; // 创建form对象
            FormData.delete('DueDate');
            FormData.delete('UserId');
            FormData.delete('client_id');
            FormData.append('DueDate', This.IDEndTime); // 通过append向form对象添加数据
            let params = FormData;

            this.$post('/wap/payment/opencheck',params,res=>{
                if(res.data.code!=0){
                    layer.closeAll();
                    this.$msg(res.data.data);
                    return false;
                }
                this.getOpenAccount();
            });
        },
        getOpenAccount () {
            let This = this;
            if (!This.Address || !This.WkUnit) {
                layer.closeAll();
                this.$msg("请将信息填写完整");
                return false;
            }
            let params = {
                'UserId': localStorage.getItem('userId'),
                'client_id': localStorage.getItem('clientId'),
                'MsgValidate': localStorage.getItem('NewPhoneCode'),
                'LoginPassword': '',
                'TrsPassword': '',
                'Address': This.Address,
                'AddressType': This.addressTypeId,
                'WkUnit': This.WkUnit,
                'Career': This.careerId
            };
            console.log(params);

            this.$post('/wap/payment/openaccount',params,res=>{
                layer.closeAll();
                if(res.data.code!=0){
                    this.$msg(res.data.data);
                }else{
                    this.$router.replace('/account/add4');
                }
            });
        },
        compress(fileObj, callback) {
            //base64格式图片 转为Blob
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }
            if (typeof (FileReader) === 'undefined') {
                console.log("当前浏览器内核不支持base64图标压缩");
                return false;
            } else {
                try {
                    var reader = new FileReader();
                    var image = new Image();
                    reader.readAsDataURL(fileObj);//开始读取指定的Blob中的内容。返回base64
                    reader.onload = function (ev) {
                        image.src = ev.target.result;
                        image.onload = function () {
                            var imgWidth = this.width,
                                imgHeight = this.height; //获取图片宽高
                            //设置图片的最大宽度为640
                            if (imgWidth > 640) {
                                imgWidth = 640;
                                imgHeight = 640 / this.width * imgHeight;//设置等比例高度
                                var canvas = document.createElement('canvas');
                                var ctx = canvas.getContext('2d');
                                canvas.width = imgWidth;
                                canvas.height = imgHeight;
                                ctx.drawImage(this, 0, 0, imgWidth, imgHeight);//根据宽高绘制图片
                                var fullQuality = canvas.toDataURL("image/jpg", 1.0);//canvas转为base64
                                var blogData=dataURLtoBlob(fullQuality);
                                callback(blogData);
                            }else{
                                callback(false);
                            }
                        }
                    }
                } catch (e) {
                    console.log("压缩失败!");
                }
            }
        }
    }
}