const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
todoList = document.getElementById("todo-list");

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

const render = function (className, task) {
  const html = `<li class = "${className}">${task}<span class = "close" onclick = "delFun(this)" >×</span></li>`;

  todoList.insertAdjacentHTML("beforeend", html);
};

if (userArrCR.length) {
  for (let i in todoArr) {
    if (todoArr[i].owner === userArrCR[0].username) {
      if (todoArr[i].isDone) {
        render("checked", todoArr[i].task);
      } else {
        render("", todoArr[i].task);
      }
    }
  }
}

const saveData = function (list) {
  render("", list.task);
  todoArr.push(list);
  storageTodo(todoArr);
};

// button add new task
btnAdd.addEventListener("click", function () {
  if (userArrCR.length) {
    if (inputTask.value != "") {
      removeElement("check-task");
      const list = new Task(inputTask.value, userArrCR[0].username, false);

      if (todoArr.length) {
        for (let i = 0; i < todoArr.length; i++) {
          if (
            todoArr[i].owner === userArrCR[0].username &&
            todoArr[i].task === inputTask.value
          ) {
            alert("Duplicate tasks");
            inputTask.value = "";
            return;
          }
        }
      }

      saveData(list);
      inputTask.value = "";
    } else if (inputTask.value === "") {
      // displays a message that the user has not entered data

      removeElement("check-task");
      const divEL = document.createElement("div");

      divEL.innerHTML = "Enter the input";
      divEL.classList.add("pl-3");
      divEL.classList.add("pb-2");
      divEL.classList.add("check-task");

      divEL.style.color = "#e03131";
      const todoContainer = document.getElementById("todo-container");
      todoContainer.parentNode.insertBefore(divEL, todoContainer);
    }
  } else {
    alert("you need login first");
    window.location.href = "./login.html";
  }
});

// delete li tag if click (x)
const delFun = function (e) {
  // find and delete localstorage
  for (let i = 0; i < todoArr.length; i++) {
    if (e.parentElement.textContent === `${todoArr[i].task}×`) {
      let useCF = confirm("are you sure?");
      if (useCF) {
        todoArr.splice(i, 1);
        storageTodo(todoArr);
      } else {
        return;
      }
    }
  }

  e.parentElement.remove();
};

// mark work is done

todoList.addEventListener("click", function (e) {
  let clickedText = e.target.textContent;

  // Find the todo in the todoArr array based on the clicked content
  let todo = todoArr.find(
    (item) =>
      `${item.task}×` === clickedText && item.owner === userArrCR[0].username
  );

  if (todo) {
    // Toggle the isDone status
    todo.isDone = !todo.isDone;
    storageTodo(todoArr);

    // Add or remove the 'checked' class
    e.target.classList.toggle("checked");
  }
});
