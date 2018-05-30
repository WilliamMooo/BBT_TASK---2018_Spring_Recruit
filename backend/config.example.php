<?php
/* --- Cofiguration Part Start --- */

//Close time of register system
$closeTime = '2018-09-21 00:00:00';

//Database Configurations:
$addr = 'localhost';			//Database Address
$dbname = '';		//Database Name
$user = '';					//Username for Project Database
$password ='';		//Password for Project Database

/* --- Cofiguration Part End --- */





//Database Connection based on PDO:
try {
	$connect = new PDO("mysql:host=$addr;dbname=$dbname;charset=utf8", $user, $password);
} catch(PDOException $ex) {
	response(2333, '数据库连接出错，请联系管理员ii');
    exit(0);
}

//Return Code Process Function:
function response($code, $msg = 'Success') {
	echo json_encode(['status' => $code, 'msg' => $msg]);
	exit(0);
}

//Check whether required paraments exist or not
function existCheck() {
	for($i = 0; $i < func_num_args(); $i++) {
		if(func_get_arg($i) == "textarea")
			continue;
		if (!isset($_POST[func_get_arg($i)])){
			response(5565,"缺少参数".func_get_arg($i));
			exit(0);
		}
	}
}

//Check if necessary paraments are blank
//Note: Uncommet the '=== 0' condition if necessary
function blankCheck() {
	for($i = 0; $i < func_num_args(); $i++) {
		if(func_get_arg($i) == "textarea")
			continue;
		if (($_POST[func_get_arg($i)] == '')/* OR ($_POST[func_get_arg($i)] === 0)*/) {
			response(233, '必填项中含有空值');
			exit(0);
		}
	}
}
