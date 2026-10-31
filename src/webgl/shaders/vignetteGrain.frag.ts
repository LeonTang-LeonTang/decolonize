/** Fullscreen vignette + film grain — Pass 5 custom GLSL post. */
export const vignetteGrainShader = {
  name: "VignetteGrainShader",
  uniforms: {
    tDiffuse: { value: null as unknown },
    uTime: { value: 0 },
    uVignette: { value: 0.55 },
    uGrain: { value: 0.045 },
    uWarm: { value: 0.04 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uWarm;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      // Subtle warm lift (museum tungsten)
      color.rgb += vec3(uWarm, uWarm * 0.7, uWarm * 0.25) * 0.85;

      // Vignette
      vec2 uv = vUv - 0.5;
      float vig = 1.0 - dot(uv, uv) * (uVignette * 1.85);
      color.rgb *= clamp(vig, 0.48, 1.0);

      // Film grain (animated)
      float g = hash(vUv * vec2(1920.0, 1080.0) + uTime * 60.0) - 0.5;
      color.rgb += g * uGrain;

      gl_FragColor = color;
    }
  `,
}
