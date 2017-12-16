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
        this.log('Adding acceory');

    }

    addAccessoryInformation(options) {
        this.log('Adding info');
        var service = new this.Service.AccessoryInformation();

        if (options.manufacturer)
            service.setCharacteristic(this.Characteristic.Manufacturer, options.manufacturer);

        if (options.model)
            service.setCharacteristic(this.Characteristic.Model, options.model);

        if (options.serialNumber)
            service.setCharacteristic(this.Characteristic.SerialNumber, options.serialNumber);

        this.services.push(service);
    }


    identify(callback) {
        this.log('Identify called for accessory', this.name);
        callback();
    }

    getServices() {
        return this.services;
    }

};
