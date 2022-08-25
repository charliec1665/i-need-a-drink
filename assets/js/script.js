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
$('.list-group').on('click', '#ing-btn', function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

        $(this).replaceWith(textInput);

        textInput.trigger('focus');
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
    .addClass('list-group-item m-1')
    .text(text);

    // replace textarea with p element
    $(this).replaceWith(itemLi);
});
