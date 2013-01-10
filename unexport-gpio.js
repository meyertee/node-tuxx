var Gpio = require('onoff').Gpio,
    pins = require('./gpio-pins.js').gpioPins;

for (var prop in pins) {
    if(pins.hasOwnProperty(prop) ) {
        var pin = pins[prop];
        pin.unexport();
        console.log("Unexported GPIO", pin.gpio, "("+prop+")");
    } 
}
