<?php
// header('Content-Type: application/json');
require_once('./config.php');
// echo json_encode(["dd"=>"dd"]);
// return;
// response(0,"ddd");
// return;

existCheck('name', 'sex', 'college', 'grade', 'dorm', 'telephone', 'department1', 'department2', 'adjust', 'textarea');
blankCheck('name', 'sex', 'college', 'grade', 'dorm', 'telephone', 'department1', 'department2', 'adjust', 'textarea');
//Check if register system is already closed
date_default_timezone_set('Asia/Shanghai');		//Set Timezone
$current = strtotime(date("Y-m-d H:i:s"));		//Set Current Time
$close = strtotime($closeTime);					//Set System Close Time

if ($current > $close) {
	response(100, '很抱歉，本次招新已经停止报名了\n欢迎继续关注百步梯的后续活动n(*≧▽≦*)n');
}

// adjust whether telephone has register
$sql = ' select * from `register` where `telephone` = ? ' ;
$stmt = $connect->prepare($sql);
$stmt->execute(array(
	$_POST['telephone'],
));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (sizeof($result)) response(1, '该手机号已经注册');

//Insert register data into database
$sql = '
INSERT INTO `register`
(`name`, `sex`, `college`, `grade`, `dorm`, `telephone`, `department1`, `department2`, `adjust`, `textarea`)
VALUES
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
';
$stmt = $connect->prepare($sql);
$stmt->execute(array(
	$_POST['name'],
	$_POST['sex'],
	$_POST['college'],
	$_POST['grade'],
	$_POST['dorm'],
	$_POST['telephone'],
	$_POST['department1'],
	$_POST['department2'],
	$_POST['adjust'],
	$_POST['textarea']));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (!empty($result)) response(1, '写入数据库失败');

response(0);
