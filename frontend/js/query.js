(function () {
  document.body.style.height = document.body.clientHeight + 'px';

  var name = document.getElementById('name');
  var department_1 = document.getElementById('department1');
  var department_2 = document.getElementById('department2');
  var query = document.getElementById('query');
  var okButton = document.getElementById('okButton');
  var telephone = document.getElementById('telephone');

  okButton.addEventListener('click', function () {
    if (telephone.value === '' || !(/^1[34578]\d{9}$/.test(telephone.value))) {
      alert('请输入正确的手机号');
      return;
    }
    post("/2018/bbt_recruit/backend/query.php", {
      telephone: telephone.value
    }, false, function (result) {
      var obj = JSON.parse(result);
      if (obj.status === 0) {
        name.textContent = obj.msg.name;
        department_1.textContent = obj.msg.department1;
        department_2.textContent = obj.msg.department2;
        query.classList.add('hide');
        setTimeout(function () {
          document.getElementById('result').classList.remove('hide');
        }, 500);
      } else {
        alert('你好像还没有报名哦~快戳报名按钮');
      }
    }, function () {
      alert('网络错误');
    })
  })
})()