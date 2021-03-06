var Gpio = require('onoff').Gpio,
    pins = require('./gpio-pins.js').gpioPins;

var leds = [pins.red, pins.yellow, pins.green, pins.redMan, pins.greenMan];

var switchOn = function(led){
    led.writeSync(1);
};
var switchOff = function(led){
    led.writeSync(0);
};

(function(){
    var arr = [];
    for (var pinName in pins){
        var pin = pins[pinName];
        arr.push("- '" + pinName + "' on GPIO #" + pin.gpio + " (" + pin.direction() + ")");
    }
    console.log("Uses the following pins:"); 
    console.log(arr.join("\n")); 
    console.log("\n"); 
}());

console.log('Turning off all LEDs');
leds.forEach(switchOff);

console.log('Turning on traffic green & pedestrian red');
switchOn(pins.green);
switchOn(pins.redMan);

// Start reading from stdin so we don't exit.
process.stdin.resume();
process.on('SIGINT', function () {
    console.log('\nTurning off all LEDs');
    leds.forEach(switchOff);
    process.exit(0);
});

(function mainLoop(){
    waitButton(function(){
        stopTraffic(function(){
            walk(function(){
                graceTime(function(){
                    startTraffic(function(){
                        mainLoop();
                    });
                });
            });
        });
    });
}());

function waitButton(callback){
    console.log('Please press the button on GPIO #2 to walk or press CTRL-C to exit.');
    pins.button.watch(function (err, value) {
        if (err) throw err;
        console.log('Button pressed!, its value was ' + value);
        callback();
    });
}

function stopTraffic(callback){
    console.log('Stopping traffic...');
    
    switchOff(pins.green);
    switchOn(pins.yellow);
    
    setTimeout(function(){
        switchOff(pins.yellow);
        switchOn(pins.red);
    
        setTimeout(function(){
            console.log('Stopped');
            callback();
        }, 2000);
    }, 2000);
}

function walk(callback){
    console.log('Walk now...');
    
    switchOff(pins.redMan);
    switchOn(pins.greenMan);
    
    setTimeout(function(){
        switchOff(pins.red);
        switchOn(pins.yellow);
    
        console.log('Stop walking');
        callback();
    }, 5000);
}

function graceTime(callback){
    console.log('Grace time...');
    
    var count = 0;
    var interval = setInterval(function(){
        if (++count % 2 === 0){
            switchOn(pins.greenMan);
            switchOn(pins.yellow);
        } else {
            switchOff(pins.greenMan);
            switchOff(pins.yellow);
        }
        if (count >= 8){
            console.log('Time up!');
            clearInterval(interval);
            callback();
        }
    }, 500);
}

function startTraffic(callback){
    console.log('Starting traffic...');
    
    switchOff(pins.greenMan);
    switchOn(pins.redMan);
    
    setTimeout(function(){
        switchOff(pins.yellow);
        switchOn(pins.green);
        
        console.log('Started');
        callback();
    }, 500);
}

