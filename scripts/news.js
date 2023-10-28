const newcontainer = document.getElementById("news-container");
const btnNext = document.getElementById("btn-next");
const btnPre = document.getElementById("btn-prev");
const pageNumber = document.getElementById("page-num");

// countPage is used to count the number of currently displayed pages
let countPage = 1;

// render news
const renderData = function (data, positiondisplayNews) {
  const html = `<div class="flex-row flex-wrap">
  <div class="card mb-3" style="">
 <div class="row no-gutters">
   <div class="col-md-4">
     <img
       src="${data.articles[positiondisplayNews].urlToImage}"
       class="card-img"
       alt="${data.articles[positiondisplayNews].title}"
     />
   </div>
   <div class="col-md-8">
     <div class="card-body">
     <h5 class = "card-title">${data.articles[positiondisplayNews].title}</h5>
     <p class = "card-text">${data.articles[positiondisplayNews].description}</p>
       <a href="
         ${data.articles[positiondisplayNews].url}" class = "btn btn-primary"
         >View</a
       >
     </div>
   </div>
 </div>
</div>
</div>`;

  newcontainer.insertAdjacentHTML("beforeend", html);
};

// get API render news

const displayNews = async function (page) {
  const apiKey = "1f607f77ab1a4e209a64e112183833ce";

  let url = `https://newsapi.org/v2/top-headlines?country=us&category=General&pageSize=10&page=${page}&apiKey=${apiKey}`;

  for (let i in defaultSetting) {
    if (userArrCR.length) {
      // parameters according to user settings
      const userSetting = `https://newsapi.org/v2/top-headlines?country=us&category=${defaultSetting[i].category}&pageSize=${defaultSetting[i].page}&page=${page}&apiKey=${apiKey}`;

      //Retrieve user-specific configuration data
      if (defaultSetting[i].owner === userArrCR[0].username) {
        url = userSetting;
        break;
      } else {
        url = userSetting;
      }
    } else if (defaultSetting[i].owner === "temp") {
      url = userSetting;
    }
  }

  try {
    const response = await fetch(url);

    const data = await response.json();

    //totalItemsgth articles
    let totalItems = defaultSetting.page;

    //totalResults articles
    let totalResults = data.totalResults;

    // totalPages
    let totalPages = Math.ceil(totalResults / totalItems);

    // disabled btn next

    if (Number(pageNumber.textContent) === totalPages) {
      btnNext.parentNode.classList.add("disabled");
    } else {
      btnNext.parentNode.classList.remove("disabled");
    }

    // // disabled btn prev

    if (pageNumber.textContent === "1") {
      btnPre.parentNode.classList.add("disabled");
    } else {
      btnPre.parentNode.classList.remove("disabled");
    }

    for (let i = 0; i < data.articles.length; i++) {
      renderData(data, i);
    }
  } catch (error) {
    console.error("Can't load API");
  }
};

displayNews(countPage);

// button next news
btnNext.addEventListener("click", function () {
  countPage++;

  // change number page
  pageNumber.innerHTML = countPage;

  // delete the old bulletin of the previous page
  newcontainer.innerHTML = "";
  displayNews(countPage);
});

// button prev news
btnPre.addEventListener("click", function () {
  countPage--;

  // change number page
  pageNumber.innerHTML = countPage;

  // delete the old bulletin of the previous page
  newcontainer.innerHTML = "";
  displayNews(countPage);
});
