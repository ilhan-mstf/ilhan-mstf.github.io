#!/bin/bash

pushd css
cat bootstrap.min.css font.css style.css base64images.css > all.css
java -jar ../../yuicompressor/yuicompressor-2.4.7.jar all.css -o all.min.css
rm all.css
popd

pushd js
#cat googleAnalytics.js jquery-1.12.3.min.js tweenLite.min.js easePack.min.js raf.js networkGraphAnimation.js jquery.simpleWeather.min.js weather.js script.js > all.js
cat googleAnalytics.js jquery-1.12.3.min.js jquery.simpleWeather.min.js weather.js script.js > all.js
java -jar ../../yuicompressor/yuicompressor-2.4.7.jar all.js -o all.min.js
rm all.js
popd
