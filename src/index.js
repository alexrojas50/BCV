import express from "express"
import { Client } from "whatsapp-web.js"
import qrcode from 'qrcode-terminal';


const app = express()
const port = 8080

app.listen(port, (e) => {
    if (e) {
        console.log("ERROR IN SERVER SETUP")
    } else {
        console.log("SERVER LISTENING ON PORT ", port)
    }
})

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body === 'BCV') {
        var resFetch = await fetch('https://s3.amazonaws.com/dolartoday/data.json')
        const jsonData = await resFetch.json();
        console.log("MMMMMMMMMMM", jsonData.USD.promedio_real)
        const test = "TEST"
        message.reply(String(jsonData.USD.promedio_real));
    }
});

client.initialize();

module.exports = app


// var resFetch = await fetch('https://s3.amazonaws.com/dolartoday/data.json')
// const jsonData = await resFetch.json();
// console.log(jsonData.USD.promedio_real);
