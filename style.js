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

fetch('https:thecocktaildb.com/api/json/v1/1/search.php?s=Margarita')
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