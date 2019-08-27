const fetch = require("node-fetch");

const urlRoot = 'https://www.vesseltracker.com/en/search?term=';
const vslDB = [];
const imoMax = 9999999;
const imoMin = 9999900;

for(let imo = imoMax; imo >= imoMin; imo--) {
  
  const url = urlRoot + imo;

  setTimeout(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      data.forEach(vsl => {
        if(vsl.imo === imo)
          vslDB.push(vsl);
      });
     
      return vslDB;
    })
    .then(vslDB => {
      if (imo === imoMin)
        console.log(vslDB.length, vslDB);
    })
    .catch(error => {
      console.log(error);      
    });
  }, 500);  
}

