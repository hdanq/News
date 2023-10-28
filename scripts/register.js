"use strict";

const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const passwordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

const storageRegister = (x) => saveToStorage("user", x);
const user = localStorage.getItem("user");
const userArr = user ? JSON.parse(user) : [];

const User = function (firstName, lastName, username, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.username = username;
  this.password = password;
};

const validate = function () {
  //check input do not empty
  if (!firstName.value) return false;
  if (!lastName.value) return false;
  if (!username.value) return false;
  if (!password.value) return false;
  if (!passwordConfirm.value) return false;

  // check valid username
  for (let i of userArr) {
    if (i.username === username.value) {
      return false;
    }
  }

  // check valid password
  if (password.value !== passwordConfirm.value || password.value.length < 8) {
    return false;
  }

  return true;
};
btnSubmit.addEventListener("click", function () {
  const check = validate();

  if (check) {
    const newUser = new User(
      firstName.value,
      lastName.value,
      username.value,
      password.value
    );
    userArr.push(newUser);
    storageRegister(userArr);

    //redirect to login page
    window.location.href = "../pages/login.html";
  } else {
    // Notification when first name has not been entered
    if (!firstName.value) {
      removeElement("check-first-name");
      spanElement("name", "col-sm-3", "col-sm-3", false, "check-first-name");
      spanElement1(
        "name",
        "Please enter the first Name",
        "col-sm-3",
        "check-first-name"
      );
    } else {
      removeElement("check-first-name");
    }

    // // Notification when last name has not been entered
    if (!lastName.value) {
      removeElement("check-last-name");
      spanElement(
        "name",
        "col-sm-3",
        "col-sm-9",
        ".check-first-name",
        "check-last-name"
      );
      spanElement1(
        "name",
        "Please enter the Last Name",
        "col-sm-3",
        "check-last-name"
      );
    } else {
      removeElement("check-last-name");
    }

    // Notify when username already exists
    for (let i of userArr) {
      if (i.username === username.value) {
        removeElement("check-username");
        spanElement(
          "username",
          "col-sm-3",
          "col-sm-3",
          false,
          "check-username"
        );
        spanElement1(
          "username",
          "Username already exists",
          "col-sm-9",
          "check-username"
        );
      } else {
        removeElement("check-username");
      }
    }

    // Notification when username has not been entered
    if (!username.value) {
      removeElement("check-username");
      spanElement("username", "col-sm-3", "col-sm-3", false, "check-username");
      spanElement1(
        "username",
        "Please enter the username",
        "col-sm-9",
        "check-username"
      );
    } else {
      console.log("dsadsadas");
      removeElement("check-username");
    }

    // Notification when password has not been entered
    if (!password.value) {
      removeElement("check-password");
      spanElement("password", "col-sm-3", "col-sm-3", false, "check-password");

      spanElement1(
        "password",
        "Please enter the password",
        "col-sm-9",
        "check-password"
      );
      spanElement(
        "password-confirm",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-password"
      );
      spanElement1(
        "password-confirm",
        "Please enter the password",
        "col-sm-9",
        "check-password"
      );
    }
    // Notification when the password is less than 8 characters or does not match the confirmation password
    else if (password.value.length < 8) {
      removeElement("check-password");
      spanElement("password", "col-sm-3", "col-sm-3", false, "check-password");

      spanElement1(
        "password",
        "The passwords are less than 8 characters",
        "col-sm-9",
        "check-password"
      );
      spanElement(
        "password-confirm",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-password"
      );
      spanElement1(
        "password-confirm",
        "The passwords are less than 8 characters",
        "col-sm-9",
        "check-password"
      );
    } else if (password.value !== passwordConfirm.value) {
      removeElement("check-password");
      // spanElement("password", "col-sm-3", "col-sm-3", false, "check-password");

      // spanElement1(
      //   "password",
      //   "The passwords do not match",
      //   "col-sm-9",
      //   "check-password"
      // );
      spanElement(
        "password-confirm",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-password"
      );
      spanElement1(
        "password-confirm",
        "The passwords do not match",
        "col-sm-9",
        "check-password"
      );
    } else {
      removeElement("check-password");
    }

    // clear the error message if enter the input
    username.addEventListener("keyup", function () {
      removeElement("check-username");
    });
    // clear the error message if enter the pass
    password.addEventListener("keyup", function () {
      removeElement("check-password");
    });

    // clear the error message if password = password confirm
    passwordConfirm.addEventListener("keyup", function () {
      let temp = "";
      for (let i of password.value) {
        temp += i;

        // Compare passwords from left to right
        if (temp === passwordConfirm.value) {
          console.log("i = :" + i);
          console.log("confirm = :" + passwordConfirm.value);
          removeElement("check-password");
          break;
        } else {
          removeElement("check-password");
          spanElement(
            "password-confirm",
            "col-sm-3",
            "col-sm-3",
            false,
            "check-password"
          );
          spanElement1(
            "password-confirm",
            "The passwords do not match",
            "col-sm-9",
            "check-password"
          );
        }
      }
    });
  }
});
