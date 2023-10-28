const inputName = document.getElementById("input-username");
const inputPass = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// const storageUser = (x) => saveToStorage("currenUser", x);
const user = localStorage.getItem("user");
const userArr = user ? JSON.parse(user) : [];

btnLogin.addEventListener("click", function () {
  const userCurrent = userArr.filter(
    (x) => x.username === inputName.value && x.password === inputPass.value
  );

  if (userCurrent.length) {
    removeElement("check-user-name");
    removeElement("check-pass");
    // save login user information
    storageUser(userCurrent);
    // go to home page
    window.location.href = "../index.html";
  } else {
    // validate data
    if (userArr.length === 0) {
      removeElement("check-user-name");
      spanElement(
        "user-name",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-user-name"
      );
      spanElement1(
        "user-name",
        "You need register an account",
        "col-sm-9",
        "check-user-name"
      );
    }
    if (!inputName.value) {
      removeElement("check-user-name");
      spanElement(
        "user-name",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-user-name"
      );
      spanElement1(
        "user-name",
        "Please enter the username",
        "col-sm-9",
        "check-user-name"
      );
    } else {
      for (let i of userArr) {
        if (i.username !== inputName.value) {
          removeElement("check-user-name");
          spanElement(
            "user-name",
            "col-sm-3",
            "col-sm-3",
            false,
            "check-user-name"
          );
          spanElement1(
            "user-name",
            "Username does not exist",
            "col-sm-9",
            "check-user-name"
          );
        } else {
          removeElement("check-user-name");
          break;
        }
      }
    }
    if (!inputPass.value) {
      removeElement("check-pass");
      spanElement("pass", "col-sm-3", "col-sm-3", false, "check-pass");
      spanElement1(
        "pass",
        "Please enter the password",
        "col-sm-9",
        "check-pass"
      );
    } else {
      for (let i of userArr) {
        if (i.password !== inputPass.value) {
          removeElement("check-pass");
          spanElement("pass", "col-sm-3", "col-sm-3", false, "check-pass");
          spanElement1("pass", "Password incorrect", "col-sm-9", "check-pass");
        } else {
          removeElement("check-pass");
        }
      }
    }
  }
});
