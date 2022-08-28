var nameSearch = document.querySelector('#name-button');
var drinkName = document.querySelector('#drink-name');

fetch('https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
.then(res => res.json())
    .then(function (drinkInfo) {
        console.log(drinkInfo.drinks[0]);
        var img = document.createElement('img');
        var drinkimagesrc = drinkInfo.drinks[0].strDrinkThumb;
        img.setAttribute('src', drinkimagesrc);
        document.body.append(img);
    });
  //  .then(res => res.json())
   // .then(data => console.log(data.drinks[0]))
      // var img = document.createElement('img');
        //var drinkimagesrc = data.drinks[0].strDrinkThumb;
      //  img.setAttribute('src', drinkimagesrc)
      //  document.body.append(img);
//function getNameDrink() {

   // var namedrinkrequest = "www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName.toLowerCase;

 //   fetch(namedrinkrequest)
 //   .then(function (response) {
 //       return response.json();
//        console.log(response);
 //   });
   
        

 //   };

//nameSearch.addeventlistener("click", getNameDrink);

// i = 0, 1 < null