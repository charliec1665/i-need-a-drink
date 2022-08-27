var items = {};

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
$('.list-group').on('click', function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

        $(this).replaceWith(textInput);

        // lets the user automatically start typing rather than having to click twice to type
        textInput.trigger('focus');

    console.log($(this));

    // recreate button at bottom of ul
    var addButton = $('<a id="ing-btn" class="btn light-green lighten-5">');
    console.log(addButton);
    var addButtonP = $('<p>').text(' Add ingredient');
    console.log(addButtonP);
    var addButtonSpan = $('<span class="oi oi-plus">');
    console.log(addButtonSpan);
    // append p to button
    addButton.append(addButtonP);
    // prepend span to p
    addButtonP.prepend(addButtonSpan);
    
    // grab parent elements id
    var list = $(this)
    .closest('.list-group')
    .attr('id');
    console.log(list);

    // var newList = document.querySelector('#' + list);
    // newList.append(addButton);

    var itemList = JSON.stringify(list);
    // console.log(itemList);
    var itemList = '#' + list;
    console.log(itemList);

    // stringList = JSON.stringify(itemList);
    // console.log(stringList);

    // var grabList = '"' + itemList + '"';
    // console.log(grabList);

    // add button to parent list
    if (itemList === 'wihlist') {
        var wihList = $('#wihlist');
        wihList.append(addButton);
    } 
    else {
        var winList = $('#win-list');
        winList.append(addButton);
    }
})

// ADD INGREDIENT EVENT ON CHANGE
$(document).on('blur', 'textarea', function() {
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

    // items is an object, list returns the array for that list, 
    // and index.text returns the text property of the object at that index
    items[list][index].text = text;
    saveItems();

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