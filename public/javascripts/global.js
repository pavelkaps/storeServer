var bookListData = [];
var magazineListData = [];
var genreListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable1();
    populateTable2();
    populateTable3();

});

// Functions =============================================================

// Fill table with data
function populateTable1() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/booklist', function( data ) {
        bookListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td><a href="#" class="linkshowbook" rel="' + this.title + '">' + this.title + '</a></td>';
            tableContent += '<td>' + this.author + '</td>';
            tableContent += '<td>' + this.publisher + '</td>';
            tableContent += '<td>' + this.year + '</td>';
            tableContent += '<td>' + this.circulation + '</td>';
            tableContent += '<td>' + this.imageurl + '</td>';
            tableContent += '<td>' + this.rating + '</td>';
            tableContent += '<td><a href="#" class="linkdeletebook" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
    $('#bookList table tbody').html(tableContent);
        //Book link click
    $('#bookList table tbody').on('click', 'td a.linkshowbook', showBookInfo);
        // Add Book button click
    $('#btnAddBook').on('click', addBook);
         // Delete Book link click
    $('#bookList table tbody').on('click', 'td a.linkdeletebook', deleteBook);
    });

};

function populateTable2() {

    // Empty content string
    var tableContent = '';
    
    $.getJSON( '/users/magazinelist', function( data ) {
        magazineListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td><a href="#" class="linkshowmagazine" rel="' + this.title + '">' + this.title + '</a></td>';
            tableContent += '<td>' + this.publisher + '</td>';
            tableContent += '<td>' + this.edition + '</td>';
            tableContent += '<td>' + this.circulation + '</td>';
            tableContent += '<td>' + this.imageurl + '</td>';
            tableContent += '<td>' + this.rating + '</td>';
            tableContent += '<td><a href="#" class="linkdeletemagazine" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
       
        // Inject the whole content string into our existing HTML table
    $('#magazineList table tbody').html(tableContent);
        //Book link click
    $('#magazineList table tbody').on('click', 'td a.linkshowmagazine', showMagazineInfo);
        // Add Book button click
    $('#btnAddMagazine').on('click', addMagazine);
         // Delete Book link click
    $('#magazineList table tbody').on('click', 'td a.linkdeletemagazine', deleteMagazine);
    }); 
};

function populateTable3() {

    // Empty content string
    var tableContent = '';
    
    $.getJSON( '/users/genrelist', function( data ) {
        genreListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.title + '</td>';
            tableContent += '<td><a href="#" class="linkdeletemagazine" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
    $('#genreList table tbody').html(tableContent);
        //Book link click
   
    $('#btnAddToGenre').on('click', addToGenre);
         // Delete Book link click
    //$('#magazineList table tbody').on('click', 'td a.linkdeletemagazine', deleteMagazine);
    }); 
};

function addToGenre(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addToGenre input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    var idgenre;
    var idbook;
    
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        idgenre = $('#addToGenre fieldset input#inputBookId').val();
        idbook = $('#addToGenre fieldset input#inputGenreId').val();
        
        $.ajax({
            type: 'PUT',
            url: '/users/addbooktogenre/'+$(this).attr(idbook)
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addToGenre fieldset input').val('');

                // Update the table
                populateTable3();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
        
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// Show Magazine Info
function showMagazineInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisMagazineName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = magazineListData.map(function(arrayItem) { return arrayItem.title; }).indexOf(thisMagazineName);

    // Get our User Object
    var thisMagazineObject = magazineListData[arrayPosition];

    //Populate Info Box
    $('#magazineInfoTitle').text(thisMagazineObject.title);
    $('#magazineInfoPublisher').text(thisMagazineObject.publisher);
    $('#magazineInfoEdition').text(thisMagazineObject.edition);
    $('#magazineInfoCirculation').text(thisMagazineObject.circulation);
    $('#magazineInfoImageURL').text(thisMagazineObject.imageurl);
    $('#magazineInfoDescription').text(thisMagazineObject.description);
    $('#magazineInfoRating').text(thisMagazineObject.rating);

};

// Add Magazine
function addMagazine(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addMagazine input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newMgazine = {
            'title': $('#addMagazine fieldset input#inputMagazineTitle').val(),
            'publisher': $('#addMagazine fieldset input#inputMagazinePublisher').val(),
            'edition': $('#addMagazine fieldset input#inputMagazineEdition').val(),
            'circulation': $('#addMagazine fieldset input#inputMagazineCirculation').val(),
            'imageurl': $('#addMagazine fieldset input#inputMagazineImageURL').val(),
            'description': $('#addMagazine fieldset input#inputMagazineDescription').val(),
            'rating': $('#addMagazine fieldset input#inputMagazineRating').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newMgazine,
            url: '/users/addmagazine',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addMagazine fieldset input').val('');

                // Update the table
                populateTable2();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Magazine
function deleteMagazine(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this magazine?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deletemagazine/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable2();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

// Show Book Info
function showBookInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisBookName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = bookListData.map(function(arrayItem) { return arrayItem.title; }).indexOf(thisBookName);

    // Get our User Object
    var thisBookObject = bookListData[arrayPosition];

    //Populate Info Box
    $('#bookInfoTitle').text(thisBookObject.title);
    $('#bookInfoAuthor').text(thisBookObject.author);
    $('#bookInfoPublisher').text(thisBookObject.publisher);
    $('#bookInfoYear').text(thisBookObject.year);
    $('#bookInfoCirculation').text(thisBookObject.circulation);
    $('#bookInfoImageURL').text(thisBookObject.imageurl);
    $('#bookInfoDescription').text(thisBookObject.description);
    $('#bookInfoRating').text(thisBookObject.rating);

};

// Add Book
function addBook(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addBook input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newBook = {
            'title': $('#addBook fieldset input#inputBookTitle').val(),
            'author': $('#addBook fieldset input#inputBookAuthor').val(),
            'publisher': $('#addBook fieldset input#inputBookPublisher').val(),
            'year': $('#addBook fieldset input#inputBookYear').val(),
            'circulation': $('#addBook fieldset input#inputBookCirculation').val(),
            'imageurl': $('#addBook fieldset input#inputBookImageURL').val(),
            'description': $('#addBook fieldset input#inputBookDescription').val(),
            'rating': $('#addBook fieldset input#inputBookRating').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newBook,
            url: '/users/addbook',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addBook fieldset input').val('');

                // Update the table
                populateTable1();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteBook(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this book?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deletebook/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable2();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};