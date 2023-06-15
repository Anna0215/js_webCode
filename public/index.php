<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]
namespace think;
//xdebug_start_trace(); //开始记录回溯
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,TENANT,token");
header('Access-Control-Max-Age: 1728000');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    die();
}
if(file_exists("./install/") && !file_exists("./install/install.lock")){
    if($_SERVER['PHP_SELF'] != '/index.php'){
        header("Content-type: text/html; charset=utf-8");
        exit("请在域名根目录下安装,如:<br/> www.xxx.com/index.php 正确 <br/>  www.xxx.com/www/index.php 错误,域名后面不能圈套目录, 但项目没有根目录存放限制,可以放在任意目录,apache虚拟主机配置一下即可");
    }
    header('Location:/install/index.php');
    exit();
}
// session_id('175qm33dhicmo3ak5oi77olsf5');
$current_url = 'http://';
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
    $current_url = 'https://';
}
define('SITE_URL', $current_url . $_SERVER['HTTP_HOST']); // 网站域名
define('ROOT_PATH', dirname(__DIR__) . '/');
// 加载基础文件
require __DIR__ . '/../thinkphp/base.php';

// 支持事先使用静态方法设置Request对象和Config对象

// 执行应用并响应
Container::get('app')->run()->send();
