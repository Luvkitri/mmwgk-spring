import { BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";
import * as WoodTexture from "../assets/textures/wood.jpg";

export class Block extends Mesh {
  constructor(a: number, b: number, c: number) {
    super();
    this.geometry = new BoxGeometry(a, b, c);
    this.material = new MeshBasicMaterial({
      map: new TextureLoader().load(WoodTexture),
    });
  }
}
