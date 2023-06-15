/**
 * 格式化数字变为保留两位小数的数字
 * 例如：20 ==》 20.00
 * */
export function moneyFormat (money) {
    money = Number(money);
    money = money.toFixed(2);
    return money
}

/**
 * 身份证号隐藏中间数字，只保留两端数字
 * 例如：430452199106275030 == 》430452********5030
 * */
export function idcardFormat (card) {
    var card1 = card.substring(0, 6);
    var card0 = card.substring((card.length - 4));
    return card1 + '********' + card0
}

/**
 * 手机号隐藏中间数字，只保留两端数字
 * 例如：18238800882 == 》182****0887
 * */
export function mobileFormat (card) {
    var card1 = card.substring(0, 3);
    var card0 = card.substring((card.length - 4));
    return card1 + '****' + card0
}

/**
 * 时间字符串转换为时间
 * 例如：1578464867 == 》2020-01-08 14:27:47
 * */
export function dateStrFormat (date) {
    var y = new Date(date*1000).getFullYear().toString();
    var mm = (new Date(date*1000).getMonth()+1).toString();
    var d = new Date(date*1000).getDate().toString();
    var h = new Date(date*1000).getHours().toString();
    var m = new Date(date*1000).getMinutes().toString();
    var s = new Date(date*1000).getSeconds().toString();
    if(mm.length == 1){mm="0"+mm};
    if(d.length == 1){d="0"+d};
    if(h.length == 1){h="0"+h};
    if(m.length == 1){m="0"+m};
    if(s.length == 1){s="0"+s};
    date = y+'-'+mm+'-'+d+' '+h+':'+m+':'+s;
    return date;
}

export default {
    moneyFormat,
    idcardFormat,
    mobileFormat,
    dateStrFormat
}
