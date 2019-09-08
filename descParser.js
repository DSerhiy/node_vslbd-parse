const fs = require("fs");

const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let allFleet = [];

for(let i = 0; i < abc.length; i++) {

  let vsls = JSON.parse(fs.readFileSync(`./vsl-descr/fleet_${abc[i]}.json`));

  vsls = vsls.filter(vsl => {
    const name = parseText(vsl.description, /<B>MV<\/B>\s"([\d\w\s\-\.']*)"/);
    if(name !== '')
      return true
  });

  allFleet = allFleet.concat(vsls.map((vsl, index) => {

    console.log(index, vsl.imo);
    
    const descText = vsl.description;    
    const name = parseText(descText, /<B>MV<\/B>\s"([\d\w\s\-\.']*)"/);
    const type = parseText(descText, /<B>Type :<\/B>([\w\s]*)</);  
    const subType = parseText(descText, /<B>Sub type :<\/B>([\w\s\-\/]*)</); 
    const build = parseText(descText, /<B>Built :<\/B>\s*(\d*)/);
    const flag = parseText(descText, /<B>Flag :<\/B>([\w\s\(\)&]*)</);
    const vslClass = parseText(descText, /<B>Class :<\/B>([\w\s]*)</);
    const dwt = parseText(descText, /<B>DWT\/Draft:<\/B>([\d\,\s]*)M/);
    const draft = parseText(descText, /<B>DWT\/Draft:<\/B>[\d\,\s]*MT DWT \/([\d\.\s]*) m/);
    const tpc = parseText(descText, /TPC \/ TPI :([\d\.\s]*)MT/);
    const loa = parseText(descText, /([\d\.]*) m \(loa\)/);
    const beam = parseText(descText, /([\d\.]*) m \(beam\)/);  
    const lbp = parseText(descText, /LBP :\s*([\d\.]*) m/);
    const grt = parseText(descText, /Int'l tonnage : ([\d\,]*) GT/);  
    const nrt = parseText(descText, /Int'l tonnage : [\d\,]* GT \/ ([\d\,]*) NT/);
    const shipowner = parseText(descText, /Shipowner :([\w\s&\-]*)\s\-{2}/);
    const gears = descText.includes('Gearless')? 'Gearless': 'Geared';

    console.log(index, name);
      
    return {
      name,
      build,
      type,
      subType, 
      gears,
      imo: vsl.imo,
      callsign: vsl.callsign,
      mmsi: vsl.mmsi,
      flag, 
      vslClass, 
      dwt, 
      draft, 
      tpc, 
      loa, 
      beam, 
      lbp, 
      grt,
      nrt, 
      shipowner, 
      fullDescription: vsl.description
    }
  }));

  console.log(allFleet.length);
}

fs.writeFile("./vsl-descr/parsed/allFleet.json", JSON.stringify(allFleet), err => {
  if (err) throw err;
  
  console.log('The file has been saved!');
});

function parseText(text, regexp) {
  const match = text.match(regexp);
  if(match) 
    return match[1].trim();
    
  return 0;
}