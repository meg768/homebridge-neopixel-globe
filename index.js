"use strict";

module.exports = function(homebridge) {
    homebridge.registerPlatform('homebridge-neopixel-globe', 'Neopixel Globe', require('./src/platform.js'));
};
