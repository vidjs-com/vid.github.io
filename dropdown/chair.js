
//const MODEL_PATH = "chair.glb";

var activeOption = 'legs';

const colorlist = [
{
  name: 'Grau',
  color: 0x5b5a5f
},
{
  name: 'Gray',
  color: 0x5b5a5f
},
{
  name: 'Opal',
  color: 0xffffff
},
{
  name: 'Blau',
  color: 0x444aa0
},
{
  name: 'Blue',
  color: 0x444aa0
},
{
  name: 'Grün',
  color: 0x589943
},
{
  name: 'Green',
  color: 0x589943
},
{
  name: 'Red',
  color: 0xbc2e34
},
{
  name: 'Orange',
  color: 0xd46c17
}];

//var obennodes = document.querySelectorAll("input[data-field-id='622deaee195b8']");
var obennodes  = document.querySelectorAll('[name="wapf[field_622deaee195b8]"]');
var obens = Array.prototype.slice.call(obennodes, 0);
//console.log('obennodes', obennodes);
//console.log('obens', obens);

for (oben in obens) {
  // console.log('oben', obens[oben]);
  obens[oben].addEventListener("click", function() {
    // console.log('click', this.value, this);
    activeOption = 'legs';
    let color;
    for (let [i, item] of colorlist.entries()) {
      //console.log('i, color', i, item, this.dataset, this.dataset.wapfLabel);
      if (this.dataset.wapfLabel == item.name) {
        color = item.color;
      }
    }
    selectSwatch(color, activeOption);
  });
}

//var rearnodes = document.querySelectorAll("input[data-field-id='622deaee195c0']");
var rearnodes  = document.querySelectorAll('[name="wapf[field_622deaee195c0]"]');
var rears = Array.prototype.slice.call(rearnodes, 0);
// console.log('rearnodes', rearnodes);
// console.log('rears', rears);

for (rear in rears) {
  // console.log('rear', rears[rear]);
  rears[rear].addEventListener("click", function() {
    // console.log('click', this.value, this);
    activeOption = 'cushions';
    let color;
    for (let [i, item] of colorlist.entries()) {
      // console.log('i, color', i, color);
      if (this.dataset.wapfLabel == item.name) {
        color = item.color;
      }
    }
    selectSwatch(color, activeOption);
  });
}