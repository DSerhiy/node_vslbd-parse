const fetch = require("node-fetch");
const fs = require("fs");

const abc = 'ABCDEFGHIKLMNOPQRSTVXYZ';
const vsldb = [];

fillDB(vsldb, 1, abc.indexOf('C'));

function fillDB(vsldb, page, lettreIndex) {
  let url = `https://www.vesseltracker.com/en/vessels.html?page=${page}&search=${abc[lettreIndex]}`;
  fetch(url)
    .then(res => res.text())
    .then(text => {

      if(text.includes('Page not found')) {
        throw `next letter: ${abc[lettreIndex + 1]}`;
      }

      const name = text.match(/class="name">\S*<\//g);
      const type = text.match(/class="type">\D*<\/span/g);
      const imo = text.match(/imo">\S*<\/s/g);
      const callSign = text.match(/callsign">\S*<\/s/g);
      const mmsi = text.match(/mmsi">\S*<\/s/g);
            
      for(let i = 0; i < name.length; i++) {  
        const vsl = {};   

        vsl.name = parseData1(name[i]);
        vsl.type = parseData1(type[i]);
        vsl.imo = parseData2(imo[i]);
        vsl.callsign = parseData2(callSign[i]);
        vsl.mmsi = parseData2(mmsi[i]);
        
        vsldb.push(vsl);

        if(vsldb.length % 100 === 0)
          console.log(vsldb.length);
      };    

      console.log(abc[lettreIndex], page)
      fillDB(vsldb, page + 1, lettreIndex);
    })
    .catch(err => {
      console.log(err);

      if(abc[lettreIndex] === 'C') {
        fs.writeFile("db_C.json", JSON.stringify(vsldb), err => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      } else {
        fillDB(vsldb, 1, lettreIndex + 1);
      }
        
    });

}

function parseData1(str) {
  const indexStart = str.search(/">/) + 2;
  const indexEnd = str.search(/<\//);
  return str.slice(indexStart, indexEnd);
};

function parseData2(str) {
  const indexStart = str.search(/n>/) + 2;
  const indexEnd = str.search(/<\//);
  return str.slice(indexStart, indexEnd);
}