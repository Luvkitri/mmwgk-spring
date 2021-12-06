export const PLATFORM_VS = `
varying vec2 vTextureCoord;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const PLATFORM_FS = `
uniform sampler2D platformTexture;

varying highp vec2 vTextureCoord;

void main() {
  gl_FragColor = texture2D(platformTexture, vTextureCoord);
}
`;

export const BALL_VS = `
varying vec2 vertexUV;


void main() {
  vertexUV = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const BALL_FS = `
uniform sampler2D ballTexture;

varying vec2 vertexUV;

void main() {
  gl_FragColor = vec4(vec3(0.5, 0.1, 0.2) + texture2D(ballTexture, vertexUV).xyz, 1.0);
}
`;
