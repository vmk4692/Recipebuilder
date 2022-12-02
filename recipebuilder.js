const api_url = "https://www.themealdb.com/api/json/v1/1/categories.php";
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
  show(data);
}
getapi(api_url);

function show(data) {
  let tab = ``;

  for (let r of data.categories) {
    tab += `
        <div id=${
          r.strCategory
        } class='card col-sm-3 m-3' style='cursor: pointer' ${(onclick = my(
      data,
      r.strCategory
    ))}>
  <img src='${r.strCategoryThumb}' class='card-img-top' alt='...'>
  <div class='card-body'>
    <h5 class='card-title text-center'>${r.strCategory}</h5>
  </div>
</div>
`;
  }

  document.getElementById("recipedata").innerHTML = tab;
}

var mealData = true;
function my(data, r) {
  if (mealData) {
    addEventListener("click", (e) => {
      for (i = 0; i < data.categories.length; i++) {
        let idCat = data.categories[i].strCategory;

        if (
          e.target.id === idCat ||
          e.target.parentElement.id === idCat ||
          e.target.parentElement.parentElement.id === idCat
        ) {
          console.log(idCat);
          async function getapi(url1) {
            const response = await fetch(url1);
            var data1 = await response.json();
            show1(data1);
          }
          getapi(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${idCat}`
          );
        }
      }
    });
    mealData = false;
  }
}
function show1(data1) {
  console.log(data1);
  document.write(
    `<style>
    .gobackbtn{
      width: 95px;
    right: 0;
    top: 0;
    z-index: 5;
    position:fixed;
    }
    </style>
    <a class='btn btn-danger my-3 gobackbtn' onClick='window.location.reload();' >Go Back<a>`
  );
  for (let rd of data1.meals) {
    document.write(`<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'>
<style>
.card{
  width:260px;
  float:left;
  cursor: pointer;
}
</style>
<div class='card m-3'>
<img src='${rd.strMealThumb}' class='card-img-top' alt='...' width='100%'>
<div class='card-body'>
<h5 class='card-title text-center'>${rd.strMeal}</h5>
<h6><b>Instructions</b></h6
<p >${rd.strInstructions.slice(0, 100)}... <a href="#">more</a></p>
</div>
</div>`);
  }
}
