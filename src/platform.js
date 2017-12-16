"use strict";

var Events           = require('events');
var Pushover         = require('pushover-notifications');
var Path             = require('path');
var isObject         = require('yow/is').isObject;
var isString         = require('yow/is').isString;
var isFunction       = require('yow/is').isFunction;
var Strip            = require('rpi-neopixels').Strip;
var AnimationQueue   = require('rpi-neopixels').AnimationQueue;
var Monitor          = require('rpi-obex-monitor');
var Wifi             = require('rpi-wifi-connection');
var sprintf          = require('yow/sprintf');
var isString         = require('yow/is').isString;

var Switch           = require('./switch.js');

module.exports = class TelldusPlatform  {

    constructor(log, config, homebridge) {

        this.config         = config;
        this.log            = log;
        this.homebridge     = homebridge;
        this.strip          = new Strip({length:16, debug:this.log});
        this.animationQueue = new AnimationQueue({debug:this.log});

        // Load .env
        require('dotenv').config({path: Path.join(process.env.HOME, '.homebridge/.env')});

        if (process.env.PUSHOVER_USER && process.env.PUSHOVER_TOKEN) {
            this.log('Using Pushover credentials from .env');

            config.pushover = {
                user: process.env.PUSHOVER_USER,
                token: process.env.PUSHOVER_TOKEN
            };
        }



    }


    pushover(message) {
        try {
            if (isString(message) && message.length > 0 && this.config.pushover) {
                if (!this.config.pushover.user)
                    throw new Error('You must configure Pushover user.');

                if (!this.config.pushover.token)
                    throw new Error('You must configure Pushover token.');

                var push = new Pushover(this.config.pushover);

                this.log('Sending message:', message);

                push.send({priority:0, message:message}, (error, result) => {
                    if (this.error)
                        this.log(error);
                });

            }
        }
        catch (error) {
            this.log(error);
        }
    }

    accessories(callback) {
        var accessories = [];

        this.log('accessories called!');
        accessories.push(new Switch(this, {name:'KALLE'}));

        callback(accessories);
    }
}
