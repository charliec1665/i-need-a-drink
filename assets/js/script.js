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