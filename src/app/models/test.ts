import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  Vector3,
} from "three";

export class Test extends Mesh {
  constructor() {
    super();
    this.geometry = new BufferGeometry();

    const points = [
      new Vector3(-1, 1, -1), //c
      new Vector3(-1, -1, 1), //b
      new Vector3(-1, 1, -1), //c

      new Vector3(1, 1, 1), //a
      new Vector3(1, -1, -1), //d
      new Vector3(1, 1, 1), //a

      new Vector3(-1, -1, 1), //b
      new Vector3(1, -1, -1), //d
      new Vector3(1, 1, 1), //a
      
      new Vector3(-1, 1, -1), //c
      new Vector3(1, -1, -1), //d
      new Vector3(-1, -1, 1), //b
    ];

    this.geometry.setFromPoints(points);
    this.geometry.computeVertexNormals();

    this.material = new MeshNormalMaterial();
  }
}
