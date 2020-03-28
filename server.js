'use strict'

const ruuvi = require('node-ruuvitag');
const config = require('./config');
const request = require('request');

ruuvi.on('found', tag => {
    console.log('Found RuuviTag ' + JSON.stringify(tag));
    tag.on('updated', tagdata => {
	console.log(tag.id + ' ' + JSON.stringify(tagdata));
	let data = `Ruuvi ${tag.id}.temperature=${tagdata.temperature},${tag.id}.pressure=${tagdata.pressure/100.0},${tag.id}.humidity=${tagdata.humidity}`;

	request.post({
       	    url: config.endpoint,
            qs: {
            	db: config.db,
            	precision: 'ms'
            },
            auth: { 'username': config.username, 'password': config.password },
            body: data
        }, (error, response, body) => {
            if (!error && response.statusCode == 204) {
                console.log('Sent ' + data);
            } else {
                console.log('Error: ' + JSON.stringify(body) + ' data was ' + data);
            }
        });
    });
});
