"use strict";

var Events  = require('events');

module.exports = class Accessory extends Events {

    constructor(platform, config) {

        super();

        if (!config.name)
            throw new Error('An accessory must have a name.');

        this.log = platform.log;
        this.platform = platform;
        this.homebridge = platform.homebridge;
        this.Characteristic = platform.homebridge.hap.Characteristic;
        this.Service = platform.homebridge.hap.Service;
        this.name = config.name;
        this.config = config;
        this.services = [];
        this.serialNumber = 'FOO';
        this.model = 'BAR';
        this.manufacturer = 'OLLE';
        this.log('Adding acceory');

        this.setupAccessoryInformation();
    }

    setupAccessoryInformation() {
        this.log('Adding info');
        var service = new this.Service.AccessoryInformation();
        service.setCharacteristic(this.Characteristic.Manufacturer, this.manufacturer);
        service.setCharacteristic(this.Characteristic.Model, this.model);
        service.setCharacteristic(this.Characteristic.SerialNumber, this.serialNumber);

        this.services.push(service);
    }


    identify(callback) {
        this.log('Identify called for accessory', this.device.name);
        callback();
    }

    getServices() {
        return this.services;
    }

};
