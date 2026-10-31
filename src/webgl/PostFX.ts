import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { vignetteGrainShader } from "./shaders/vignetteGrain.frag"

/**
 * Museum canvas post stack: RenderPass → bloom-lite → custom vignette/grain GLSL.
 * Pass 7: subtle postFX preferred in 展厅模式; reading mode keeps stack but softer
 * so Pass 5b visibility does not regress.
 */
export class PostFX {
  readonly composer: EffectComposer
  private grain: ShaderPass
  private bloom: UnrealBloomPass
  private enabled = true
  private museumMode = false

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) {
    this.composer = new EffectComposer(renderer)
    this.composer.addPass(new RenderPass(scene, camera))

    const size = new THREE.Vector2()
    renderer.getSize(size)
    // Keep bloom tiny — heavy bloom crushed museum midtones to a black void
    this.bloom = new UnrealBloomPass(size.clone(), 0.048, 0.42, 0.9)
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

  /** 展厅模式 = richer grain/bloom; 阅读 = subdued (visibility first) */
  setViewMode(mode: "reading" | "museum") {
    this.museumMode = mode === "museum"
    this.applyLook()
  }

  /** Soften bloom/vignette while portals are fully lit — keep GLSL visible, not crushing */
  setPortalMode(on: boolean) {
    if (on) {
      // Pass 8: keep grain visible but never crush midtones in portals
      this.bloom.strength = this.museumMode ? 0.055 : 0.03
      if (this.grain.uniforms.uVignette) {
        this.grain.uniforms.uVignette.value = this.museumMode ? 0.16 : 0.12
      }
      if (this.grain.uniforms.uGrain) {
        this.grain.uniforms.uGrain.value = this.museumMode ? 0.055 : 0.028
      }
      if (this.grain.uniforms.uWarm) {
        this.grain.uniforms.uWarm.value = this.museumMode ? 0.055 : 0.035
      }
    } else {
      this.applyLook()
    }
  }

  private applyLook() {
    this.bloom.strength = this.museumMode ? 0.06 : 0.03
    if (this.grain.uniforms.uVignette) {
      this.grain.uniforms.uVignette.value = this.museumMode ? 0.36 : 0.24
    }
    if (this.grain.uniforms.uGrain) {
      this.grain.uniforms.uGrain.value = this.museumMode ? 0.07 : 0.03
    }
    if (this.grain.uniforms.uWarm) {
      this.grain.uniforms.uWarm.value = this.museumMode ? 0.05 : 0.03
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
