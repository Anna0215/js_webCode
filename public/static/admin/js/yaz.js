

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
