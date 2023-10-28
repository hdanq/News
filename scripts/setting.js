const newPage = document.getElementById("input-page-size");
const newCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

const defaultSet = {
  page: "5",
  category: "General",
  owner: "",
};

// check if the user has not installed the message board will return to the default setting
if (userArrCR.length === 0 && defaultSetting.length === 0) {
  defaultSet.owner = "temp";
  defaultSetting.push(defaultSet);
  storageSetting(defaultSetting);
}

// save data to storage if user installs it himself

btnSubmit.addEventListener("click", function () {
  let userFound = false;

  if (userArrCR.length) {
    for (let i in defaultSetting) {
      // check user
      if (defaultSetting[i].owner === userArrCR[0].username) {
        defaultSetting[i].page = newPage.value;
        defaultSetting[i].category = newCategory.value;

        storageSetting(defaultSetting);
        userFound = true;
        break;
      }
    }

    //Add settings for new users
    if (!userFound) {
      defaultSet.page = newPage.value;
      defaultSet.category = newCategory.value;
      defaultSet.owner = userArrCR[0].username;

      defaultSetting.push(defaultSet);

      storageSetting(defaultSetting);
    }
  } else {
    for (let i in defaultSetting) {
      // check user
      if (defaultSetting[i].owner === "temp") {
        defaultSetting[i].page = newPage.value;
        defaultSetting[i].category = newCategory.value;

        storageSetting(defaultSetting);
        break;
      }
    }
  }
});
