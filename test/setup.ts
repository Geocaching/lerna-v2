import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
})

;(globalThis as any).window = dom.window as any
;(globalThis as any).document = dom.window.document
;(globalThis as any).navigator = dom.window.navigator
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis)) {
    ;(globalThis as any)[key] = (dom.window as any)[key]
  }
}

if (!(globalThis as any).ResizeObserver) {
  const Polyfill = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  ;(globalThis as any).ResizeObserver = Polyfill
  ;(globalThis as any).window.ResizeObserver = Polyfill
}
