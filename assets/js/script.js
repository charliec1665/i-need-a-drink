var wihList = document.getElementById('wihlist');
var  items = {
  wihlist: [],
  winlist: [],
};

// API https://www.thecocktaildb.com/api/json/v1/1/random.php

// FIRST SEARCH DRINK START
//Click event to collect name of drink
document.getElementById('name-button').onclick = function(){
    var userDrink = document.getElementById('drinkname').value;
        console.log(userDrink); 
   //Replacing any submission with spaces to an underscore to make the API work correctly
    var convertdrink = userDrink.trim().replace(' ','_');
        console.log(convertdrink);
//API fetch with user inputed drink
fetch('https:thecocktaildb.com/api/json/v1/1/search.php?s=' + convertdrink)
    .then(function (res){
        return res.json();
    })
    .then(function (data) {
        //Drink Name Heading
        var drinkName = data.drinks[0].strDrink;
        
        const nameHeading = document.createElement('h2');
        nameHeading.textContent = drinkName;
        $('#drink-name').append(nameHeading);

      //Drink Image
        var img = document.createElement('img');
        var drinkImgSrc = data.drinks[0].strDrinkThumb;
        img.setAttribute('src', drinkImgSrc);
        $('#image').append(img);
        console.log(data);

        //Ingredient Listing
        
            //ingredient Array
        var ingarray = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15];
            //Filter out "null" ingredients
        var nullFilter = ingarray.filter(function(el)
        {
            return el;
        })
        console.log(nullFilter);
        var list = $('#ingredients-list');
            //Add Ingredients to HTML
        nullFilter.forEach((item) => {
            var li = document.createElement('li')
            li.innerText = item;
            list.append(li);
        });

        $('#instructions').html('<p>' + data.drinks[0]["strInstructions"] +'</p>');
        $('#recipe-card').show();
    }); 

    $("#print-button").on('click', function() {
        window.print();
    });
};
//clear drink results
document.getElementById('clear-button').onclick =function(){
    // $('#drink-name').remove()
    // $("#image").remove()
    // $('#category').remove()
    // $('#type').remove()
    // $('#recipe').remove();
    $("#recipe-card").hide();
};






// SECOND SEARCH DRINK START
document.getElementById('ing-button').onclick = function(){
    var userIng = document.getElementById('ing-name').value;
        console.log(userIng);
   //Replacing any submission with spaces to an underscore to make the API work correctly
    var convertIng = userIng.trim().replace(' ','_');
        console.log(convertIng);
    //API fetch with user inputed drink
    fetch('https:thecocktaildb.com/api/json/v1/1/search.php?i=' + convertIng)
        .then(function (res){
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            //Drink Name Heading
            var ingName = data.ingredients[0].strIngredient;
            console.log(ingName);
            const ingHeading = document.createElement('h2');
            console.log(ingHeading);
            ingHeading.textContent = ingName;
            $('#drink-name').append(ingHeading);
            //Ingredient Discription
            var ingDesc = data.ingredients[0].strDescription;
            console.log(ingDesc);
            const ingdesc = document.createElement('p');
            console.log(ingdesc);
            ingdesc.textContent = ingDesc;
            $('#instructions').append(ingDesc);

            $('#recipe-card').show();
    });
};
    




// THINH'S GENERATE RANDOM COCKTAIL START
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




// SHOPPING LIST FUNCTION START
    var createItem = function(itemText, itemList) { //itemText is coming up as undefined !!!!
        // create elements that make up a shopping list item
        var itemLi = $('<li>').addClass('collection-content').text(itemText);
    
        // append to ul list on page
        $('#' + itemList).prepend(itemLi);
    };
    
    // save lists to local storage
    var saveItems = function() {
        localStorage.setItem('items', JSON.stringify(items));
    };
    
    // load saved lists upon opening / persistence
    var loadItems = function() {
        // debugger;
        items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
    
      // if nothing in localStorage, create a new object to track all item list arrays
      if (!items) {
        items = {
          wihlist: [],
          winlist: [],
        };
      }
      
      // loop over object properties
      $.each(items, function(list, arr) {
        console.log(list);
        console.log(arr);
        // then loop over sub-array and create the list name and item text
        arr.forEach(function(item) {
            console.log(item);
          createItem(item, list);
        });
      });
    };
    
    // ADD INGREDIENT EVENT LISTENER
    $('.list-group').on('click', function(e) {
        // if the target of click does not match a button element, return
        if (!e.target.matches("a" && "span" && "p")) return;

        // var text = $(this)
        // .text()
        // .trim();
        
        // creates the text input area
        var textInput = $('<textarea>')
            .addClass('form-control');
            // .val(text);
    
            $(this).prepend(textInput);
    
            // lets the user automatically start typing rather than having to click twice to type
            textInput.trigger('focus');
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
        
        if (index > -1){
          items[list][index] = text;
        }else{
          items[list].push(text);
        };
        // items is an object, list returns the array for that list, 
        // and index.text returns the text property of the object at that index
        // items[list][0].text = text;
        saveItems();
        console.log(items)
        
        // recreate li element
        var itemLi = $('<li>')
        .addClass('collection-content')
        .text(text);
        console.log(itemLi);
    
        // replace textarea with p element
        $(this).replaceWith(itemLi);
    });

    //clear list results

$('#trash').on('click', function(e) {
    // if the target of click does not match a button element, return
    if (!e.target.matches("a" && "span" && "p")) return;
    
    $('#collection-content').remove();
});
    
    // // MAKE LIST ITEMS DRAGGABLE
    // $('.card .list-group').sortable({
    //     connectWith: $('.card .list-group'),
    //     scroll: false,
    //     tolerance: 'pointer',
    //     helper: 'clone',
    //     activate: function(event) {
    //         $(this).addClass('dropover');
    //         $('#trash').addClass('trash-drag');
    //     },
    //     deactivate: function(event) {
    //         $(this).removeClass('dropover');
    //         $('#trash').removeClass('trash-drag');
    //     },
    //     over: function(event) {
    //         $(event.target).addClass('dropover-active');
    //     },
    //     out: function(event) {
    //         $(event.target).removeClass('dropover-active');
    //     },
    //     update: function(event) {
    //         // array to store item data in
    //         var tempArr = [];
    
    //         // loop over current set of children in sortable list
    //         $(this).children().each(function() {
    //             var text = $(this)
    //                 .find('li')
    //                 .text()
    //                 .trim();
                
    //             // add item data to the array as an object
    //             tempArr.push({
    //                 text: text
    //             });
    //         });
    
    //         console.log(tempArr);
    
    //         // trim down list's ID to match object property
    //         var arrName = $(this)
    //             .attr('id');
            
    //         // update array on tasks object and save
    //         items[arrName] = tempArr;
    //         saveItems();
    //     }
    // })
    
    // // remove item by dragging
    // $('#trash').droppable({
    //     accept: '.card .collection-content',
    //     tolerance: 'touch',
    //     drop: function(event, ui) {
    //       ui.draggable.remove();
    //     },
    //     over: function(event, ui) {
    //       $('#trash').addClass('trash-active');
    //     },
    //     out: function(event, ui) {
    //       $('#trash').removeClass('trash-active');
    //     }
    //   });
    
    // load items for the first time
    loadItems();
