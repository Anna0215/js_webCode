import self from '/assets/js/payment/self/index.js';
import SelfDetail from '/assets/js/payment/self/detail.js';
import SelfPay from '/assets/js/payment/self/pay.js';
import SelfPayRes from '/assets/js/payment/self/payres.js';

import OthersIndex from '/assets/js/payment/others/index.js';
import OthersList from '/assets/js/payment/others/list.js';
import OthersDetail from '/assets/js/payment/others/detail.js';
import OthersPay from '/assets/js/payment/others/pay.js';
import OthersPayres from '/assets/js/payment/others/payres.js';

import RecordIndex from '/assets/js/payment/record/index.js'
import RecordDetail from '/assets/js/payment/record/detail.js'

import account from '/assets/js/payment/account/account_index.js';
import add1 from '/assets/js/payment/account/add1.js';
import add2 from '/assets/js/payment/account/add2.js';
import add3 from '/assets/js/payment/account/add3.js';
import add4 from '/assets/js/payment/account/add4.js';
import ChangeCard from '/assets/js/payment/account/changecard.js';
import ChangeSuccess from '/assets/js/payment/account/changesuccess.js';
import Recharge from '/assets/js/payment/account/recharge.js';
import Withdrawal from '/assets/js/payment/account/withdrawal.js'
import WithdrawalRes from '/assets/js/payment/account/withdrawalres.js'
import Myaccount from '/assets/js/payment/account/myaccount.js'
import Identity from '/assets/js/payment/account/identity.js'

import Yinsi from '/assets/js/payment/common/yinsi.js';
import Fuwu from '/assets/js/payment/common/fuwu.js';

const router = [
    { path: '/', redirect:'/self/index'},
    {path:'/self/index',component:self},
    {path:'/self/detail',component:SelfDetail},
    {path:'/self/pay',component:SelfPay},
    {path:'/self/payres',component:SelfPayRes},
    { path: '/others/index', component: OthersIndex },
    { path: '/others/list', component: OthersList },
    { path: '/others/detail', component: OthersDetail },
    { path: '/others/pay', component: OthersPay },
    { path: '/others/payres', component: OthersPayres },
    { path: '/record/index', component: RecordIndex },
    { path: '/record/detail', component: RecordDetail },
    { path: '/account', component: account},
    { path: '/account/add1', component: add1},
    { path: '/account/add2', component: add2},
    { path: '/account/add3', component: add3},
    { path: '/account/add4', component: add4},
    {path:'/account/changecard',component:ChangeCard},
    {path:'/account/recharge',component:Recharge},
    {path:'/account/withdrawal',component:Withdrawal},
    {path: '/account/withdrawal/res',component: WithdrawalRes},
    {path:'/account/changesuccess',component:ChangeSuccess},
    {path:'/common/yinsi',component:Yinsi},
    {path:'/common/fuwu',component:Fuwu},
    {path: '/account/myaccount',name: '补录个人信息',component: Myaccount},
    {path: '/account/identity',name: '身份验证',component: Identity}
];

export  default router