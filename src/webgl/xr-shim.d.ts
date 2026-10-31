interface XRSystem {
  isSessionSupported(mode: string): Promise<boolean>
  requestSession(mode: string, options?: object): Promise<XRSession>
}
interface Navigator {
  xr?: XRSystem
}
interface XRSession extends EventTarget {
  end(): Promise<void>
}
