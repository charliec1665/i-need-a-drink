var items = {};

var createIngredient = function(itemText, itemList) {
    // create elements that make up a shopping list item
    var itemLi = $('<li>').addClass("list-group-item");
    var itemP = $('<p>').addClass("m-1").text(itemText);

    // append p element to parent li
    itemLi.append(itemP);

    // append to ul list on page
    $('#list-' + itemList).append(itemLi);
};

// ADD INGREDIENT EVENT LISTENER
$('.list-group').on('click', 'a', function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

        $(this).replaceWith(textInput);

        textInput.trigger('focus');
    
    // grab parent elements id
    var list = $(this)
    .closest('.list-group')
    .attr('id');
    console.log(list);
    // change button id's so that the lists dont get their wires crossed


    // recreate button at bottom of ul
    var addButton = $('<button id="ing-btn" class="btn btn-outline-light text-dark font-weight-lighter">');
    var addButtonSpan = $('<span class="oi oi-plus">').text(' Add ingredient');
    // append to span to button
    addButton.append(addButtonSpan);
    
    // append button to parent
    

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
    .closest('.list-group-item')
    .index();

    // items[list][index].text = text;
    // saveTasks();

    // recreate p element
    var itemLi = $('<li>')
    .addClass('collection-content m-1')
    .text(text);

    // replace textarea with p element
    $(this).replaceWith(itemLi);
});
