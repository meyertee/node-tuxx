node-tuxx
=========

Node.js port of Gordon Henderson's (Drogon) [Tux Crossing tutorial](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/) for the Raspberry Pi.

It uses [onoff](https://github.com/fivdi/onoff) to write & read to/from the GPIO pins.

To run it you need to export the pins as superuser:

	sudo node export-gpio.js
	
Then start with:

	node node-tuxx.js
	
The program uses the Rev. 2 GPIO numbering scheme of the RPi, so make sure the numbers are correct by editing `gpio-pins.js`.

Once you're done and you wish to unexport the gpio pins in use (see [onoff](https://github.com/fivdi/onoff) for details):

	sudo node unexport-gpio.js

Many thanks to [Drogon](https://projects.drogon.net) for the excellent tutorial & to [fivdi](https://github.com/fivdi) for onoff.