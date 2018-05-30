(function () {
  var timeout;
  var hideLoading = function () {
    clearTimeout(timeout);
    var element = document.getElementById('loading');
    element.classList.add('fadeOut');
    setTimeout(function () {
      element.classList.add('hide');
    }, 500);
  }
  window.addEventListener('load', hideLoading)
  timeout = setTimeout(hideLoading, 5000);
})();