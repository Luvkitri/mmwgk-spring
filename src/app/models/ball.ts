import { SphereGeometry, Mesh, ShaderMaterial, TextureLoader } from "three";
import { BALL_FS, BALL_VS } from "../shaders";

export class Ball extends Mesh {
  constructor(radius: number) {
    super();
    this.geometry = new SphereGeometry(radius);
    this.material = new ShaderMaterial({
      uniforms: {
        ballTexture: {
          value: new TextureLoader().load("./public/face.jpg"),
        },
      },
      vertexShader: BALL_VS,
      fragmentShader: BALL_FS,
    });
  }
}
