#!/bin/bash

pushd css
cat bootstrap.min.css font.css style.css > all.css
java -jar ../../yuicompressor/yuicompressor-2.4.8.jar all.css -o all.min.css
rm all.css
popd

pushd js
cat googleAnalytics.js jquery-1.11.3.min.js tweenLite.min.js easePack.min.js raf.js networkGraphAnimation.js jquery.simpleWeather-3.0.2.min.js weather.js script.js > all.js
java -jar ../../yuicompressor/yuicompressor-2.4.8.jar all.js -o all.min.js
rm all.js
popd