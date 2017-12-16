"use strict";
var Accessory = require('./accessory.js');
var sprintf   = require('yow/sprintf');
var isString  = require('yow/is').isString;
var isNumber  = require('yow/is').isNumber;
var Timer     = require('yow/timer');
var Color     = require('color');

module.exports = class Switch extends Accessory {

    constructor(platform, config) {
        super(platform, config);


        this.addAccessoryInformation({
            manufacturer: 'meg',
            model:'model',
            serialNumber:'123'
        });


        this.state = false;
        this.hue   = 0;
        this.brightness = 0;
        this.saturation = 50;

        var service = new this.Service.Lightbulb(this.name);
        var power = service.getCharacteristic(this.Characteristic.On);
        var hue = service.addCharacteristic(this.Characteristic.Hue);
        var saturation = service.addCharacteristic(this.Characteristic.Saturation);
        var brightness = service.addCharacteristic(this.Characteristic.Brightness);

        power.updateValue(this.getState());
        hue.updateValue(this.getHue());
        brightness.updateValue(this.getBrightness());
        saturation.updateValue(this.getSaturation());

        power.on('get', (callback) => {
            callback(null, this.state);
        });

        power.on('set', (state, callback, context) => {
            this.state = state;
            this.refresh();
            callback();
        });


        hue.on('get', (callback) => {
            callback(null, this.hue);
        });

        hue.on('set', (hue, callback) => {
            this.hue = hue;
            this.refresh();
            callback();
        });

        brightness.on('get', (callback) => {
            callback(null, this.brightness);
        });

        brightness.on('set', (brightness, callback) => {
            this.brightness = brightness;
            this.refresh();
            callback();
        });

        saturation.on('get', (callback) => {
            callback(null, this.saturation);
        });

        saturation.on('set', (saturation, callback) => {
            this.saturation = saturation;
            this.refresh();
            callback();
        });


        this.services.push(service);
    }



    refresh() {
        this.log('Refreshing lamp', this.name);

        if (this.state)
            this.platform.strip.fill(Color.hsl(this.hue, this.saturation, this.brightness).rgbNumber());
        else
            this.platform.strip.fill(0);

        this.platform.strip.render();

    }


};
