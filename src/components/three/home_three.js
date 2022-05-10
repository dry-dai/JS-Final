import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREEx from "threex.domevents";
import { useRef } from "react";

import earObj from "../../resources/assets/ear2.obj";
import earring from "../../resources/assets/ring.mtl";
import earring2 from "../../resources/assets/ring.obj";
import fire from "../../resources/assets/fire.fbx";
import { render } from "@testing-library/react";

function HomeThree() {
  let containerRef = useRef();

  useEffect(() => {
    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    let renderer;
    let camera;

    //Render
    renderer = new THREE.WebGLRenderer();
    console.log(renderer.domElement);
    renderer.setSize(window.innerWidth * 1.4 - 120, window.innerHeight - 120);
    containerRef.current.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth * 1.4 - 120) / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 400;
    // camera.position.set(100, 0, 400);
    camera.lookAt(1000, 0, 0);
    ///////////////////Earing Circle
    const geometry = new THREE.TorusGeometry(26, 6, 16, 100);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
    const torus = new THREE.Mesh(geometry, material);

    torus.rotation.set(2, 0, 0);
    torus.position.set(36, -60, 16);

    scene.add(torus);

    //Earing Pearl
    const pearlGeometry = new THREE.SphereGeometry(15, 32, 16);
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x049ef4,
      clearcoat: 1,
    });
    const pearl = new THREE.Mesh(pearlGeometry, pearlMaterial);

    pearl.position.set(-16, -242, 18);
    pearl.rotation.set(0, 0, 0);

    scene.add(pearl);

    //Earing Pearl 2
    const pearlGeometry2 = new THREE.SphereGeometry(9, 32, 16);
    const pearlMaterial2 = new THREE.MeshPhysicalMaterial({
      color: 0x049ef4,
      clearcoat: 1,
    });
    const pearl2 = new THREE.Mesh(pearlGeometry2, pearlMaterial2);

    pearl2.position.set(-32, -200, 18);
    pearl2.rotation.set(0, 0, 0);

    scene.add(pearl2);

    //Earing stud
    const studGeometry = new THREE.OctahedronGeometry(10);
    const studMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc45fff,
      clearcoat: 1,
    });
    const stud = new THREE.Mesh(studGeometry, studMaterial);

    stud.position.set(10, 90, 40);
    stud.rotation.set(190, 0, 0);

    scene.add(stud);

    //wireframe Test
    const wireGeometry = new THREE.ConeGeometry(56, 30, 24);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x79c2ff,
      wireframe: true,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);

    wire.position.set(40, 100, 40);
    wire.rotation.set(0, 60, 60);

    scene.add(wire);

    //light
    const pointLight1 = new THREE.PointLight(0x049ef4, 0.8); //blue
    pointLight1.position.set(0, -150, 20);

    const pointLight2 = new THREE.PointLight(0x811dff, 0.2); //purple
    pointLight2.position.set(-160, -200, 120);

    // pointLight1.castShadow = true;
    const hemiLight = new THREE.HemisphereLight(0x959593, 0x080820, 1.8); //sky,ground,Lightness
    scene.add(pointLight1, pointLight2, hemiLight);

    //mouse control
    // const controls = new OrbitControls(camera, renderer.domElement);
    const controls = new OrbitControls(camera, containerRef.current);

    //Star
    function addStar() {
      const geometry = new THREE.OctahedronGeometry(1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(600));
      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(230).fill().forEach(addStar);

    // load EAR MODEL
    const ear = new OBJLoader();
    ear.load(earObj, function (object) {
      // object.position.y -= 60;
      scene.add(object);
    });

    let mat = new THREE.MeshPhysicalMaterial({
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      metalness: 0.9,
      roughness: 1.0,
      color: 0x000000,
    });

    const loaderFBX = new FBXLoader();
    loaderFBX.load(fire, function (object) {
      let model = object.children[0];
      model.position.set(0, 0, 0);
      model.scale.setScalar(10);
      model.material = mat;
      scene.add(model);
    });
    const ring = new OBJLoader();
    ring.load(earring2, function (object) {
      object.position.y -= 200;
      scene.add(object);
    });

    function click() {}

    // const domEvent = new THREEx.DomEvents(camera, renderer.domElement);

    /*  domEvent.addEventListener(torus, "click", (event) => {
      material.wireframe = true;
    }); */

    //Animate
    let speed = 0.008;
    let speed2 = 0.2;

    function animate() {
      click();
      requestAnimationFrame(animate);

      torusAnimate();
      studAnimate();
      sphereAnimate();

      //orbitcontrol update
      controls.update();
      renderer.render(scene, camera);
    }

    function torusAnimate() {
      if (torus.rotation.x < 1.5 || torus.rotation.x > 2.2) {
        speed *= -1;
      }
      torus.rotation.x += speed;
      torus.position.y = -60;
    }

    function studAnimate() {
      stud.rotation.y += 0.05;
    }

    function sphereAnimate() {
      // requestAnimationFrame( animate );

      if (pearl2.position.y < -210 || pearl2.position.y > -190) {
        speed2 *= -1;
      }
      pearl2.position.y += speed2;
      // console.log(pearl2.position.y);
    }

    animate();
  }, []);

  return <div ref={containerRef}></div>;
}

export default HomeThree;
