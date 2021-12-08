import {
  Mesh,
  BufferGeometry,
  Vector3,
  MeshNormalMaterial,
  ShaderMaterial,
  TextureLoader,
  BufferAttribute,
  Float32BufferAttribute,
} from "three";
import { SPRING_FS, SPRING_VS } from "../shaders";
import { makeRange } from "../utils/range";

export class Spring extends Mesh {
  ringPoints: number = 12;
  nRings: number = 12;
  nParts: number = 4;
  rings: Vector3[][] = [];
  polygons: Vector3[][] = [];
  scaleValue: number = 15;
  uvs: number[] = [];
  bounce: number = 0.6;
  public topRingPos: Vector3 = new Vector3(0, 0, 0);
  public bottomRingPos: Vector3 = new Vector3(0, 0, 0);

  constructor() {
    super();

    this.geometry = new BufferGeometry();

    this.initSpringVertices();
    this.initPolygons();
    this.initUVs();

    this.geometry.setAttribute(
      "uv",
      new Float32BufferAttribute(new Float32Array(this.uvs), 2)
    );
    this.geometry.setFromPoints(this.polygons.flat(2));
    this.geometry.computeVertexNormals();

    this.material = new ShaderMaterial({
      uniforms: {
        springTexture: {
          value: new TextureLoader().load("./public/flesh.jpg"),
        },
      },
      vertexShader: SPRING_VS,
      fragmentShader: SPRING_FS,
    });
    this.scale.set(this.scaleValue, this.scaleValue, this.scaleValue);

    this.topRingPos = this.getCenterOfRing(0);
    this.bottomRingPos = this.getCenterOfRing(this.rings.length - 1);
  }

  public reRender() {
    this.initSpringVertices();
    this.initPolygons();

    this.geometry.setFromPoints(this.polygons.flat(2));
    this.geometry.computeVertexNormals();
  }

  private initSpringVertices() {
    this.rings = [];
    const t = makeRange(0, Math.PI * 8, this.nRings * this.nParts);
    const u = makeRange(0, Math.PI * 2, this.ringPoints);

    for (let i = 0; i < this.nRings * this.nParts; i++) {
      let ring = [];
      for (let j = 0; j < this.ringPoints; j++) {
        const x = Math.cos(t[i]) * (3 + Math.cos(u[j]));
        const y = Math.sin(t[i]) * (3 + Math.cos(u[j]));
        const z = this.bounce * t[i] + Math.sin(u[j]);
        ring.push(new Vector3(x, y, z));
      }

      this.rings.push(ring);
    }
  }

  private initPolygons() {
    this.polygons = [];
    for (let i = 1; i < this.nRings * this.nParts; i++) {
      for (let j = 0; j < this.ringPoints - 1; j++) {
        let current1 = this.rings[i - 1][j];
        let current2 = this.rings[i - 1][j + 1];
        let next1 = this.rings[i][j];
        let next2 = this.rings[i][j + 1];

        this.polygons.push([current1, next1, current2]);
        this.polygons.push([current2, next1, next2]);
      }
    }
  }

  private initUVs() {
    const singlePolygonUVs = [0.0, 0.0, 0.0, 1.0, 1.0, 0.0];

    for (let i = 0; i < this.polygons.length; i++) {
      this.uvs.push(...singlePolygonUVs);
    }
  }

  private getCenterOfRing(ringIndex: number) {
    let sum_x = 0;
    let sum_y = 0;
    let sum_z = 0;

    for (const vec of this.rings[ringIndex]) {
      sum_x += vec.x;
      sum_y += vec.y;
      sum_z += vec.z;
    }

    return new Vector3(
      sum_x / this.rings[ringIndex].length,
      sum_y / this.rings[ringIndex].length,
      sum_z / this.rings[ringIndex].length
    );
  }

  public getBottomRing() {
    return this.rings[this.rings.length - 1];
  }

  public getTopRing() {
    return this.rings[0];
  }
}
