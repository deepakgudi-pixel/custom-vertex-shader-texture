import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';

class Sketch{
    constructor(options){
        this.time = 0;
        this.container = options.dom;
        //create scene
        this.scene = new THREE.Scene();

       this.width = this.container.offsetWidth;
       this.height = this.container.offsetHeight;

        //create camera
	    this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 0.01, 10 );
	    this.camera.position.z = 1;

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	   
	    this.container.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }

    setupResize(){
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize( this.width, this.height ); 
        this.camera.aspect = this.width/ this.height; 
        //we are saying the viewport has changed and resize based on vieport
        this.camera.updateProjectionMatrix(); 
    }

    addObjects(){
        this.geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
        this.material = new THREE.MeshNormalMaterial();

        //creating shaders
        //this shader material has couple of options 
        this.material = new THREE.ShaderMaterial({
            fragmentShader: `
            void main(){
                gl_FragColor = vec4(1, 0, 1, 1);
            }`,
            vertexShader: `
                void main(){
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
        });

	    this.mesh = new THREE.Mesh( this.geometry, this.material );
	    this.scene.add( this.mesh );
    }

    render(){
        this.time += 0.05;
        this.mesh.rotation.x = this.time / 2000;
        this.mesh.rotation.y = this.time / 1000;
    
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this)); 
    } 
}

new Sketch({
    dom: document.getElementById("container")
});





