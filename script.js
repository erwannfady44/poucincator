const usbSerial = 'COM4';
const SerialPort = require('serialport').SerialPort;
const axios = require('axios');
const URL = 'http://localhost:3000';
// let mega = new SerialPort('COM4', {
//     baudRate: 9600
// });


function writeData(data) {
    let influx = 'vote value='+data+' '+Date.now()+"\n";
    axios.post(URL, {
        headers: {
            'Content-Type':  'text/plain'
        },
        influx
    })
}