import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
// import { Cube } from "./models/cube";
import { Block } from "./models/block";
import { Ball } from "./models/ball";

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

  constructor() {
    // this.brick = new Cube(100, new Color("rgb(255,0,0)"));
    this.platform = new Block(150, 50, 200);
    this.platform.translateY(300);

    this.supportBlock = new Block(50, 150, 50);
    this.supportBlock.translateY(250);

    this.ball = new Ball(50);
    this.ball.translateY(-200);

    this.scene.add(this.platform);
    this.scene.add(this.supportBlock);
    this.scene.add(this.ball);

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
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    this.adjustCanvasSize();
  }
}