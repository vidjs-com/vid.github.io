
//const MODEL_PATH = "chair.glb";

var activeOption = 'legs';

const colors = [
{
  texture: 'img/wood_.jpg',
  name: 'wood',
  size: [2, 2, 2],
  shininess: 60 },

{
  texture: 'img/fabric_.jpg',
  name: 'fabric',
  size: [4, 4, 4],
  shininess: 0 },

{
  texture: 'img/pattern_.jpg',
  name: 'pattern',
  size: [8, 8, 8],
  shininess: 10 },

{
  texture: 'img/denim_.jpg',
  name: 'denim',
  size: [3, 3, 3],
  shininess: 0 },

{
  texture: 'img/quilt_.jpg',
  name: 'quilt',
  size: [6, 6, 6],
  shininess: 0 },

{
  color: 'ffffff',
  name: 'white' },

{
  color: '374047',
  name: 'arsenic' },

{
  color: '131417' },

{
  color: '5f6e78' },

{
  color: '7f8a93' },

{
  color: '97a1a7' },

{
  color: 'acb4b9' },

{
  color: 'DF9998' },

{
  color: '7C6862' },

{
  color: 'A3AB84' },

{
  color: 'D6CCB1' },

{
  color: 'F8D5C4' },

{
  color: 'A3AE99' },

{
  color: 'EFF2F2' },

{
  color: 'B0C5C1' },

{
  color: '8B8C8C' },

{
  color: '565F59' },

{
  color: 'CB304A' },

{
  color: 'FED7C8' },

{
  color: 'C7BDBD' },

{
  color: '3DCBBE' },

{
  color: '264B4F' },

{
  color: '389389' },

{
  color: '85BEAE' },

{
  color: 'F2DABA' },

{
  color: 'F2A97F' },

{
  color: 'D85F52' },

{
  color: 'D92E37' },

{
  color: 'FC9736' },

{
  color: 'F7BD69' },

{
  color: 'A4D09C' },

{
  color: '4C8A67' },

{
  color: '25608A' },

{
  color: '75C8C6' },

{
  color: 'F5E4B7' },

{
  color: 'E69041' },

{
  color: 'E56013' },

{
  color: '11101D' },

{
  color: '630609' },

{
  color: 'C9240E' },

{
  color: 'EC4B17' },

{
  color: '281A1C' },

{
  color: '4F556F' },

{
  color: '64739B' },

{
  color: 'CDBAC7' },

{
  color: '946F43' },

{
  color: '66533C' },

{
  color: '173A2F' },

{
  color: '153944' },

{
  color: '27548D' },

{
  color: '438AAC' }
];

const parts = JSON.parse(document.getElementsByClassName('iconic-was-fees')[0].textContent);		//innerHTML


// Function - Build Colors

function buildColors(tray) {
  const optionColors = tray.querySelectorAll("option");
  for(var i = 0; i < optionColors.length; i++) {
    let option = optionColors[i];
    let attribute = option.getAttribute('data-attribute');
    let value = option.getAttribute('data-attribute-value');
    if(value==null)continue;
    for (let [j, color] of colors.entries()) {
      if (color.name == value) {
        // console.log('i j', i, j, value, color, color.texture);
        if (color.texture) {
          option.setAttribute('data-style', "background-image: url(" + color.texture + ")");
          option.value = color.texture;
        } else {
          option.setAttribute('data-style', "background-color: #" + color.color + ";background-image:none");
          option.value = "#" + color.color;
        }
        option.setAttribute('data-class', "texture");
        option.setAttribute('data-key', j);
      }
    }
  }
}


$.widget( "custom.iconselectmenu", $.ui.selectmenu, {
  _renderItem: function( ul, item ) {
    var li = $( "<li>" ),
      wrapper = $( "<div>", { text: item.label } );

    if ( item.disabled ) {
      li.addClass( "ui-state-disabled" );
    }

    $( "<span>", {
      style: item.element.attr( "data-style" ),
      "class": "ui-icon " + item.element.attr( "data-class" )
    })
      .appendTo( wrapper );

    return li.append( wrapper ).appendTo( ul );
  }
});


var selectBack = document.getElementById('pa_back');
var selectBase = document.getElementById('pa_base');
var selectCushions = document.getElementById('pa_cushions');
var selectLegs = document.getElementById('pa_legs');
var selectSupports = document.getElementById('pa_supports');

buildColors(selectBase);
buildColors(selectCushions);
buildColors(selectLegs);
buildColors(selectSupports);
// buildColors(selectBack);

selectBack.addEventListener("change", function() {
  activeOption = 'back';
  let part = parts['pa_back'][this.value];
  let color = '0xffffff';
  if(part)color = part.color;
  selectSwatch(color);
});

/*$( '#pa_back' )
  .iconselectmenu({
    change: function( event, data ) {
      activeOption = 'back';
      selectSwatch(data.item);
    }
  }).iconselectmenu( 'menuWidget')
  .addClass( 'ui-menu-icons texture' );*/

$( '#pa_legs' )
  .iconselectmenu({
    change: function( event, data ) {
      activeOption = 'legs';
      let color = colors[parseInt(data.item.element[0].dataset.key)];
      selectSwatch(color);
    }
  }).iconselectmenu( 'menuWidget')
  .addClass( 'ui-menu-icons texture' );

$( '#pa_cushions' )
  .iconselectmenu({
    change: function( event, data ) {
      activeOption = 'cushions';
      let color = colors[parseInt(data.item.element[0].dataset.key)];
      selectSwatch(color);
    }
  }).iconselectmenu( 'menuWidget')
  .addClass( 'ui-menu-icons texture' );

$( '#pa_base' )
  .iconselectmenu({
    change: function( event, data ) {
      activeOption = 'base';
      let color = colors[parseInt(data.item.element[0].dataset.key)];
      selectSwatch(color);
    }
  }).iconselectmenu( 'menuWidget')
  .addClass( 'ui-menu-icons texture' );

$( '#pa_supports' )
  .iconselectmenu({
    change: function( event, data ) {
      activeOption = 'supports';
      let color = colors[parseInt(data.item.element[0].dataset.key)];
      selectSwatch(color);
    }
  }).iconselectmenu( 'menuWidget')
  .addClass( 'ui-menu-icons texture' );

document.getElementById('wapf_field_622deaee195bd_haqnn').addEventListener("click", function() {
  activeOption = 'legs';
  let color = '0x5b5a5f';
  selectSwatch(color, activeOption);
});

document.getElementById('wapf_field_622deaee195bd_haqnn').addEventListener("click", function() {
  activeOption = 'legs';
  let color = '0xff0000';
  selectSwatch(color, activeOption);
});