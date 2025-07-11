import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

// Polyfill ReactDOM.render for React 18+/19 so @testing-library/react-hooks works
if (!(ReactDOM as any).render) {
  ;(ReactDOM as any).render = (
    element: React.ReactElement,
    container: Element
  ) => {
    const root = (container as any).__root ?? createRoot(container)
    root.render(element)
    ;(container as any).__root = root
    return root
  }
  ;(ReactDOM as any).unmountComponentAtNode = (container: Element) => {
    const root = (container as any).__root
    if (root) root.unmount()
  }
}
