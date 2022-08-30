
// API https://www.thecocktaildb.com/api/json/v1/1/random.php

console.log('Connected!');
$("footer").hide();
$("#recipe-card").hide();

$(document).ready(function() {
   
// generate random cocktail on button click
    $('#generate').click(function() {  

        axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function(response) {
            console.log(response.data.drinks[0]);            

            $("#drink-name").html('<h2>' + response.data.drinks[0]["strDrink"] + '</h2>');   
            $("#image").html('<img src=' + response.data.drinks[0]["strDrinkThumb"] + '></img>');
            $("#category").html("<p id='category-info'><strong>Category:</strong> " + response.data.drinks[0]["strCategory"] + '</p>');
            $("#type").html("<p><strong>Type:</strong> " + response.data.drinks[0]["strAlcoholic"] + '</p>');
            $("#recipe").show();

            var ingarray = [response.data.drinks[0].strIngredient1,response.data.drinks[0].strIngredient2,response.data.drinks[0].strIngredient3, response.data.drinks[0].strIngredient4, response.data.drinks[0].strIngredient5, response.data.drinks[0].strIngredient6, response.data.drinks[0].strIngredient7, response.data.drinks[0].strIngredient8, response.data.drinks[0].strIngredient9, response.data.drinks[0].strIngredient10, response.data.drinks[0].strIngredient11, response.data.drinks[0].strIngredient12, response.data.drinks[0].strIngredient13, response.data.drinks[0].strIngredient14, response.data.drinks[0].strIngredient15];
            var nullFilter = ingarray.filter(function(el)
            {
                return el;
            })
            var list = $("#ingredients-list");
            nullFilter.forEach((item) => {
                var li = document.createElement('li')
                li.innerText = item;
                list.append(li);
            });

            $("#instructions").html('<p>' + response.data.drinks[0]["strInstructions"] +'</p>');
            $("#recipe-card").show();
        });
    });
  
  $("#print-button").on('click', function() {
      window.print();
  });

});


//var drinkInput = 'Margarita';
var resultArea = $('.result-box');
var searchForm = $('#search-form');
var drinkInput = $('#drink-name')


searchForm.submit(function(event) {
    event.preventDefault();

    var nameValue = drinkInput.val();
    console.log(nameValue);

    drinkInput.vall('');
})

function searchDrink(userDrink)
fetch('https:thecocktaildb.com/api/json/v1/1/search.php?s=' + userDrink)
    .then(function (res){
        return res.json();
    })
    .then(function (data) {
        //Drink Name Heading
        var drinkName = data.drinks[0].strDrink;
        
        const nameHeading = document.createElement('h2');
        nameHeading.textContent = drinkName;
        document.body.append(nameHeading)

      //Drink Image
        var img = document.createElement('img');
        var drinkImgSrc = data.drinks[0].strDrinkThumb;
        img.setAttribute('src', drinkImgSrc);
        document.body.append(img);
        console.log(data);

        //Ingredient Heading
        const ingHeading = document.createElement('h3');
        ingHeading.textContent  = 'Ingredient(s):'
        document.body.append(ingHeading);

        //Ingredient Listing
        
            //ingredient Array
        var ingarray = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15];
            //Filter out "null" ingredients
        var nullFilter = ingarray.filter(function(el)
        {
            return el;
        })
        console.log(nullFilter);
        var list = document.body;
            //Add Ingredients to HTML
        nullFilter.forEach((item) => {
            var li = document.createElement('li')
            li.innerText = item;
            list.appendChild(li);
        });
        

    });





    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        //Drink Name Heading
        var drinkName = data.drinks[0].strDrink;
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = drinkName;
        document.body.append(nameHeader)
        //Drink Image
        var img = document.createElement('img');
        var drinkImgSrc = data.drinks[0].strDrinkThumb;
        img.setAttribute('src', drinkImgSrc);
        document.body.append(img);
        console.log(data);
        //Ingredient Heading
        const ingHeading = document.createElement('h3');
        ingHeading.textContent = 'Ingredient(s):'
        document.body.append(ingHeading);
        //Ingredient Listing
        //ingredient Array
        var ingarray = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15];
        //Filter out "null" ingredients
        var nullFilter = ingarray.filter(function (el) {
            return el;
        })
        console.log(nullFilter);
        var list = document.body;
        //Add Ingredients to HTML
        nullFilter.forEach((item) => {
            var li = document.createElement('li')
            li.innerText = item;
            list.appendChild(li);
        });
    });
