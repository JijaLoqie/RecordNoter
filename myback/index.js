var express = require('express');
var axios = require('axios')
var app = express();
const port = 5000;

const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: 'Moscow'},
  headers: {
    'X-RapidAPI-Key': '82792bc789msh885dbbf5186af02p16cc5cjsn43847e93d3d4',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

app.get('/', function(req, res) {
  res.send("JijaLoqie begins to get cool!");
});
app.get('/getSomeWeather', async function(req, res) {
  try {
    const response = await axios.request(options);
    var temperature = response.data.current.temp_c;

    console.log("Passing temperature of Moscow:", temperature);
    res.send({temperature});

  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
