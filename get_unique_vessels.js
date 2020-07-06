
const fs = require("fs");

const vesselSource = [];
const vessels = JSON.parse(fs.readFileSync('./vessel_source.json'));

const uniqueImoList = []

vessels.forEach(vsl => {
  if (!uniqueImoList.includes(vsl.fields.imo)) {
    uniqueImoList.push(vsl.fields.imo);
    vesselSource.push(vsl);
  }    
})

fs.writeFile('./unique_vessel_source.json', JSON.stringify(vesselSource), err => {
  if (err) throw err;  
  console.log('The file has been saved!');
});