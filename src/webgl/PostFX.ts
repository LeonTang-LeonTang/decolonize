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
    // Pass5b: bloom tiny — heavy bloom crushed museum midtones to a black void
    this.bloom = new UnrealBloomPass(size.clone(), 0.04, 0.4, 0.92)
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

  /** Soften bloom/vignette while portals are fully lit — keep GLSL visible, not crushing */
  setPortalMode(on: boolean) {
    this.bloom.strength = on ? 0.025 : 0.05
    if (this.grain.uniforms.uVignette) {
      this.grain.uniforms.uVignette.value = on ? 0.28 : 0.55
    }
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
