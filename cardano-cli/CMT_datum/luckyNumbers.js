const fs = require("fs");

const map = new Map();

map.set("key1", 1);
map.set("key2", 2);
map.set("key3", 7);
map.set("key4", 9);
map.set("key5", 28);

const datum = {
    "constructor": 0,
    "fields": [
      {"bytes":"416363657074"},
      {"int":map.get("key1")},
      {"int":map.get("key2")},
      {"int":map.get("key3")},
      {"int":map.get("key4")},
      {"int":map.get("key5")},
    ],
  };

jsonDatum = JSON.stringify(datum);

fs.writeFile("./data/datum.json", jsonDatum, "utf8", function (err) {
if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
}
console.log("A json file has been saved");
});