import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
} from "three";
// import { PLATFORM_VS, PLATFORM_FS } from "../shaders";

export class Block extends Mesh {
  constructor(a: number, b: number, c: number) {
    super();
    this.geometry = new BoxGeometry(a, b, c);
    this.material = new MeshBasicMaterial({
      map: new TextureLoader().load("./public/wood.jpg"),
    });

    // this.material =   new ShaderMaterial({
    //   uniforms: {
    //     platformTexture: {
    //       value: new TextureLoader().load('./public/wood.jpg')
    //     }
    //   },
    //   vertexShader: PLATFORM_VS,
    //   fragmentShader: PLATFORM_FS,
    // });
  }
}
