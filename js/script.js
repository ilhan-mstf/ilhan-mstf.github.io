// Google Analytics events
$('a').on('click', function () {
    ga('send', 'event', 'link', 'click', $(this).attr('href'));
});