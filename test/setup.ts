// noinspection JSUnusedGlobalSymbols

import '@testing-library/jest-dom'

let errorSpy: jest.SpyInstance | undefined
let originalError: typeof console.error

beforeEach(() => {
  originalError = console.error
  const WARNING_PATTERN = /The tag <.*> is unrecognized.*(primitive|group)/;
  errorSpy = jest.spyOn(console, 'error').mockImplementation((...args) => {
    const message = `${args[0]} ${args[1]}`;
    if (WARNING_PATTERN.test(message)) {
      return;
    }
    originalError(...args);
  });
})

afterEach(() => {
  errorSpy?.mockRestore()
})

// jsdom requires TextEncoder/TextDecoder in a global scope before importing jsdom
;(globalThis as any).TextEncoder =
  (globalThis as any).TextEncoder || require('util').TextEncoder
;(globalThis as any).TextDecoder =
  (globalThis as any).TextDecoder || require('util').TextDecoder

import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', {
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

// Add Canvas and WebGL polyfills
if (!(globalThis as any).HTMLCanvasElement.prototype.getContext) {
  ;(globalThis as any).HTMLCanvasElement.prototype.getContext = function (
    contextType: string
  ) {
    if (contextType === '2d') {
      return {
        fillRect: () => {},
        clearRect: () => {},
        getImageData: (_x: number, _y: number, w: number, h: number) => ({
          data: new Array(w * h * 4)
        }),
        putImageData: () => {},
        createImageData: () => ({ data: [] }),
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        restore: () => {},
        scale: () => {},
        rotate: () => {},
        translate: () => {},
        transform: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        arc: () => {},
        fillText: () => {},
        strokeText: () => {}
      }
    } else if (
      contextType === 'webgl' ||
      contextType === 'experimental-webgl'
    ) {
      // Mock WebGL context with required methods for Three.js
      return {
        canvas: this,
        getExtension: () => ({}),
        createBuffer: () => ({}),
        bindBuffer: () => {},
        bufferData: () => {},
        enable: () => {},
        disable: () => {},
        blendFunc: () => {},
        depthFunc: () => {},
        clearColor: () => {},
        clearDepth: () => {},
        clear: () => {},
        viewport: () => {},
        getShaderPrecisionFormat: () => ({
          precision: 1,
          rangeMin: 1,
          rangeMax: 1
        }),
        createProgram: () => ({
          name: 'program'
        }),
        createShader: () => ({}),
        shaderSource: () => {},
        compileShader: () => {},
        getShaderParameter: () => true,
        attachShader: () => {},
        linkProgram: () => {},
        getProgramParameter: () => true,
        useProgram: () => {},
        getUniformLocation: () => ({}),
        getAttribLocation: () => 0,
        vertexAttribPointer: () => {},
        enableVertexAttribArray: () => {},
        uniform1i: () => {},
        uniform1f: () => {},
        uniform2f: () => {},
        uniform3f: () => {},
        uniform4f: () => {},
        uniform1iv: () => {},
        uniform2iv: () => {},
        uniform3iv: () => {},
        uniform4iv: () => {},
        uniform1fv: () => {},
        uniform2fv: () => {},
        uniform3fv: () => {},
        uniform4fv: () => {},
        uniformMatrix2fv: () => {},
        uniformMatrix3fv: () => {},
        uniformMatrix4fv: () => {},
        drawArrays: () => {},
        drawElements: () => {}
      }
    }
    return null
  }

  // Add toDataURL method to canvas for image conversion
  ;(globalThis as any).HTMLCanvasElement.prototype.toDataURL = function () {
    return 'data:image/png;base64,dummy-image-data'
  }

  // WebGLRenderingContext constructor
  ;(globalThis as any).WebGLRenderingContext = function () {}
}
