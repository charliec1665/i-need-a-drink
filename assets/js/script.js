<<<<<<< HEAD
var wihList = document.getElementById('wihlist');
var  items = {
  wihlist: [],
  winlist: [],
};

var createIngredient = function(itemText, itemList) {
    // create elements that make up a shopping list item
    var itemLi = $('<li>').addClass('collection-content').text(itemText);

    // append to ul list on page
    $('#' + itemList).append(itemLi);
};

var saveItems = function() {
    localStorage.setItem('items', JSON.stringify(items));
};

var loadItems = function() {
    items = JSON.parse(localStorage.getItem('items'));

  // if nothing in localStorage, create a new object to track all item list arrays
  if (!items) {
    items = {
      wihlist: [],
      winlist: [],
    };
  }

  // loop over object properties
  $.each(items, function(list, arr) {
    // then loop over sub-array
    arr.forEach(function(item) {
      createItem(item.text, list);
    });
  });
}

// ADD INGREDIENT EVENT LISTENER
$('.list-group').on('click', function(e) {
if (!e.target.matches("a")) return
  console.log(wihList);
    var text = $(this)
    .text()
    .trim();

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

        $(this).prepend(textInput);

        // lets the user automatically start typing rather than having to click twice to type
        textInput.trigger('focus');

    console.log($(this));
    console.log(wihList);
    // recreate button at bottom of ul
    var addButton = $('<a id="ing-btn" class="btn light-green lighten-5">');
    // console.log(addButton);
    var addButtonP = $('<p>').text(' Add ingredient');
    // console.log(addButtonP);
    var addButtonSpan = $('<span class="oi oi-plus">');
    // console.log(addButtonSpan);
    // append p to button
    addButton.append(addButtonP);
    // prepend span to p
    addButtonP.prepend(addButtonSpan);
    console.log(wihList);
    // grab parent elements id
    var list = $(this).closest('.list-group').attr('id');
    console.log(list);

    // var newList = document.querySelector('#' + list);
    // newList.append(addButton);

    var itemList = JSON.stringify(list);
    // console.log(itemList);
    var itemList = '#' + list;
    // console.log(itemList);

    // stringList = JSON.stringify(itemList);
    // console.log(stringList);

    // var grabList = '"' + itemList + '"';
    // console.log(grabList);

    // add button to parent list
    console.log(wihList);
    // if (list === 'wihlist') {
    //     var wihList = document.getElementById('wihlist');
    //     console.log(wihList);
    //     // wihList.append(addButton);
    // } 
    // else {
    //     var winList = $('#win-list');
    //     winList.append(addButton);
    // }
});

// ADD INGREDIENT EVENT ON CHANGE
$(document).on('blur', 'textarea', function() {
  console.log($(this)
  .closest('.collection-content').index());  
  // get textarea's current value
    var text = $(this)
    .val()
    .trim();
    console.log(text);

    // get parent ul's id attribute
    var list = $(this)
    .closest('.list-group')
    .attr('id');
    console.log(list); // this is coming up as undefined?

    // get task's position in list of li elements
    var index = $(this)
    .closest('.collection-content')
    .index();
    console.log(index);
    console.log(items)
    saveItems();
    if (index > -1){
      items[list][index] = text;
    }else{
      items[list].push(text)
    }
    // items is an object, list returns the array for that list, 
    // and index.text returns the text property of the object at that index
    // items[list][0].text = text;

    console.log(items)

    // items = {
    //   wihlist: [],
    //   winlist: [],
    // };
    

    // recreate li element
    var itemLi = $('<li>')
    .addClass('collection-content')
    .text(text);
    console.log(itemLi);

    // replace textarea with p element
    $(this).replaceWith(itemLi);
});

// MAKE LIST ITEMS DRAGGABLE
$('.card .list-group').sortable({
    connectWith: $('.card .list-group'),
    scroll: false,
    tolerance: 'pointer',
    helper: 'clone',
    activate: function(event) {
        $(this).addClass('dropover');
        $('#trash').addClass('trash-drag');
    },
    deactivate: function(event) {
        $(this).removeClass('dropover');
        $('#trash').removeClass('trash-drag');
    },
    over: function(event) {
        $(event.target).addClass('dropover-active');
    },
    out: function(event) {
        $(event.target).removeClass('dropover-active');
    },
    update: function(event) {
        // array to store item data in
        var tempArr = [];

        // loop over current set of children in sortable list
        $(this).children().each(function() {
            var text = $(this)
                .find('li')
                .text()
                .trim();
            
            // add item data to the array as an object
            tempArr.push({
                text: text
            });
        });

        console.log(tempArr);

        // trim down list's ID to match object property
        var arrName = $(this)
            .attr('id');
        
        // update array on tasks object and save
        items[arrName] = tempArr;
        saveItems();
    }
})

// remove item by dragging
$('#trash').droppable({
    accept: '.card .collection-content',
    tolerance: 'touch',
    drop: function(event, ui) {
      ui.draggable.remove();
    },
    over: function(event, ui) {
      $('#trash').addClass('trash-active');
    },
    out: function(event, ui) {
      $('#trash').removeClass('trash-active');
    }
  });

// load items for the first time
// loadItems();
=======

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
>>>>>>> 181365ada97206f8c1d932d78bc6e3b434b07cff
