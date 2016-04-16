$(document).ready(function () {

    try {
        var timezoneOffset = 2;

        // Get waether information
        function getWeatherInfo() {
            $.simpleWeather({
                location: 'Ankara',
                woeid: '2347263',
                unit: 'c',
                success: function (weather) {
                    //console.log(JSON.stringify(weather));

                    var sunrise = new Date(),
                        sunset = new Date(),
                        noon;

                    sunrise.setUTCHours(Number(weather.sunrise.substring(0, weather.sunrise.search(' ')).split(':')[0]) - timezoneOffset);
                    sunrise.setUTCMinutes(Number(weather.sunrise.substring(0, weather.sunrise.search(' ')).split(':')[1]));

                    sunset.setUTCHours(Number(weather.sunset.substring(0, weather.sunset.search(' ')).split(':')[0]) - timezoneOffset + 12);
                    sunset.setUTCMinutes(Number(weather.sunset.substring(0, weather.sunset.search(' ')).split(':')[1]));

                    noon = new Date((sunrise.getTime() + sunset.getTime()) / 2);

                    setBackgroundAccordingToDayTime(new Date(), sunrise, noon, sunset);
                },
                error: function (error) {
                    //console.log(JSON.stringify(error));
                }
            });
        }

        // Set background to day time
        function setBackgroundAccordingToDayTime(current, sunrise, noon, sunset) {
            var background = $('#daytimeBackground'),
                stars = $('#stars')
                message = $('#homeTownMessages'),
                body = $('body'),
                offset = (sunset - sunrise) / 6;

            console.log('sunrise: ' + sunrise.toTimeString()
                + ', noon: ' + noon.toTimeString()
                + ', sunset: ' + sunset.toTimeString()
                + ', current: ' + current.toTimeString()
                + ', offset: ' + offset);

            stars.hide();

            if (current.getTime() < sunrise.getTime() - offset) {
                background.attr('class', 'presunrise');
                message.text('Currently midnight at my hometown. Mmm mm. Best part of my sleep! Come later.');
                body.removeClass('dark');
            } else if (current.getTime() > sunrise.getTime() - offset && current.getTime() < sunrise.getTime() + offset) {
                background.attr('class', 'sunrise');
                message.text('Currently sunrise at my hometown. "Forth, and fear no darkness! Arise! Arise, Riders of Theoden! Spears shall be shaken, shields shall be splintered! A sword day... a red day... ere the sun rises!"');
                body.addClass('dark');
            } else if (current.getTime() < noon.getTime() - 3 * offset) {
                background.attr('class', 'morning');
                message.text('Currently morning at my hometown. What about drinking tea?');
                body.addClass('dark');
            }  else if (current.getTime() < noon.getTime() - 2 * offset) {
                background.attr('class', 'prenoon');
                message.text('Currently morning at my hometown. Working time!');
                body.addClass('dark');
            } else if (current.getTime() > noon.getTime() - offset && current.getTime() < noon.getTime() + offset) {
                background.attr('class', 'noon');
                message.text('Currently noon at my hometown. Launch time, Yummy...');
                body.addClass('dark');
            } else if (current.getTime() < sunset.getTime() - 3 * offset) {
                background.attr('class', 'afternoon');
                message.text('Currently afternoon at my hometown. More work!!');
                body.addClass('dark');
            } else if (current.getTime() < sunset.getTime() - 2 * offset) {
                background.attr('class', 'presunset');
                message.text('Currently afternoon at my hometown.');
                body.addClass('dark');
            } else if (current.getTime() > sunset.getTime() - offset && current.getTime() < sunset.getTime() + offset) {
                background.attr('class', 'sunset');
                message.text('Currently sunset at my hometown.');
                body.removeClass('dark');
            } else if (current.getTime() > sunset.getTime() + offset && current.getTime() < sunset.getTime() + 2 * offset) {
                background.attr('class', 'aftersunset');
                message.text('Currently evening at my hometown.');
                body.removeClass('dark');
                stars.show();
            } else if (current.getTime() > sunset.getTime() + 2 * offset && current.getTime() < sunset.getTime() + 4 * offset) {
                background.attr('class', 'evening');
                message.text('Currently evening at my hometown. Resting on my couch, reading books...');
                body.removeClass('dark');
                stars.show();
            } else {
                background.attr('class', 'midnight');
                message.text('Currently midnight at my hometown. It\'s time to sleep.');
                body.removeClass('dark');
                stars.show();
            }

            // Show elements sequentially
            background.animate( { opacity: 1 }, 'fast', function() {
              $('#textHello').animate( { opacity: 1 }, function() {
                $('#textIntro').animate( { opacity: 1 }, function() {
                  $('#textBackground').animate( { opacity: 1 }, function() {
                    $('#projects').animate( { opacity: 1 }, function() {
                      $('#footer').animate( { opacity: 1 }, function() {

                      });
                    });
                  });
                });
              });
            });

            ga('send', 'event', 'background', 'class', background.attr('class'));
        }

        getWeatherInfo();
        setInterval(getWeatherInfo, 5 * 60 * 1000);
    } catch (e) {
        console.error(e);
    }

});
