import {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
  Vector3,
} from "three";
// import { PLATFORM_VS, PLATFORM_FS } from "../shaders";

export class Cylinder extends Mesh {
  base: Vector3[];
  secondBase: Vector3[] = [];
  height: number;
  direction: Vector3;
  polygons: Vector3[][] = [];
  scaleValue: number = 1;

  constructor(base: Vector3[], height: number, direction: Vector3, scaleValue: number) {
    super();
    this.geometry = new BufferGeometry();

    this.base = base;

    this.height = height;
    this.direction = direction;

    this.initSecondBase();
    this.initPolygons();


    this.geometry.setFromPoints(this.polygons.flat(2));
    this.geometry.computeVertexNormals();
    this.material = new MeshNormalMaterial();

    this.scaleValue = scaleValue;

    this.scale.set(this.scaleValue, this.scaleValue, this.scaleValue);
  }

  private initPolygons() {
    for (let i = 0; i < this.base.length - 1; i++) {
      let current1 = this.base[i];
      let current2 = this.base[i + 1];
      let next1 = this.secondBase[i];
      let next2 = this.secondBase[i + 1];

      this.polygons.push([current1, next1, current2]);
      this.polygons.push([current2, next1, next2]);
    }
  }

  private initSecondBase() {
    const incrVector = new Vector3(
      this.height,
      this.height,
      this.height
    ).multiply(this.direction);

    for (const vec of this.base) {
      this.secondBase.push(
        new Vector3(
          vec.x + incrVector.z,
          vec.y + incrVector.y,
          vec.z + incrVector.x
        )
      );
    }
  }
}
