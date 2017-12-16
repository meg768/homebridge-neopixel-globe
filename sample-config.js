{
    "bridge": {
        "name": "Neopixel Globe",
        "username": "CC:22:3D:E3:CE:97",
        "port": 51826,
        "pin": "031-45-754"
    },

    "description": "This is an example configuration file",

    "platforms": [
        {
            "platform": "Neopixel Globe",
            "name": "Neopixel Globe",

            "pushover": {
                "user": "my-pushover-user",
                "token": "my-pushover-token"
            },


            "devices": {
                "VS-01": {
                    "type"    : "Lightbulb",
                    "name"    : "Terassen",
                    "on"      : "Terassen tänd."
                },

                "VS-02": {
                    "type"    : "Lightbulb",
                    "name"    : "Saftblandare",
                    "timer"   : 120
                }
            }

        }
    ]


}
