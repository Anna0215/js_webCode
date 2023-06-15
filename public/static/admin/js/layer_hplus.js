$(document).on('submit','form[data-type=ajax]',function(){
    //获取数据
    var url = $(this).attr('action');

    var data = $(this).serializeArray();//序列化表单元素

    //弹出询问框
    layer.confirm('您确定提交处理吗?',{icon:3, title:'提示'},function(index){
        //异步提交
        $.ajax({
            type: "POST",
            dataType:"json",
            url:url,
            data:data,
            success:function(obj){
                var icon_num = (obj.status==202) ? 2 : 1;
               
                if(obj.status==200 || obj.status==202){
                    layer.open({
                      content: obj.msg,
                      btn: ['确定'],
                      shade: 0.1,
                      icon: icon_num,
                      yes: function(index, layero){
                          if(obj.url){
                              location.href = obj.url; //跳转指定地址
                          }else{
                              layer.close(index);
                          }
                      },
                      cancel: function(){
                          if(obj.url){
                              location.href = obj.url; //跳转指定地址
                          }else{
                              layer.close();
                          }
                      },
                    });
                }else if(obj.status==201){
                    layer.open({
                      content: obj.msg,
                      btn: ['确定'],
                      shade: 0.1,
                      icon: icon_num,
                      yes: function(index, layero){
                          var index = parent.layer.getFrameIndex(window.name);
                          parent.layer.close(index);
                      },
                      cancel: function(){
                          layer.close();
                      },
                    });
                }
            },
            error:function(data){
                layer.alert('网络故障!');
            }
        });
    });
    return false;
});

function normal_init() {
    $(".i-checks").iCheck({
        checkboxClass: "icheckbox_square-green",
        radioClass: "iradio_square-green",
    });

    $("#isCheckAll").on('ifChecked', function(event) {
        $('input').iCheck('check');
    });

    $("#isCheckAll").on('ifUnchecked', function(event) {
        $('input').iCheck('uncheck');
    });

    $('input[type="checkbox"]').on('ifChecked', function() {
        if($(this).attr('custom')!='form'){
            $(this).val('1');
        }
    });

    $('input[type="checkbox"]').on('ifUnchecked', function() {
        if($(this).attr('custom')!='form'){
            $(this).val('0');
        }
    });

    $("a[name='delete']").click(function(){
        //获取数据
        var url = $(this).attr('href');
        //弹出询问框
        layer.confirm('您确定要删除数据吗?',{icon:3, title:'提示'},function(index){
            //异步提交
            $.ajax({
                type: "POST",
                dataType:"json",
                url:url,
                data:null,
                success:function(obj){
                    var icon_num = (obj.status==200) ? 1 : 2;
                    if(obj.status==200 || obj.status==202){
                        layer.open({
                          content: obj.msg,
                          btn: ['确定'],
                          shade: 0.1,
                          icon: icon_num,
                          yes: function(index, layero){
                              if(obj.url){
                                  location.href = obj.url; //跳转指定地址
                              }else{
                                  layer.close(index);
                              }
                          },
                          cancel: function(){
                              location.href = obj.url; //跳转指定地址
                          },
                        });
                    }
                },
                error:function(data){
                    layer.alert('网络故障!');
                }
            });
        });

        return false;
    });

}

$(document).ready(function(){

    normal_init();

    //隐藏特殊标签页
    $(".nav-tabs li").click(function(){
        if($(this).attr('id')!='showtab'){
            $('#showtab').attr('style','display:none');
        }
    });

});
