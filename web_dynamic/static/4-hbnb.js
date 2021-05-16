$('document').ready(function () {
  const amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(`${Object.values(amenities).join(', ')}`);
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    cache: false,
    success: function () {
      $('#api_status').addClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: {},
    headers: { 'Content-Type': 'application/json' },
    success: (response) => {
      console.log(response);
      response.map(place => {
        return $('.places').append(`
                <article>
                    <div class="title-box">
                        <h2>${place.name}</h1>
                        <div class="price_by_night">
                           $ ${place.price_by_night}
                        </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                            ${place.max_guest} ${place.max_guest !== 1 ? 'Guests' : 'Guest'}
                        </div>
                        <div class="number_rooms">
                            ${place.number_rooms} ${place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom'}
                        </div>
                        <div class="number_bathrooms">
                            ${place.number_bathrooms} ${place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}
                        </div>
                    </div>
                    <div class="user">
                        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                    </div>
                    <div class="description">
                        ${place.description ? place.description : place.safe}}
                    </div>
                </article>
            `);
      });
    }
  });

  $('button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: amenities,
      headers: { 'Content-Type': 'application/json' },
      success: (response) => {
        console.log(response);
        response.map(place => {
          return $('.places').append(`
            <article>
                <div class="title-box">
                    <h2>${place.name}</h1>
                    <div class="price_by_night">
                       $ ${place.price_by_night}
                    </div>
                </div>
                <div class="information">
                    <div class="max_guest">
                        ${place.max_guest} ${place.max_guest !== 1 ? 'Guests' : 'Guest'}
                    </div>
                    <div class="number_rooms">
                        ${place.number_rooms} ${place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom'}
                    </div>
                    <div class="number_bathrooms">
                        ${place.number_bathrooms} ${place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}
                    </div>
                </div>
                <div class="user">
                    <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                </div>
                <div class="description">
                    ${place.description ? place.description : place.safe}}
                </div>
            </article>
        `);
        });
      }
    });
  });
});
