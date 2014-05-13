// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function() {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var adapter = new JSONPAdapterFHNW();
    adapter.initialize().done(function() {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function() {
        FastClick.attach(document.body);
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        adapter.findByName($('.search-key').val()).done(function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }

    function renderHomeView() {
        var html =
                "<h1>Directory</h1>" +
                "<input class='search-key' type='search' placeholder='Enter name'/>" +
                "<ul class='employee-list'></ul>";
        $('body').html(html);
        $('.search-key').on('keyup', findByName);
    }

}());