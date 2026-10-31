import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { vignetteGrainShader } from "./shaders/vignetteGrain.frag"

/**
 * Museum canvas post stack: RenderPass → bloom-lite → custom vignette/grain GLSL.
 * Tone mapping stays on the WebGLRenderer (ACES) — no OutputPass to avoid double-map.
 * Kaizen ships bespoke nanogl stretch/foam/lily shaders; this is the Vite-stable stand-in.
 */
export class PostFX {
  readonly composer: EffectComposer
  private grain: ShaderPass
  private bloom: UnrealBloomPass
  private enabled = true

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) {
    this.composer = new EffectComposer(renderer)
    this.composer.addPass(new RenderPass(scene, camera))

    const size = new THREE.Vector2()
    renderer.getSize(size)
    this.bloom = new UnrealBloomPass(size.clone(), 0.16, 0.5, 0.88)
    this.composer.addPass(this.bloom)

    this.grain = new ShaderPass(vignetteGrainShader)
    this.composer.addPass(this.grain)
  }

  setSize(w: number, h: number) {
    this.composer.setSize(w, h)
    this.bloom.resolution.set(w, h)
  }

  setEnabled(on: boolean) {
    this.enabled = on
  }

  render(timeSec: number) {
    if (!this.enabled) return false
    this.grain.uniforms.uTime.value = timeSec
    this.composer.render()
    return true
  }

  dispose() {
    this.composer.dispose()
  }
}
