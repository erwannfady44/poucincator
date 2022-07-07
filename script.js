const usbSerial = '/dev/ttyACM0';
import { SerialPort } from 'serialport';
import fetch from "node-fetch";
const URL = 'http://localhost:8086/';
const DATABASE = 'test';

let mega = new SerialPort({
    baudRate: 9600,
    path: usbSerial
});

mega.on("data", (data) => {
    writeData(parseInt(data));
})


async function writeData(data) {
    return new Promise((resolve, reject) => {
        let influx = 'vote value=' + data + ' ' + new Date().valueOf() + '000000' + '\n';
        fetch(URL + 'write?db=' + DATABASE, {
            method: 'POST',
            headers: {
                contentType: 'text/plain'
            },
            body: influx
        }).then(r => resolve(r)).catch(e => reject(e.message))
    })
}