const LOADER = document.getElementById('js-loader');

const DRAG_NOTICE = document.getElementById('js-drag-notice');

var theModel;

const MODEL_PATH = "chair.glb";

var activeOption = 'legs';
var loaded = false;

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


const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);

// Add a camerra
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;

// Initial material
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });

const INITIAL_MAP = [
{ childID: "back", mtl: INITIAL_MTL },
{ childID: "base", mtl: INITIAL_MTL },
{ childID: "cushions", mtl: INITIAL_MTL },
{ childID: "legs", mtl: INITIAL_MTL },
{ childID: "supports", mtl: INITIAL_MTL }];


// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH, function (gltf) {
  theModel = gltf.scene;

  theModel.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  // Set the models initial scale   
  theModel.scale.set(2, 2, 2);
  theModel.rotation.y = Math.PI;

  // Offset the y position a bit
  theModel.position.y = -1;

  // Set initial textures
  for (let object of INITIAL_MAP) {
    initColor(theModel, object.childID, object.mtl);
  }

  // Add the model to the scene
  scene.add(theModel);

  // Remove the loader
  LOADER.remove();

}, undefined, function (error) {
  console.error(error);
});

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add(dirLight);

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0 });


var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (theModel != null && loaded == false) {
    initialRotation();
    DRAG_NOTICE.classList.add('start');
  }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
}

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


function selectSwatch(color) {
  console.log('color', color, color.texture);
  let new_mtl;

  if (color.texture) {
    let txt = new THREE.TextureLoader().load(color.texture);
    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10 });
  } else
  {
    if (color.color) {
      couleur = parseInt('0x' + color.color);
      // couleur = parseInt(color.color);
    } else {
      couleur = parseInt(color);
    }
    new_mtl = new THREE.MeshPhongMaterial({
      color: couleur,
      shininess: color.shininess ? color.shininess : 10 });
  }

  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

// Function - Opening rotate
let initRotate = 0;

function initialRotation() {
  initRotate++;
  if (initRotate <= 120) {
    theModel.rotation.y += Math.PI / 60;
  } else {
    loaded = true;
  }
}