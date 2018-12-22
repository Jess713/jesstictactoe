
var camera, scene, renderer, mesh, material, controls;
var red = new THREE.Color(0xff0000);
var originalColor = new THREE.Color(0xadc9f4);
var targetList = [
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]]
];
var intersects = [
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]]
];

console.log(targetList);

// var projector, mouse = { x: 0, y: 0 };
var projecter;
var mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

addCubes();
render();


function addCubes() {
  var xDistance = 30;
  var zDistance = 15;
  var geometry = new THREE.BoxBufferGeometry(10,10,10);
  // var material = new THREE.MeshBasicMaterial({color:0x6C70A8});

  //1
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      var mesh  = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: 0xadc9f4} ));
      mesh.position.x = xDistance * i;
      mesh.position.z = zDistance * j;
      // mesh.position.y += 15;
      scene.add(mesh);
      targetList[i][j].push(mesh);
    }

    for(let j = 0; j < 4; j++){
      var mesh2  = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: 0xadc9f4} ));
      mesh2.position.x = xDistance * i;
      mesh2.position.z = zDistance * j;
      mesh2.position.y = 15;
      scene.add(mesh2);
      targetList[i][j].push(mesh2);
    }
    for(let j = 0; j < 4; j++){
      var mesh3  = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: 0xadc9f4} ));
      mesh3.position.x = xDistance * i;
      mesh3.position.z = zDistance * j;
      mesh3.position.y = 30;
      scene.add(mesh3);
      targetList[i][j].push(mesh3);
    }
    for(let j = 0; j < 4; j++){
      var mesh4  = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: 0xadc9f4} ));
      mesh4.position.x = xDistance * i;
      mesh4.position.z = zDistance * j;
      mesh4.position.y = 45;
      scene.add(mesh4);
      targetList[i][j].push(mesh4);
    }
  }

}




function init() {
  // Renderer.
  renderer = new THREE.WebGLRenderer({antialias:true});
  // renderer = new THREE.WebGLRenderer();
  //renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add renderer to page
  document.body.appendChild(renderer.domElement);

  // Create camera.
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 150;


  // Add controls
  controls = new THREE.TrackballControls( camera );
  controls.addEventListener( 'change', render );
  controls.target.set(0,0,-50);

  // Create scene.
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // Create directional light and add to scene.
  var pointLight = new THREE.PointLight(0xFFFFFF, 1, 100000);
  pointLight.position.set(1, 1, 1).normalize();
  scene.add(pointLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Add listener for window resize.
  window.addEventListener('resize', onWindowResize, false);
}


// initialize object to perform world/screen calculations
projector = new THREE.Projector();
// when the mouse moves, call the given function
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

//HERE IS THE CLICK FUNCTION!!!---------------------------------------------
function onDocumentMouseDown( event )
{
  // the following line would stop any other event handler from firing
  // (such as the mouse's TrackballControls)
  event.preventDefault();

  console.log("Clicked onDocumentMouseDown FUNCTION");

  // update the mouse variable
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // find intersections

  // create a Ray with origin at the mouse position
  //   and direction into the scene (camera direction)
  var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
  projector.unprojectVector( vector, camera );
  var ray = new THREE.Raycaster();
  ray.setFromCamera( mouse, camera );

  console.log("------------------------------------------");

  // create an array containing all objects in the scene with which the ray intersects
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        intersects = ray.intersectObjects( scene.children );

        targetList[i][j][k].name = i +" "+j+" "+k;
        if ( intersects.length > 0 && INTERSECTED != intersects[0].object)
        {
          INTERSECTED = intersects[0].object;
          // INTERSECTED.id= targetList[i][j][k].name;
          INTERSECTED.material.emissive.setHex( 0xff0000 );
          // let val = document.getElementById(INTERSECTED.name);
          console.log("The Intersected Node: " + INTERSECTED.name);
        }
      }

      //Checks Horizontal win on every plane.
      if(  targetList[i][0][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][1][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][2][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][3][j].material.emissive.equals({r:1,g:0,b:0}) ){
        alert('red win');

      }
    }
  }

  console.log(targetList);







}
//CLICK Function Ended--------------//////////////////////////////////////







// function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }

function animate() {
  requestAnimationFrame(animate);
  render();
  controls.update();

}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}
