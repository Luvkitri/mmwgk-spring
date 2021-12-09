import {
  Clock,
  Color,
  MathUtils,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { Block } from "./models/block";
import { Ball } from "./models/ball";
import { Spring } from "./models/spring";
import { Cylinder } from "./models/cylinder";

import * as WoodTexture from "./assets/textures/wood.jpg";
import * as MetalTexture from "./assets/textures/metal.jpg";

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    10000
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private platform: Block;
  private supportBlock: Block;
  private ball: Ball;
  private mergeTopBall: Ball;
  private spring: Spring;
  private topCylinder: Cylinder;
  private clock: Clock;
  private mergeBottomBall: Ball;
  private mergeBottomBall2: Ball;
  private horizontalBottomCylinder: Cylinder;
  private verticalBottomCylinder: Cylinder;

  constructor() {
    this.clock = new Clock();

    this.spring = new Spring();
    this.spring.rotateX(MathUtils.degToRad(90));

    this.topCylinder = new Cylinder(
      this.spring.getTopRing(),
      5,
      new Vector3(0, 1, 0),
      this.spring.scaleValue
    );
    this.topCylinder.translateX(1);

    this.supportBlock = new Block(50, 150, 50);
    this.supportBlock.position.set(
      this.spring.topRingPos.x * this.spring.scaleValue,
      this.spring.topRingPos.z * this.spring.scaleValue,
      this.spring.topRingPos.y * this.spring.scaleValue
    );
    this.supportBlock.translateY(100);

    this.platform = new Block(150, 50, 200);
    this.platform.translateX(45);
    this.platform.translateY(155);
    this.platform.translateZ(0);

    this.mergeTopBall = new Ball(15, WoodTexture);
    this.mergeTopBall.position.set(
      this.spring.topRingPos.x * this.spring.scaleValue,
      this.spring.topRingPos.z * this.spring.scaleValue,
      this.spring.topRingPos.y * this.spring.scaleValue
    );

    this.mergeBottomBall = new Ball(16, WoodTexture);
    this.mergeBottomBall.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue,
      this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue
    );

    this.mergeBottomBall2 = new Ball(16, WoodTexture);
    this.mergeBottomBall2.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue,
      this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue
    );

    this.horizontalBottomCylinder = new Cylinder(
      this.spring.getTopRing(),
      2,
      new Vector3(0, 1, 0),
      this.spring.scaleValue
    );
    this.horizontalBottomCylinder.rotateX(MathUtils.degToRad(90));
    this.horizontalBottomCylinder.position.set(
      this.mergeBottomBall.position.x,
      this.mergeBottomBall.position.y,
      this.mergeBottomBall.position.z
    );

    this.verticalBottomCylinder = new Cylinder(
      this.spring.getTopRing(),
      4,
      new Vector3(0, 1, 0),
      this.spring.scaleValue
    );
    this.verticalBottomCylinder.position.set(
      this.mergeBottomBall2.position.x,
      this.mergeBottomBall2.position.y,
      this.mergeBottomBall2.position.z
    );

    this.ball = new Ball(33, MetalTexture);
    this.ball.position.set(
      this.verticalBottomCylinder.position.x,
      this.verticalBottomCylinder.position.y,
      this.verticalBottomCylinder.position.z
    );

    this.scene.add(this.platform);
    this.scene.add(this.supportBlock);
    this.scene.add(this.mergeTopBall);
    this.scene.add(this.mergeBottomBall2);
    this.scene.add(this.mergeBottomBall);
    this.scene.add(this.ball);
    this.scene.add(this.spring);
    this.scene.add(this.topCylinder);
    this.scene.add(this.horizontalBottomCylinder);
    this.scene.add(this.verticalBottomCylinder);

    this.scene.background = new Color(0xe0e0e0);

    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));

    this.initControls();
    this.render();
  }

  private initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    // How far you can dolly in and out ( PerspectiveCamera only )
    controls.minDistance = 0;
    controls.maxDistance = Infinity;

    controls.enableZoom = true; // Set to false to disable zooming
    controls.zoomSpeed = 1.0;

    controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

    controls.enableDamping = true; // Set to false to disable damping (ie inertia)
    controls.dampingFactor = 0.25;
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    requestAnimationFrame(() => this.render());

    this.spring.bounce = Math.abs(Math.sin(this.clock.getElapsedTime())) + 0.4;

    this.ball.position.set(
      this.verticalBottomCylinder.position.x + 45,
      this.verticalBottomCylinder.position.y,
      this.verticalBottomCylinder.position.z
    );

    this.mergeBottomBall.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue,
      -this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue
    );

    this.mergeBottomBall2.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue,
      -this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue +
        this.horizontalBottomCylinder.height * this.spring.scaleValue
    );

    this.horizontalBottomCylinder.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue - 45,
      -this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue
    );

    this.verticalBottomCylinder.position.set(
      this.mergeBottomBall2.position.x - 45,
      this.mergeBottomBall2.position.y - 55,
      this.mergeBottomBall2.position.z
    );

    this.spring.reRender();

    this.renderer.render(this.scene, this.camera);

    this.adjustCanvasSize();
  }
}
