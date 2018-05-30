<?php
// header('Content-Type: application/json');
require_once('./config.php');

existCheck('telephone');
blankCheck('telephone');
//Check if register system is already closed
// date_default_timezone_set('Asia/Shanghai');		//Set Timezone
$current = strtotime(date("Y-m-d H:i:s"));		//Set Current Time
$close = strtotime($closeTime);					//Set System Close Time

if ($current > $close) {
	response(100, '很抱歉，本次招新已经停止报名了\n欢迎继续关注百步梯的后续活动n(*≧▽≦*)n');
}

//Insert register data into database
$sql = ' select * from `register` where `telephone` = ? ' ;
$stmt = $connect->prepare($sql);
$stmt->execute(array(
	$_POST['telephone'],
));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (!sizeof($result)) response(1, '查询不到信息');
$result = $result[0];
response(0,["name"=>$result["name"], "department1" => $result["department1"],"department2" => $result["department2"]]);
