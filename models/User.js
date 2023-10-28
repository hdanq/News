"use strict";
let todoList;

const storageTodo = (x) => saveToStorage("todoList", x);
const todo = localStorage.getItem("todoList");
const todoArr = todo ? JSON.parse(todo) : [];

const storageUser = (x) => saveToStorage("currenUser", x);
const userCR = localStorage.getItem("currenUser");
const userArrCR = userCR ? JSON.parse(userCR) : [];

const storageSetting = (x) => saveToStorage("default", x);
const setting = localStorage.getItem("default");
const defaultSetting = setting ? JSON.parse(setting) : [];

// const fetchHTML = async (url) => {
//   const response = await fetch(url);
//   const html = await response.text();
//   return html;
// };

// let render = function () {};

// // get data in file HTML add to page
// let getLink = window.location.pathname;

// if (window.location.pathname !== "/JavaScript/ASM03/pages/todo.html") {
//   fetchHTML("./pages/todo.html")
//     .then((html) => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");
//       todoList = doc.getElementById("todo-list");

//       // render display

//       render = function (className, task) {
//         const html = `<li class = "${className}">${task}<span class = "close" onclick = "delFun(this)" >×</span></li>`;

//         todoList.insertAdjacentHTML("beforeend", html);
//       };
//     })
//     .catch((error) => {
//       // console.error("Error fetching HTML:", error);
//     });
// } else {
//   todoList = document.getElementById("todo-list");
//   render = function (className, task) {
//     const html = `<li class = "${className}">${task}<span class = "close" onclick = "delFun(this)" >×</span></li>`;

//     todoList.insertAdjacentHTML("beforeend", html);
//   };
// }

// if (userArrCR.length) {
//   for (let i in todoArr) {
//     if (todoArr[i].owner === userArrCR[0].username) {
//       if (todoArr[i].isDone) {
//         render("checked", todoArr[i].task);
//       } else {
//         render("", todoArr[i].task);
//       }
//     }
//   }
// }
