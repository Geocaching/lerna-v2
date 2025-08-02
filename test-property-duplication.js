// This is a test script to verify that property names are not duplicated
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ObjectDetails =
  require('./packages/object-details/dist/index.cjs').default

// Create a test object with nested properties
const testObject = {
  nestedObject: {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      zipCode: 12345
    }
  }
}

// Render the component to HTML
const html = ReactDOMServer.renderToString(
  React.createElement(ObjectDetails, { data: testObject, initiallyOpen: true })
)

// Output the HTML to see the structure
console.log(html)
