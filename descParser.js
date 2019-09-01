const fs = require("fs");

const vsls = JSON.parse(fs.readFileSync('./vsl-descr/fleet_B.json'));

let updatedVsls = vsls.map((vsl, index) => {

  console.log(index, vsl.imo);
  
  const descText = vsl.description;
  const nameMatch = descText.match(/<B>MV<\/B>\s"([\d\w\s\-\.]*)"/);
  
  if(nameMatch[1] === '')
    return {imo: 'delete'}
  
  const name = nameMatch[1].trim();
  const type = descText.match(/<B>Type :<\/B>([\w\s]*)</)[1].trim();
  const subType = descText.match(/<B>Sub type :<\/B>([\w\s\-\/]*)</)[1].trim();
  const flag = descText.match(/<B>Flag :<\/B>([\w\s\(\)&]*)</)[1].trim();

  // const gears = descText.match(/<B>Gears :<\/B>([\s\w\d\.]*)<B>/)[1].trim();

  const vslClassMatch = descText.match(/<B>Class :<\/B>([\w\s]*)</);
  let vslClass = 0;
  if(vslClassMatch) 
    vslClass = vslClassMatch[1].trim();  
  
  const dwt = descText.match(/<B>DWT\/Draft:<\/B>([\d\,\s]*)M/)[1].trim();
  const draft = descText.match(/<B>DWT\/Draft:<\/B>[\d\,\s]*MT DWT \/([\d\.\s]*) m/)[1].trim();

  const tpcMatch = descText.match(/TPC \/ TPI :([\d\.\s]*)MT/);
  let tpc = 0;
  if(tpcMatch) 
    tpc = tpcMatch[1].trim();   

  const loaMatch = descText.match(/([\d\.]*) m \(loa\)/);
  let loa = 0;
  if(loaMatch) 
    loa = loaMatch[1].trim();

  const beamMatch = descText.match(/([\d\.]*) m \(beam\)/);  
  let beam = 0;
  if(beamMatch) 
    beam = beamMatch[1].trim();

  const lbpMatch = descText.match(/LBP :\s*([\d\.]*) m/);
  let lbp = 0;
  if(lbpMatch) 
    lbp = lbpMatch[1].trim();     

  const grt = descText.match(/Int'l tonnage : ([\d\,]*) GT/)[1].trim();  

  const nrtMatch = descText.match(/Int'l tonnage : [\d\,]* GT \/ ([\d\,]*) NT/);
  let nrt = 0;
  if(nrtMatch) 
    nrt = nrtMatch[1].trim();   

  const shipownerMatch = descText.match(/Shipowner :([\w\s&\-]*)\s\-{2}/);
  let shipowner = 0;
  if(shipownerMatch) 
    shipowner = shipownerMatch[1].trim();   

  console.log(index, name);
    
  return {
    name,
    type,
    subType, 
    // gears,
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
});

updatedVsls = updatedVsls.filter(vsl => vsl.imo !== 'delete');
console.log(updatedVsls.length);

fs.writeFile("./vsl-descr/parsed/fleet_B.json", JSON.stringify(updatedVsls), err => {
  if (err) throw err;
  
  console.log('The file has been saved!');
});
