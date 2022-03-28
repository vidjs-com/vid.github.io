
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

var obennodes  = document.querySelectorAll('[name="wapf[field_622deaee195b8]"]');
var obens = Array.prototype.slice.call(obennodes, 0);

for (oben in obens) {
  obens[oben].addEventListener("click", function() {
    activeOption = 'legs';
    let color;
    for (let [i, item] of colorlist.entries()) {
      if (this.dataset.wapfLabel == item.name) {
        color = item.color;
      }
    }
    selectSwatch(color, activeOption);
  });
}

var rearnodes  = document.querySelectorAll('[name="wapf[field_622deaee195c0]"]');
var rears = Array.prototype.slice.call(rearnodes, 0);

for (rear in rears) {
  rears[rear].addEventListener("click", function() {
    activeOption = 'cushions';
    let color;
    for (let [i, item] of colorlist.entries()) {
      if (this.dataset.wapfLabel == item.name) {
        color = item.color;
      }
    }
    selectSwatch(color, activeOption);
  });
}