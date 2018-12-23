
var camera, scene, renderer, mesh, material, controls;
var red = new THREE.Color(0xff0000);
var originalColor = new THREE.Color(0xadc9f4);
var targetList = [
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]]
];
// var intersects = [
//   [[],[],[],[]],
//   [[],[],[],[]],
//   [[],[],[],[]],
//   [[],[],[],[]]
// ];

console.log(targetList);

// var projector, mouse = { x: 0, y: 0 };
var projecter;
var mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

addCubes();
render();

//Create and add cubes to the scene.---------------------------
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

}//-------------------------------------------------




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

  intersects = ray.intersectObjects( scene.children );
  if ( intersects.length > 0 && INTERSECTED != intersects[0].object)
  {
    INTERSECTED = intersects[0].object;
    INTERSECTED.material.emissive.setHex( 0xff0000 );
    console.log("The Intersected Node: " + INTERSECTED.name);
  }


  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        targetList[i][j][k].name = i +" "+j+" "+k;
      } //------k for loop ends

      //Checks 2D Horizontal win on every plane.
      if(targetList[i][0][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][1][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][2][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][3][j].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red Horizontal win');
      }

      //Checks 2D Vertical win on every plane.
      if(targetList[i][j][0].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][j][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][j][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][j][3].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red Vertical win');
      }

      //Checks 2D First Diagonal win on every plane.
      if(targetList[i][0][3].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][1][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][2][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][3][0].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red Diagonal1 win');
      }

      //Checks 2D Second Diagonal win on every plane.
      if(targetList[i][3][3].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][2][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][1][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[i][0][0].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red Diagonal2 win');
      }

      //Win condition for 3D planes.
      //Checks first 3D win on every plane. Checks up and down
      if(targetList[0][i][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][i][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][i][j].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][i][j].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D win. Checks up and down between planes');
      }
      //Checks 3D Diagonal win on every plane. Checks up and down
      if(targetList[0][i][3].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][i][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][i][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][i][0].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D win. Checks up and down between planes');
      }
      //Checks 3D Diagonal win on every plane. Checks up and down
      if(targetList[0][0][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][1][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][2][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][3][i].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D win. Checks up and down between planes');
      }
      //Checks 3D Diagonal win on every plane. Checks up and down
      if(targetList[0][i][0].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][i][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][i][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][i][3].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D win. Checks up and down between planes');
      }
      //Checks 3D Diagonal win on every plane. Checks up and down
      if(targetList[0][3][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][2][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][1][i].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][0][i].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D win. Checks up and down between planes');
      }






      //Checks first set 3D Diagonal win.
      if(targetList[0][0][3].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][1][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][2][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][3][0].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D 1st Diagonal win.');
      }
      //Checks first set 3D Diagonal win.
      if(targetList[0][0][0].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][1][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][2][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][3][3].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D 1st Diagonal win.');
      }

      //Checks Second set 3D Diagonal win.
      if(targetList[0][3][3].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][2][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][1][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][0][0].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D 2nd Diagonal win.');
      }
      //Checks Second set 3D Diagonal win.
      if(targetList[0][3][0].material.emissive.equals({r:1,g:0,b:0})
      && targetList[1][2][1].material.emissive.equals({r:1,g:0,b:0})
      && targetList[2][1][2].material.emissive.equals({r:1,g:0,b:0})
      && targetList[3][0][3].material.emissive.equals({r:1,g:0,b:0})){
        alert('Red 3D 2nd Diagonal win.');
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
