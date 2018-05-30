(function () {
  document.body.style.height = document.body.clientHeight + 'px';

  var error = {
    name: document.getElementById('errorName'),
    sex: document.getElementById('errorSex'),
    grade: document.getElementById('errorGrade'),
    college: document.getElementById('errorCollege'),
    dorm: document.getElementById('errorDorm'),
    telephone: document.getElementById('errorTelephone'),
    department_1: document.getElementById('errorDepartment1'),
    adjust: document.getElementById('errorAdjust')
  }
  var dom = {
    name: document.getElementById('name'),
    sex: document.getElementsByName('sex'),
    grade: document.getElementsByName('grade'),
    college: document.getElementById('college'),
    dorm: document.getElementById('dorm'),
    telephone: document.getElementById('telephone'),
    department_1: document.getElementById('department1'),
    department_2: document.getElementById('department2'),
    adjust: document.getElementsByName('adjust'),
    introduction: document.getElementById('introduction')
  }

  var getRadio = function (dom) {
    for (var i = 0; i < dom.length; i++) {
      if (dom[i].checked === true) {
        return dom[i].value;
      }
    }
    return null;
  }

  var data = {
    name: function () {
      return dom.name.value.replace(/&|\s/g, '');
    },
    sex: function () {
      return getRadio(dom.sex);
    },
    grade: function () {
      return getRadio(dom.grade);
    },
    college: function () {
      return dom.college.value;
    },
    dorm: function () {
      return dom.dorm.value.replace(/&|\s/g, '');
    },
    telephone: function () {
      return dom.telephone.value.replace(/&|\s/g, '');
    },
    department_1: function () {
      return dom.department_1.value;
    },
    department_2: function () {
      return dom.department_2.value;
    },
    adjust: function () {
      return getRadio(dom.adjust);
    },
    introduction: function () {
      return dom.introduction.value.replace(/&|\s|\r|\n/g, '');
    }
  }

  var confirmed = false;
  var checker = {
    name: function () {
      if (data.name() === '') {
        error.name.classList.add('show');
        return false;
      } else {
        error.name.classList.remove('show');
        return true;
      }
    },
    sex: function () {
      if (data.sex() === null) {
        error.sex.classList.add('show');
        return false;
      } else {
        error.sex.classList.remove('show');
        return true;
      }
    },
    grade: function () {
      if (data.grade() === null) {
        error.grade.classList.add('show');
        return false;
      } else {
        error.grade.classList.remove('show');
        return true;
      }
    },
    college: function () {
      if (data.college() === '') {
        error.college.classList.add('show');
        dom.college.classList.remove('valid');
        return false;
      } else {
        error.college.classList.remove('show');
        dom.college.classList.add('valid');
        return true;
      }
    },
    dorm: function () {
      if (data.dorm() === '' || !(/^ *((C|c)([1-9]|1[0-9])|\W+|\W+[1-9]+) *(东|西)? *-? *[1-9][0-9]{2} */.test(data.dorm()))) {
        error.dorm.classList.add('show');
        return false;
      } else {
        error.dorm.classList.remove('show');
        return true;
      }
    },
    telephone: function () {
      if (data.telephone() === '' || !(/^1[34578]\d{9}$/.test(data.telephone()))) {
        error.telephone.classList.add('show');
        return false;
      } else {
        error.telephone.classList.remove('show');
        return true;
      }
    },
    department_1: function () {
      if (confirmed === false && (data.department_1() === '技术部-北校专业' || data.department_1() === '产品运营部')) {
        var result = confirm('您选了北校专属部门哦，要不要试试神秘的契合度测试？');
        confirmed = true;
        if (result) {
          goToNorth();
        }
      }
      if (data.department_1() === '') {
        error.department_1.classList.add('show');
        dom.department_1.classList.remove('valid');
        return false;
      } else {
        error.department_1.classList.remove('show');
        dom.department_1.classList.add('valid');
        return true;
      }
    },
    adjust: function () {
      if (data.adjust() === null) {
        error.adjust.classList.add('show');
        return false;
      } else {
        error.adjust.classList.remove('show');
        return true;
      }
    },
  }

  // bind error checking
  for (var key in error) {
    if (error.hasOwnProperty(key) && key !== 'sex' && key !== 'grade' && key !== 'adjust' && key !== 'department_1' && key !== 'college') {
      dom[key].addEventListener('blur', checker[key]);
    }
  }

  dom.college.addEventListener('change', checker.college);

  dom.department_1.addEventListener('change', checker.department_1);

  dom.department_2.addEventListener('change', function () {
    if (confirmed === false && (data.department_2() === '技术部-北校专业' || data.department_2() === '产品运营部')) {
      var result = confirm('您选了北校专属部门哦，要不要试试神秘的契合度测试？');
      confirmed = true;
      if (result) {
        goToNorth();
      }
    }
    dom.department_2.classList.add('valid');
  })

  var goToNorth = function () {
    window.location.href = 'http://welcome.100steps.net/2018/spring' +
      '?name=' + data.name() +
      '&sex=' + data.sex() +
      '&grade=' + data.grade() +
      '&college=' + data.college() + 
      '&dorm=' + data.dorm() + 
      '&telephone=' + data.telephone() +
      '&department_1=' + data.department_1() +
      '&department_2=' + data.department_2() +
      '&adjust=' + data.adjust() + 
      '&introduction=' + data.introduction();
  }

  var radioTracker = function (dom, listener) {
    for (var i = 0; i < dom.length; i++) {
      dom[i].addEventListener('click', listener);
    }
  }

  radioTracker(dom.sex, checker.sex);
  radioTracker(dom.grade, checker.grade);
  radioTracker(dom.adjust, checker.adjust);

  document.getElementById('submitButton').addEventListener('click', function () {
    var errorStatus = false;
    for (var key in error) {
      if (error.hasOwnProperty(key)) {
        if (!checker[key]()) {
          errorStatus = true;
        }
      }
    }
    if (errorStatus) {
      return;
    } else {
      post('/2018/bbt_recruit/backend/register.php', {
        name: data.name(),
        sex: data.sex(),
        grade: data.grade(),
        college: data.college(),
        dorm: data.dorm(),
        telephone: data.telephone(),
        department1: data.department_1(),
        department2: data.department_2() === '' ? '无' : data.department_2(),
        adjust: data.adjust(),
        textarea: data.introduction(),
      }, false, function (data) {
        var obj = JSON.parse(data);
        if (obj.status === 0) {
          alert("报名成功！");
          window.location.href = "./success.html";
        } else {
          alert(obj.msg);
        }
      }, function () {
        alert('网络故障');
      })
    }
  })

})();