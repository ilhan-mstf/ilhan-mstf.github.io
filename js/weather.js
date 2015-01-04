$(document).ready(function () {
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

                sunrise.setUTCHours(Number(weather.sunrise.substring(0, weather.sunrise.search(" ")).split(":")[0]) - timezoneOffset);
                sunrise.setUTCMinutes(Number(weather.sunrise.substring(0, weather.sunrise.search(" ")).split(":")[1]));

                sunset.setUTCHours(Number(weather.sunset.substring(0, weather.sunset.search(" ")).split(":")[0]) - timezoneOffset + 12);
                sunset.setUTCMinutes(Number(weather.sunset.substring(0, weather.sunset.search(" ")).split(":")[1]));

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
        var background = $("#daytime-background"),
            message = $("#homeTownMessages"),
            offset = 60 * 60 * 1000;
        if (current.getTime() < sunrise.getTime() - offset) {
            background.attr('class', 'midnight');
            message.text('By the way currently mid-night at my hometown.');
        } else if (current.getTime() > sunrise.getTime() - offset && current.getTime() < sunrise.getTime() + offset) {
            background.attr('class', 'sunrise');
            message.text('By the way currently sunrise at my hometown.');
        } else if (current.getTime() < noon.getTime() - offset) {
            background.attr('class', 'morning');
            message.text('By the way currently morning at my hometown.');
        } else if (current.getTime() > noon.getTime() - offset && current.getTime() < noon.getTime() + offset) {
            background.attr('class', 'noon');
            message.text('By the way currently noon at my hometown.');
        } else if (current.getTime() < sunset.getTime() - offset) {
            background.attr('class', 'afternoon');
            message.text('By the way currently afternoon at my hometown.');
        } else if (current.getTime() > sunset.getTime() - offset && current.getTime() < sunset.getTime() + offset) {
            background.attr('class', 'sunset');
            message.text('By the way currently sunset at my hometown.');
        } else if (current.getTime() > sunset.getTime() + offset && current.getTime() < sunset.getTime() + 4 * offset) {
            background.attr('class', 'evening');
            message.text('By the way currently evening at my hometown.');
        } else {
            background.attr('class', 'midnight');
            message.text('By the way currently midnight at my hometown.');
        }

        background.animate({
            opacity: 1
        }, 5000);
        message.css({
            visibility: 'visible'
        });
        ga('send', 'event', 'background', 'class', background.attr('class'));
    }

    getWeatherInfo();
    setInterval(getWeatherInfo, 5 * 60 * 1000);

});