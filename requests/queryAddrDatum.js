const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

async function queryAddrDatum(url) {
  const res = await fetch(url);
  return res.json();
}

module.exports = queryAddrDatum;

// const queryAddrDatum = (url) => {
//   const addrDatumUTxO = [];

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       for (let i = 0; i < data.length; i++) {
//         addrDatumUTxO.push(data[i].hash.substring(2) + "#" + data[i].index);
//       }
//       console.log(addrDatumUTxO[0]);
//       return addrDatumUTxO[0];
//     });
// };

// async function queryAddrDatum(url) {
//   const addrDatumUTxO = [];

//   const res = await fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       const utxo = data;
//       this.utxo = utxo;
//       console.log(utxo)
//     });
// };
