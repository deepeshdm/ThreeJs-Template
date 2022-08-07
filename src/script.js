import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// Scene
const scene = new THREE.Scene()

const sizes = {width: window.innerWidth,height: window.innerHeight}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 35
scene.add(camera)

// Renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true  // Make background transparent
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Light
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

// Orbit Control
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;

//---------------------------------------------------------

// Adding Responsiveness

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//---------------------------------------------------------

// Objects

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100,16 );
const material = new THREE.MeshPhongMaterial( { color:0xD2B4DE , shininess:100} );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );


//---------------------------------------------------------

// Animation loop 

function animate() {
    requestAnimationFrame( animate );

    // rotate the object
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.01;

    renderer.render( scene, camera );
};

animate();