$('document').ready(function () {
    const amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      $('.amenities H4').text(Object.values(amenities).join(', '));
    });

    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        cache: false,
        success: function () {
          $("#api_status").addClass("available")
        }
      });
});
