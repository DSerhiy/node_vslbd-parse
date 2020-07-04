
const fs = require("fs");

const vesselSource = [];
const vessels = JSON.parse(fs.readFileSync('./vsl-descr/parsed/allFleet.json'));

vessels.forEach(vsl => {
  vesselSource.push(Vessel(vsl));
})

fs.writeFile('./vessel_source.json', JSON.stringify(vesselSource), err => {
  if (err) throw err;  
  console.log('The file has been saved!');
});


function convertToNumber(str){
  if (typeof str === 'number') return str;
  return Number(str.replace(',', ''));
}

function Vessel (data){
  return {
    model: 'sources.vesselsource',
    fields: {
      name: data.name,
      build_year: data.build,
      type: data.type,
      imo: data.imo,
      dwt: convertToNumber(data.dwt),
      sub_type: data.subType,
      gears: data.gears,
      call_sign: data.callsign,
      mmsi: data.mmsi,
      flag: data.flag,
      vessel_class: data.vslClass,
      draft_summer: data.draft,
      tpc: data.tpc,
      loa: data.loa,
      beam: data.beam,
      lbp: data.lbp,
      grt: convertToNumber(data.grt),
      nrt: convertToNumber(data.nrt),
      shipowner: data.shipowner,
      full_description: data.fullDescription 
    }
  }
};