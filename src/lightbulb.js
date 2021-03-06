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
            manufacturer: 'meg768',
            model:'Neopixel RGB Globe',
            serialNumber:'1'
        });


        this.power      = false;
        this.hue        = 0;
        this.brightness = 0;
        this.saturation = 50;
        this.timer      = new Timer();

        var service = new this.Service.Lightbulb(this.name, 'KALLE-ANKA');
        var power = service.getCharacteristic(this.Characteristic.On);
        var hue = service.addCharacteristic(this.Characteristic.Hue);
        var saturation = service.addCharacteristic(this.Characteristic.Saturation);
        var brightness = service.addCharacteristic(this.Characteristic.Brightness);

        power.updateValue(this.power);
        hue.updateValue(this.hue);
        brightness.updateValue(this.brightness);
        saturation.updateValue(this.saturation);

        power.on('get', (callback) => {
            callback(null, this.power);
        });

        power.on('set', (power, callback, context) => {
            this.power = power;
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


        if (this.power) {
            var now = new Date();
            var hue = Math.floor(360 * (((now.getHours() % 12) * 60) + now.getMinutes()) / (12 * 60));

            this.log('Hue', this.hue, 'Saturation:', this.saturation, 'Brightness:', this.brightness);
            //this.platform.strip.fill(Color.hsl(this.hue, this.saturation, this.brightness).rgbNumber());
            this.platform.strip.fill(Color.hsl(hue, 100, 50).rgbNumber());

        }
        else {
            this.log('Power', this.power);
            this.platform.strip.fill(0);
        }

        this.platform.strip.render();

    }


};
