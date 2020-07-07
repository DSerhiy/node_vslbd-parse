
const fs = require("fs");

const vessels = JSON.parse(fs.readFileSync('./unique_vessel_source.json'));
console.log(vessels.length);

// vessels.forEach((el, index) => {
//   if (el.fields.imo == '9590709')
//     vessels.splice(index, 1);
// });

// vessels.forEach((el, index) => {
//   if (el.fields.imo == '9391610') 
//     vessels.splice(index, 1);      
// });

// vessels.forEach((el, index) => {
//   if (el.fields.imo == '9544451') 
//     vessels.splice(index, 1);      
// });

vessels.forEach(vsl => {

  if(vsl.fields.sub_type && vsl.fields.sub_type.length > 30)
    console.log(vsl.fields.imo,'/ sub_type: ', vsl.fields.sub_type);

  if(vsl.fields.draft_summer && +vsl.fields.draft_summer.split('.')[0] > 99)
    console.log(vsl.fields.imo,'/ draft: ', vsl.fields.draft_summer);

  if(vsl.fields.tpc && +vsl.fields.tpc.split('.')[0] > 999)
    console.log(vsl.fields.imo,'/ tpc: ', vsl.fields.tpc);
  
  if(vsl.fields.loa && +vsl.fields.loa.split('.')[0] > 999)
    console.log(vsl.fields.imo,'/ loa: ', vsl.fields.loa);

  if(vsl.fields.beam && +vsl.fields.beam.split('.')[0] > 99)
    console.log(vsl.fields.imo,'/ beam: ', vsl.fields.beam);

   if(vsl.fields.lbp && +vsl.fields.lbp.split('.')[0] > 999)
    console.log(vsl.fields.imo,'/ lbp: ', vsl.fields.lbp);      
})

console.log(vessels.length);

// fs.writeFile('./unique_vessel_source.json', JSON.stringify(vessels), err => {
//   if (err) throw err;  
//   console.log('The file has been saved!');
// });