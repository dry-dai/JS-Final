import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import THREEx from "./threex.domevents";
import { useRef } from "react";

import earring from "../../resources/assets/ring.mtl";
import earring2 from "../../resources/assets/ring.obj";
import fire from "../../resources/assets/fire_eye.fbx";
import { render } from "@testing-library/react";

function Three_Eye() {
  let containerRef = useRef();

  useEffect(() => {
    console.log("run");
    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //Render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor("#3EC9CD");

    containerRef.current.appendChild(renderer.domElement);

    //camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = -130;

    //light
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5); //blue
    pointLight1.position.set(100, 0, 20);

    const pointLight2 = new THREE.PointLight(0xffffff, 2); //purple
    pointLight2.position.set(0, 100, -100);

    // pointLight1.castShadow = true;
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 4); //sky,ground,Lightness
    scene.add(pointLight1, pointLight2, hemiLight);

    //mouse control
    const controls = new OrbitControls(camera, renderer.domElement);

    // -------------------Sphere Function-----------------------------------------
    const whiteColor = new THREE.Color(0xffffff);
    const pinkColor = new THREE.Color(0xff0202);
    const blackColor = new THREE.Color(0x1e1e1e);
    const darkpinkColor = new THREE.Color(0xe74aff);

    function createSphere(
      rotationFactor_x,
      rotationFactor_y,
      rotationFactor_z,
      position,
      color,
      hoverColor,
      soundURL,
      index
    ) {
      const sphere_geometry = new THREE.SphereGeometry(12, 24, 24);
      const sphere_material = new THREE.MeshPhysicalMaterial({
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
        metalness: 0.9,
        roughness: 0.3,
        color: color,
      });
      const sphere = new THREE.Mesh(sphere_geometry, sphere_material);

      sphere.name = "sphere" + index;
      // sphere.scale.y = 0.63;
      sphere.rotation.x = rotationFactor_x;
      sphere.rotation.y = rotationFactor_y;
      sphere.rotation.z = rotationFactor_z;
      sphere.position.set(position.x, position.y, position.z);
      scene.add(sphere);

      const domEvent = new THREEx.DomEvents(camera, renderer.domElement);
      domEvent.addEventListener(sphere, "mouseover", (event) => {
        sphere.scale.set(1, 1, 1);
        sphere.material.color = hoverColor;
      });

      domEvent.addEventListener(sphere, "mouseout", (event) => {
        sphere.scale.set(1, 1, 1);
        sphere.material.color = color;
      });
    }

    createSphere(
      1.2, //xRotation
      0, //yRotation
      0,
      { x: 0, y: -50, z: 0 }, //position Object
      whiteColor, //defaultColor
      pinkColor, //hoverColor
      null,
      1 //index
    );

    //-----------------------------Hoop---------------------------------------------------

    let mat = new THREE.MeshPhysicalMaterial({
      // clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      metalness: 1,
      roughness: 0.15,
      color: 0xefd3a5,
    });
    const loaderFBX = new FBXLoader();
    loaderFBX.load(fire, function (object) {
      let model = object.children[0];
      model.position.set(0, -50, 0);
      model.scale.setScalar(1);
      model.material = mat;
      console.log(model.position);
      scene.add(model);
    });

    //Animate
    let speed = 0.008;
    let speed2 = 0.2;

    function animate() {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={containerRef}></div>;
}

export default Three_Eye;
