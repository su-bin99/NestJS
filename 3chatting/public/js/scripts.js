const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    console.log(`리턴으로 받아온 값 : ${data}`);
  });
  // new_user 가 이벤트 이름
  // 백엔드 코드에서도 이벤트 이름으로 받아와야함

  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init();
