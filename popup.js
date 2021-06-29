$(function(){
  var state = $('#state');
  $('#send').click(function () {//给对象绑定事件
      chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
          //向tab发送请求
          chrome.tabs.sendMessage(tab[0].id, { 
              action: "send",
              keyword: $('#keyword').val()
          }, function (response) {
              console.log(response);
              state.html(response.state)
          });
      });
  });
  $('#submit').click(function () {
      chrome.tabs.query({active:true, currentWindow:true}, function (tab) {
          chrome.tabs.sendMessage(tab[0].id, {  
             action: "submit"   
          }, function (response) {
              state.html(response.state)
          });
      });
  })

})

var bg = chrome.extension.getBackgroundPage();
$(function(){

    $('#input').val(bg.count);
    $('#btn').click(function(){
        bg.count = bg.count+1;
        $('#input').val(bg.count);
    });
})

$(function(){
  $('#bg').on('click', () => {
    // background 通信
    // background --> popup --> background

    bg.toPopup()
  })

    
  

})

$(function(){
  // content --> popup --> content
  // chrome.runtime.onMessage.addListener((req,sender, sendResponse) => {
  //   sendResponse('我收到了你的来信')
  //   console.log('接收了来自 content.js的消息', req.info)
  // })

})

$(function() {
  // // 使用长连接
  // let port = chrome.extension.connect({
  //   name: 'popup'
  // })
  // // popup --> background --> popup
  // // 使用postMs 发送信息
  // port.postMessage('cookie')
  // // 接收信息
  // port.onMessage.addListener(msg => {
  //   console.log('接收的信息：', msg)
  // })
  $('#getCk').on('click', () => {
    chrome.cookies.getAll({url: 'https://erp.pangmaoyuntest.com/'}, (cks) => {
      console.log('cks', cks)
      const cookie = cks.map(x => `${x.name}=${x.value}`).join(';')
      bg.set(cookie)
      console.log('bg.cookie', bg.cookie)
      $('#ckList').html(cookie)

      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const { url } = tabs[0]
        cks.map(({name, value}) => {
          chrome.cookies.set({
            url,
            name,
            value
          })
        })
      })
    })
  })
})
