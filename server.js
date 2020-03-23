'use strict'

const ruuvi = require('node-ruuvitag');

ruuvi.on('found', tag => {
    console.log('Found RuuviTag ' + JSON.stringify(tag));
    tag.on('updated', tagdata => {
	console.log(tag.id + ' ' + JSON.stringify(tagdata));
    });
});
