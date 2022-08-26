var items = {};

// var createIngredient = function(itemText, itemList) {
//     // create elements that make up a shopping list item
//     var itemLi = $('<li>').addClass("list-group-item");
//     var itemP = $('<p>').addClass("m-1").text(itemText);

//     // append p element to parent li
//     itemLi.append(itemP);

//     // append to ul list on page
//     $('#list-' + itemList).append(itemLi);
// };

// ADD INGREDIENT EVENT LISTENER
$('.list-group').on('click', function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

        $(this).replaceWith(textInput);

        textInput.trigger('focus');

    console.log($(this));

    // recreate button at bottom of ul
    var addButton = $('<a id="ing-btn" class="btn light-green lighten-5">');
    var addButtonP = $('<p>').text(' Add ingredient');
    var addButtonSpan = $('<span class="oi oi-plus">').text(' Add ingredient');
    // append p to button
    addButton.append(addButtonP);
    // prepend span to p
    addButtonP.prepend(addButtonSpan);
    
    // grab parent elements id
    var list = $(this)
    .closest('.list-group')
    .attr('id');
    console.log(list);

    var itemList = JSON.stringify(list);
    // // console.log(itemList);
    // var itemList = '#' + list;
    // console.log(itemList);

    // var grabList = '"' + itemList + '"';
    // console.log(grabList);

    

    // add button to parent list
    if (itemList === 'wih-list') {
        $('#wih-list').append(addButton);
    } 
    // else {
    //     var winList = $('#win-list');
    //     winList.append(addButton);
    // }
})

// ADD INGREDIENT EVENT ON CHANGE
$('.list-group').on('blur', 'textarea', function() {
    // get textarea's current value
    var text = $(this)
    .val()
    .trim();

    // get parent ul's id attribute
    var list = $(this)
    .closest('.list-group')
    .attr('id');

    // get task's position in list of li elements
    var index = $(this)
    .closest('.collection-content')
    .index();

    // items[list][index].text = text;
    // saveTasks();

    // recreate p element
    var itemLi = $('<li>')
    .addClass('collection-content')
    .text(text);

    // replace textarea with p element
    $(this).replaceWith(itemLi);
});
