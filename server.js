const express = require('express');
const app = express();
const fetch = require("node-fetch");
var ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000
var labels = [];
var currentRates = [];
var date

// Fetching data from API
const url = 'https://www.quandl.com/api/v3/datasets/USTREASURY/YIELD.json?api_key=' + process.env.QUANDL_API_KEY

async function getTreasuryData() {
    const response = await fetch(url);
    const data = await response.json();
    
    const yieldrates = data.dataset.data[0]
    date = yieldrates[0]
    currentRates = yieldrates.splice(1)

    const columnNames = data.dataset.column_names
    labels = columnNames.splice(1)
}

getTreasuryData();

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {
        data: 'My Data',
        xlabels: labels,
        rates: currentRates,
        time: date
    });
})

app.listen(port, () => 
    {console.log(`Starting server at ${port}`)
});