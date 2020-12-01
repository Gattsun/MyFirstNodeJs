const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (request, response)=> {
    //response.send("<h1>Hello World</h1>");
    response.sendFile(__dirname + '/index.html');
});

app.post('/', (request, response)=> {
    let userChoice = request.body.currency;
    console.log(userChoice);

    axios.get("https://api.coindesk.com/v1/bpi/currentprice/EUR.json")
    .then(res => {
        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log('EUR', eur);
        console.log('USD', usd);
        let message = '';

        if(userChoice === 'EUR'){
            message = 'EUR' + eur;
        } else {
            message = 'USD' + usd;
        }
        response.send(message);
    })
    .catch(error => {
        console.log(error);
    });

});

app.get('/about', (request, response)=> {
    response.send('Marten says Hello!');
});

app.get('/contact', (request, response)=> {
    response.send('+372 5551 1237');
});

app.listen(3000, ()=> {
    console.log('Server is running on Port 3000');
});