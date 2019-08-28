const fetch = require("node-fetch");
const express = require('express');

 const app = express();
 app.get('/', (req, res) => {

  const url = "https://www.marinetraffic.com/getData/get_data_json_4/z:2/X:0/Y:1/station:0";
  const getData = async url => {
    try {
      const response = await fetch(url);        
      const text = await response.text();
      
      await res.send(text); 

      const text = await response.text();
      const id_s = text.search(/>-?\d+\.\d+&deg/) + 1;
      const text_sub = text.slice(id_s, id_s + 30);

      const id_dev = text_sub.search(/ \/ /);
      const lat = text_sub.slice(0, id_dev - 5);
      const long_t = text_sub.slice(id_dev + 3);
      const long = long_t.slice(0, long_t.search(/&/));
      
      console.log(lat, long);
      await res.send({lat: lat, long: long});    
    
    } catch (error) {
      console.log(error);
    }
  };

  getData(url);
    
  });
  app.listen(3000, () => console.log('Listening on port 3000...'));
