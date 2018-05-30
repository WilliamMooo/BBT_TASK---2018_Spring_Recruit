(function () {
  var timeout;
  var dialogs = document.getElementsByClassName('dialog-image');
  var initAnimation = function () {
    clearTimeout(timeout);
    setTimeout(function () {
      dialogs[0].classList.add('in');
      setTimeout(function() {
        dialogs[1].classList.add('in');
        setTimeout(function() {
          dialogs[2].classList.add('in');
          setTimeout(function() {
            dialogs[3].classList.add('in');
            setTimeout(function() {
              expandBottom();
            }, 500)
          }, 650)
        }, 700)
      }, 850)
    }, 800);
  }
  window.addEventListener('load', initAnimation)
  timeout = setTimeout(initAnimation, 5000);

  var bottom = document.getElementById('bottom');
  var container = document.getElementById('container');
  var inputBox = document.getElementById('inputBox');
  var okBotton = document.getElementById('okButton');
  var noBotton = document.getElementById('noBotton');
  var queryBotton = document.getElementById('queryBotton');
  var anotherOkBotton = document.getElementById('anotherOkBotton');
  var dialogWrapper = document.getElementById('dialogWrapper');

  var stage = 0;

  var expandBottom = function () {
    if (stage === 2) {
      var offset = document.body.clientHeight - dialogWrapper.clientHeight - document.body.clientWidth / 375 * 255;
      if (offset < 0) {
        dialogWrapper.style.top = offset + 'px';
      }
    }
    bottom.classList.add('expanded');
  }

  var hideBottom = function () {
    if (stage === 2) {
      dialogWrapper.style.top = 0 + 'px';
    }
    bottom.classList.remove('expanded');
  }

  var goToQuery = function () {
    window.location.href = './query.html';
  }

  var goToConfirm = function () {
    window.location.href = './confirm.html';
  }

  var goToStage2 = function () {
    dialogs[4].classList.add('in');
    for (var i = 5; i < 7; i++) {
      (function (internal) {
        setTimeout(function () {
          dialogs[internal].classList.add('in');
          if (internal === 5) {
            var offset = document.body.clientHeight - dialogWrapper.clientHeight - document.body.clientWidth / 375 * 255 + 50;
            if (offset < 0){
              dialogWrapper.style.top = offset + 'px';
            }
          }
          if (internal === 6) {
            var offset = document.body.clientHeight - dialogWrapper.clientHeight - document.body.clientWidth / 375 * 255;
            if (offset < 0) {
              dialogWrapper.style.top = offset + 'px';
            }
            stage = 2;
          }
        }, (internal - 4) * 800)
      })(i)

    }
    okBotton.classList.add('hide');
    noBotton.classList.add('hide');
    queryBotton.classList.add('hide');
    anotherOkBotton.classList.remove('hide');
  }

  inputBox.addEventListener('click', expandBottom);
  container.addEventListener('click', hideBottom);
  okBotton.addEventListener('click', goToConfirm);
  anotherOkBotton.addEventListener('click', goToConfirm);
  queryBotton.addEventListener('click', goToQuery);

  noBotton.addEventListener('click', goToStage2);
})();