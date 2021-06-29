var count = 10;

var cookie = ''

function toPopup() {
  alert('to popup!')
}


// 使用长连接 - 监听 popup 传递来的消息
// chrome.extension.onConnect.addListener(port => {
//   console.log('连接中------------')
//   port.onMessage.addListener(msg => {
//       console.log('接收消息：', msg)
//       getAll()
//       port.postMessage('popup，我收到了你的信息~  bg')
//   })
// })

// // 获取所有 tab
// function getAll() {
//   const views = chrome.extension.getViews({
//       type: 'popup'
//   })

//   for (let o of views) {
//       console.log(111)
//       o.document.getElementById('pbText').innerHTML = "万圣节🎃快乐"
//   }
// }

function set (res) {
  alert(res)
  cookie = res
}
