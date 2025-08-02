// This is a temporary test script to verify the formatting of nested objects
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ObjectDetails =
  require('./packages/object-details/dist/index.cjs').default

// Create a nested object for testing
const testObject = {
  level1: {
    level2: {
      level3: { value: 'test' }
    }
  }
}

// Render the component to HTML
const html = ReactDOMServer.renderToString(
  React.createElement(ObjectDetails, { data: testObject, initiallyOpen: true })
)

// Output the HTML to see the structure
console.log(html)
