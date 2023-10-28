const loginModal = document.getElementById("login-modal");
const message = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

const userCurrent = localStorage.getItem("currenUser");
const nowUser = userCurrent ? JSON.parse(userCurrent) : [];

if (!message.textContent) {
  btnLogout.style.display = "none";
  const useActive = userArrCR.filter((x) => x.username === nowUser[0].username);

  if (nowUser.length) {
    loginModal.style.display = "none";
    message.innerHTML = `Welcome ${useActive[0].firstName}`;
    btnLogout.style.display = "block";
  }
}

btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currenUser");
  loginModal.removeAttribute("style");
  window.location.href = "./pages/login.html";
});
