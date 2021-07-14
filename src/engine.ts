//@ts-nocheck

import * as BABYLON from 'babylonjs';
import { AsciiArtPostProcess } from 'babylonjs-post-process'

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  // camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, -10), scene);


  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  var box = BABYLON.MeshBuilder.CreateBox("box1", { size: 1 }, scene);
  box.position = new BABYLON.Vector3(0, 0, 0);

  const offset = 20

  for (let index = 0; index < 1000; index++) {
    let instance = box.createInstance("box" + index);

    instance.scaling.x = (Math.random() <= 0.5 ? 1 : 2)
    instance.scaling.y = (Math.random() <= 0.5 ? 1 : 2)

    // instance.position.x = Math.random() * (Math.random() <= 0.5 ? offset : -offset)
    // instance.position.y= Math.random() * (Math.random() <= 0.5 ? offset : -offset)

    const x = (Math.random() <= 0.5 ? 0.2 : -0.2) * index * Math.random()//Math.random() * (Math.random() <= 0.5 ? offset : -offset)
    const y = (Math.random() <= 0.5 ? 0.2 : -0.2) * index * Math.random()//Math.random() * (Math.random() <= 0.5 ? offset : -offset)

       //Create an animation at 30 FPS
    var animationBox = new BABYLON.Animation("anim1", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    var animationBox2 = new BABYLON.Animation("anim1", "opacity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

    // Animation keys
    var keys1 = [{
      frame: 0,
      value: new BABYLON.Vector3(0, 0, 0)
      }, {
      frame: 100,
      value: new BABYLON.Vector3(x, y, 0)
    }];

    var keys2 = [{
      frame: 0,
      value: 0
      }, {
      frame: 100,
      value: 1
    }];

    animationBox.setKeys(keys1);
    animationBox2.setKeys(keys2);

    instance.animations.push(animationBox);
    instance.animations.push(animationBox2);

    scene.beginAnimation(instance, 0, 100);
  }

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

  // Creates the post process

  var postProcess = new AsciiArtPostProcess("AsciiArt", camera, {
      font: "5px Monospace",
      characterSet: "MIKITA"//#$%"
  });

  return scene;

};

const scene = createScene(engine, canvas)
// scene.clearColor = new BABYLON.Color4(1, 1, 0, 0)

export default {
  engine,
  scene
};