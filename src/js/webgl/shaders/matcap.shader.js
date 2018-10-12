const vs = `
varying vec2 vN;
uniform sampler2D tNormal;
void main() {

    vec4 p = vec4( position, 1. );

    vec3 e = normalize( vec3( modelViewMatrix * p ) );
    vec3 n = normalize( normalMatrix * normal );

    vec3 r = reflect( e, n );
    float m = 2. * sqrt(
        pow( r.x, 2. ) +
        pow( r.y, 2. ) +
        pow( r.z + 1., 2. )
    );
    vN = r.xy / m + .5;

    gl_Position = projectionMatrix * modelViewMatrix * p;

}
`;

const fs = `
uniform sampler2D tMatCap;


varying vec2 vN;

void main() {

  vec3 base = texture2D( tMatCap, vN ).rgb;
  gl_FragColor = vec4( base, 0.44 );

}
`;

export function MatcapMaterial(_texture, _normal) {
	return new THREE.ShaderMaterial({
		uniforms: {
			tMatCap: {
				type: 't',
				value: _texture
			},
			tNormal: {
				type: 't',
				value: _normal
			}
		},
		vertexShader: vs,
		fragmentShader: fs,
		shading: THREE.SmoothShading
	});
}
