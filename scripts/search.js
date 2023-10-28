const newcontainer = document.getElementById("news-container");
const inputSearch = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");

const btnNext = document.getElementById("btn-next");
const btnPre = document.getElementById("btn-prev");
const pageNumber = document.getElementById("page-num");

const apiKey = "66d507a78402477cb0846b80e38190fe";

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

const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

btnSubmit.addEventListener("click", function () {
  const searchQuery = inputSearch.value;

  // check special character
  if (specialCharRegex.test(searchQuery)) {
    removeElement("check-fail");
    spanElement1(
      "form--1",
      "Do not use special characters",
      "col-sm-3",
      "check-fail"
    );
    specialCharDetected = true;
    return;
  } else {
    removeElement("check-fail");
  }

  // reset the default value of page numbers
  pageNumber.innerHTML = 1;

  async function searchNews(page) {
    // Delete previously searched data
    newcontainer.innerHTML = "";

    // get API
    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&pagesize=5&page=${page}`;

    // Check whether data has been entered
    if (!inputSearch.value) {
      removeElement("check-fail");
      spanElement1(
        "form--1",
        "Enter the input to search",
        "col-sm-3",
        "check-fail"
      );
    } else {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        //totalItemsgth articles
        let totalItems = 5;

        //totalResults articles
        const totalResults = data.totalResults;

        // totalPages
        const totalPages = Math.ceil(totalResults / totalItems);

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

        // ------------ Render display news ---------------
        for (let i = 0; i < data.articles.length; i++) {
          renderData(data, i);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  let countPage = 1;

  btnNext.addEventListener("click", function () {
    countPage++;

    // change number page
    pageNumber.innerHTML = countPage;

    // delete the old bulletin of the previous page
    newcontainer.innerHTML = "";
    searchNews(countPage);
  });

  // button prev news
  btnPre.addEventListener("click", function () {
    countPage--;

    // change number page
    pageNumber.innerHTML = countPage;

    // delete the old bulletin of the previous page
    newcontainer.innerHTML = "";
    searchNews(countPage);
  });
  searchNews();
});
