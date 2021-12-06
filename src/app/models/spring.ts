import { Mesh, BufferGeometry, Vector3 } from "three";
import { makeRange } from "../utils/range";

export class Spring extends Mesh {
  nVertices: number = 12;
  vertices: Vector3[] = [];

  constructor() {
    super();
    this.geometry = new BufferGeometry();

    this.initSpringVertices();
  }

  private initSpringVertices() {
    const t = makeRange(0, Math.PI * 8, this.nVertices);
    const u = makeRange(0, Math.PI * 2, this.nVertices);

    for (let i = 0; i < this.nVertices; i++) {
      const x = Math.cos(t[i]) * (3 + Math.cos(u[i]));
      const y = Math.sin(t[i]) * (3 + Math.cos(u[i]));
      const z = 0.6 * t[i] + Math.sin(u[i]);
      this.vertices.push(new Vector3(x, y, z));
    }
  }
}
