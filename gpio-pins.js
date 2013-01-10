var Gpio = require('onoff').Gpio,
    button = new Gpio(2, 'in', 'both'),
    red = new Gpio(17, 'out'),
    yellow = new Gpio(18, 'out'),
    green = new Gpio(27, 'out'),
    redMan = new Gpio(22, 'out'),
    greenMan = new Gpio(23, 'out');

exports.gpioPins = {
    button: button,
    red: red,
    yellow: yellow,
    green: green,
    redMan: redMan,
    greenMan: greenMan
}
