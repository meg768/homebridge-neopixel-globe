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
        this.setupSwitch(this.Service.Switch);
    }


    setupSwitch(Service) {

        var service = new Service(this.name);
        var characteristics = service.getCharacteristic(this.Characteristic.On);

        characteristics.updateValue(this.getState());

        characteristics.on('get', (callback) => {
            callback(null, this.getState());
        });

        characteristics.on('set', (state, callback, context) => {
            this.setState(state);
            callback();
        });



        this.services.push(service);
    }


    getState() {
        return this.state;
    }

    setState(state) {

        if (state)
            this.turnOn();
        else
            this.turnOff();


    }

    turnOn() {
        this.log('Turning on', this.name);
        this.platform.strip.fill(Color('green').rgbNumber());
        this.platform.strip.render();

        this.state = true;

    }

    turnOff() {
        this.log('Turning off', this.name);
        this.platform.strip.clear();
        this.platform.strip.render();
        this.state = false;
    }

};
