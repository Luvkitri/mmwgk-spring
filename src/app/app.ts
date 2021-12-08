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
// import { Cube } from "./models/cube";
import { Block } from "./models/block";
import { Ball } from "./models/ball";
import { Test } from "./models/test";
import { Spring } from "./models/spring";
import { Cylinder } from "./models/cylinder";

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

  // private brick: Cube;
  private platform: Block;
  private supportBlock: Block;
  private ball: Ball;
  private mergeBall: Ball;
  // private test: Test;
  private spring: Spring;
  private cylinder: Cylinder;
  private clock: Clock;

  constructor() {
    this.clock = new Clock();

    this.spring = new Spring();
    this.spring.rotateX(MathUtils.degToRad(90));

    this.cylinder = new Cylinder(
      this.spring.getTopRing(),
      5,
      new Vector3(0, 1, 0),
      this.spring.scaleValue
    );

    this.supportBlock = new Block(50, 150, 50);
    this.supportBlock.position.set(
      this.spring.topRingPos.x * this.spring.scaleValue,
      this.spring.topRingPos.z * this.spring.scaleValue,
      this.spring.topRingPos.y * this.spring.scaleValue
    );
    this.supportBlock.translateY(100)

    this.platform = new Block(150, 50, 200);
    this.platform.translateX(50);
    this.platform.translateY(150);
    this.platform.translateZ(-15);

    this.mergeBall = new Ball(15);
    this.mergeBall.position.set(
      this.spring.topRingPos.x + 43,
      this.spring.topRingPos.y,
      this.spring.topRingPos.z
    );

    this.ball = new Ball(30);
    this.ball.position.set(
      this.spring.topRingPos.x * this.spring.scaleValue,
      this.spring.topRingPos.z * this.spring.scaleValue,
      this.spring.topRingPos.y * this.spring.scaleValue
    );

    this.scene.add(this.platform);
    this.scene.add(this.supportBlock);
    this.scene.add(this.mergeBall);
    this.scene.add(this.ball);
    this.scene.add(this.spring);
    this.scene.add(this.cylinder);

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

    this.spring.bounce = Math.abs(Math.sin(this.clock.getElapsedTime())) + 0.2;

    this.ball.position.set(
      this.spring.bottomRingPos.x * this.spring.scaleValue,
      -this.spring.bottomRingPos.z * this.spring.scaleValue,
      this.spring.bottomRingPos.y * this.spring.scaleValue
    );

    this.spring.reRender();

    this.renderer.render(this.scene, this.camera);

    this.adjustCanvasSize();
  }
}
