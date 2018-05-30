var dataChecker = function (data, json) {
  var type = typeof (data)
  switch (type) {
    case 'string':
      return data
    case 'object':
      if (json) {
        return JSON.stringify(data)
      } else {
        var counter = 0
        var targetString = ''
        for (var prop in data) {
          if (data.hasOwnProperty(prop)) {
            var propFilter = prop.replace(/&/g, '')
            var dataFilter = data[prop].toString().replace(/&/g, '')
            if (counter === 0) {
              targetString = targetString + propFilter + '=' + dataFilter
            } else {
              targetString = targetString + '&' + propFilter + '=' + dataFilter
            }
            counter++
          }
        }
        return targetString
      }
    default:
      return data
  }
}

var get = function get (url, data, json, successHandle, errorHandle, blob) {
  var xmlhttp = new XMLHttpRequest()
  if (xmlhttp != null) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) { // 4 = "loaded"
        if (xmlhttp.status === 200) { // 200 = "OK"
          if (blob) {
            successHandle(xmlhttp.response)
          } else {
            successHandle(xmlhttp.responseText)
          }
        } else {
          if (blob) {
            errorHandle(xmlhttp.response)
          } else {
            errorHandle(xmlhttp.statusText)
          }
        }
      }
    }
    var targetData = dataChecker(data, json)
    if (json) {
      targetData = 'json=' + targetData
    }
    xmlhttp.open('GET', url + (targetData !== '' ? '?' : '') + targetData, true)
    if (blob) {
      xmlhttp.responseType = 'blob'
    }
    xmlhttp.send(null)
  }
}

var post = function post (url, data, json, successHandle, errorHandle, blob) {
  var xmlhttp = new XMLHttpRequest()
  if (xmlhttp != null) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) { // 4 = "loaded"
        if (xmlhttp.status === 200) { // 200 = "OK"
          if (blob) {
            successHandle(xmlhttp.response)
          } else {
            successHandle(xmlhttp.responseText)
          }
        } else {
          if (blob) {
            errorHandle(xmlhttp.response)
          } else {
            errorHandle(xmlhttp.statusText)
          }
        }
      }
    }
    var targetData = dataChecker(data, json)
    xmlhttp.open('POST', url, true)
    if (json) {
      xmlhttp.setRequestHeader('Content-Type', 'application/json')
    } else {
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    if (blob) {
      xmlhttp.responseType = 'blob'
    }
    xmlhttp.send(targetData)
  }
}

var postFormData = function postFormData (url, formData, successHandle, errorHandle) {
  var xmlhttp = new XMLHttpRequest()
  if (xmlhttp != null) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) { // 4 = "loaded"
        if (xmlhttp.status === 200) { // 200 = "OK"
          successHandle(xmlhttp.responseText)
        } else {
          errorHandle(xmlhttp.statusText)
        }
      }
    }
    xmlhttp.open('POST', url, true)
    xmlhttp.send(formData)
  }
}