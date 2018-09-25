define(function () {
    'use strict';
    var singleton = null;

    // var shader = _shaders.earthShaders['earth'];
    // var uniforms = _uniform.clone(shader.uniforms);
    // uniforms['texture'].texture = __getRes__(_cts.RES_TYPE_TEXTURES, props.path);
    // var material = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader: shader.vertexShader,
    //     fragmentShader: shader.fragmentShader
    // });

    var earthShaders = {
        'earth': {
            uniforms: {
                "texture": {
                    type: "t",
                    value: 0,
                    texture: null
                }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec2 vUv;
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                    vNormal = normalize( normalMatrix * normal );
                    vUv = uv;
                }
            `,
            fragmentShader: `
                uniform sampler2D texture;
                varying vec3 vNormal;
                varying vec2 vUv;
                void main() {
                    vec3 diffuse = texture2D( texture, vUv ).xyz;
                    float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
                    vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );
                    gl_FragColor = vec4( diffuse + atmosphere, 1.0 );
                }
            `
        },
        'atmosphere': {
            uniforms: {},
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize( normalMatrix * normal );
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow( 0.8 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 12.0 );
                    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
                }
            `
        }
    };

    return function () {
        return singleton ? singleton : {
            earthShaders: earthShaders
        };
    };
});