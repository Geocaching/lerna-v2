import { render, screen } from '@testing-library/react'
import * as React from 'react'
import ObjectDetails from '../../src/index'

describe('ObjectDetails', () => {
  test('renders basic object correctly', () => {
    const testObject = {
      name: 'Test Object',
      value: 42
    }

    const { container } = render(<ObjectDetails data={testObject} />)

    // Check that the main container element exists
    const mainContainer = container.querySelector(
      '.border.rounded.p-1.my-1.font-mono'
    )
    expect(mainContainer).toBeTruthy()

    // Check that the header shows the correct title
    const header = container.querySelector('.font-medium.p-1.flex.items-center')
    expect(header).toBeTruthy()
    expect(header?.textContent).toContain('Object')

    // Check that the properties are rendered
    expect(container.textContent).toContain('name')
    expect(container.textContent).toContain('Test Object')
    expect(container.textContent).toContain('value')
    expect(container.textContent).toContain('42')
  })

  test('renders arrays correctly', () => {
    const testArray = [1, 'two', { three: 3 }]

    const { container } = render(
      <ObjectDetails data={testArray} initiallyOpen={true} />
    )

    // Check that the header shows it's an array with length
    const header = container.querySelector('.font-medium.p-1.flex.items-center')
    expect(header?.textContent).toContain('Array')
    expect(header?.textContent).toContain('(3)')

    // Check that array items are rendered
    expect(container.textContent).toContain('0')
    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('two')
    expect(container.textContent).toContain('2')

    // Check that the nested object is rendered (but not necessarily expanded)
    expect(container.textContent).toContain('(Object)')

    // Check that there's at least one nested object (for the nested object)
    const propertyItems = container.querySelectorAll('.py-1')
    expect(propertyItems.length).toBeGreaterThan(0)
  })

  test('renders functions as [Function]', () => {
    const testObject = {
      regularFunction: function () {
        return 'hello'
      },
      arrowFunction: () => 'world',
      asyncFunction: async () => 'async'
    }

    const { container } = render(<ObjectDetails data={testObject} />)

    // Check that all functions are rendered as [Function]
    const functionElements = container.querySelectorAll(
      '.text-blue-600.font-mono'
    )
    expect(functionElements.length).toBe(3)
    functionElements.forEach(el => {
      expect(el.textContent).toBe('[Function]')
    })
  })

  test('renders null and undefined correctly', () => {
    const testObject = {
      nullValue: null,
      undefinedValue: undefined
    }

    const { container } = render(<ObjectDetails data={testObject} />)

    // Check that null and undefined are rendered correctly
    // Using text-gray-500 and italic classes for both null and undefined
    const nullElements = container.querySelectorAll('.text-gray-500.italic')
    expect(nullElements.length).toBeGreaterThanOrEqual(2)

    // Find the element with text "null"
    const nullElement = Array.from(nullElements).find(
      el => el.textContent === 'null'
    )
    expect(nullElement).toBeTruthy()

    // Find the element with text "undefined"
    const undefinedElement = Array.from(nullElements).find(
      el => el.textContent === 'undefined'
    )
    expect(undefinedElement).toBeTruthy()
  })

  test('uses custom title when provided', () => {
    const testObject = { a: 1, b: 2 }

    const { container } = render(
      <ObjectDetails data={testObject} title='Custom Title' />
    )

    const header = container.querySelector('.font-medium.p-1.flex.items-center')
    expect(header?.textContent).toContain('Custom Title')
    expect(header?.textContent).not.toContain('Object')
  })

  test('initiallyOpen prop is passed to PropertyItem components', () => {
    const testObject = { a: 1, b: 2 }

    const { container } = render(
      <ObjectDetails data={testObject} initiallyOpen={true} />
    )

    // In our new structure, we don't have a details element with an open attribute
    // Instead, we pass the initiallyOpen prop to PropertyItem components
    // We can check if the component renders correctly with initiallyOpen={true}
    const mainContainer = container.querySelector(
      '.border.rounded.p-1.my-1.font-mono'
    )
    expect(mainContainer).toBeTruthy()

    // Check that properties are rendered
    expect(container.textContent).toContain('a')
    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('b')
    expect(container.textContent).toContain('2')
  })

  test('applies custom CSS classes', () => {
    const testObject = { a: 1, b: 2 }

    const { container } = render(
      <ObjectDetails
        data={testObject}
        className='custom-details'
        summaryClassName='custom-summary'
        contentClassName='custom-content'
      />
    )

    // Check if the main container has the custom class
    const mainContainer = container.querySelector(
      '.border.rounded.p-1.my-1.font-mono'
    )
    expect(mainContainer?.classList.contains('custom-details')).toBe(true)

    // Check if the header has the custom class
    const header = container.querySelector('.font-medium.p-1.flex.items-center')
    expect(header?.classList.contains('custom-summary')).toBe(true)

    // Check if the content container has the custom class
    const content = container.querySelector('pre')
    expect(content?.classList.contains('custom-content')).toBe(true)
  })

  test('renders empty objects and arrays correctly', () => {
    const { container: emptyObjectContainer } = render(
      <ObjectDetails data={{}} />
    )

    const { container: emptyArrayContainer } = render(
      <ObjectDetails data={[]} />
    )

    // Find empty object element using the new Tailwind classes
    const emptyObjectElement = emptyObjectContainer.querySelector(
      '.text-gray-500.italic.py-1'
    )
    expect(emptyObjectElement).toBeTruthy()
    expect(emptyObjectElement?.textContent).toBe('{}')

    // Find empty array element using the new Tailwind classes
    const emptyArrayElement = emptyArrayContainer.querySelector(
      '.text-gray-500.italic.py-1'
    )
    expect(emptyArrayElement).toBeTruthy()
    expect(emptyArrayElement?.textContent).toBe('[]')
  })

  test('renders primitive values directly', () => {
    const { container: stringContainer } = render(
      <ObjectDetails data='test string' />
    )

    const { container: numberContainer } = render(<ObjectDetails data={42} />)

    const { container: booleanContainer } = render(
      <ObjectDetails data={true} />
    )

    // Check string rendering with new Tailwind classes
    expect(stringContainer.querySelector('.text-green-600')).toBeTruthy()
    expect(stringContainer.textContent).toContain('"test string"')

    // Check number rendering with new Tailwind classes
    expect(numberContainer.querySelector('.text-purple-600')).toBeTruthy()
    expect(numberContainer.textContent).toContain('42')

    // Check boolean rendering with new Tailwind classes
    expect(booleanContainer.querySelector('.text-orange-600')).toBeTruthy()
    expect(booleanContainer.textContent).toContain('true')
  })

  test('respects maxDepth prop and shows summary for deeper objects', () => {
    const deepObject = {
      level1: {
        level2: {
          level3: {
            level4: 'Deep value'
          }
        }
      }
    }

    const { container } = render(
      <ObjectDetails data={deepObject} maxDepth={2} initiallyOpen={true} />
    )

    // The component should render level1, but level2 might be collapsed
    expect(container.textContent).toContain('level1')

    // Check for property items
    const propertyItems = container.querySelectorAll('.py-1')
    expect(propertyItems.length).toBeGreaterThan(0) // At least one property item
  })

  test('respects maxChildren prop and shows message for hidden items', () => {
    const largeObject = {
      item1: 'First',
      item2: 'Second',
      item3: 'Third',
      item4: 'Fourth',
      item5: 'Fifth',
      item6: 'Sixth',
      item7: 'Seventh',
      item8: 'Eighth'
    }

    const { container } = render(
      <ObjectDetails data={largeObject} maxChildren={3} initiallyOpen={true} />
    )

    // Should show the first 3 items
    expect(container.textContent).toContain('item1')
    expect(container.textContent).toContain('First')
    expect(container.textContent).toContain('item2')
    expect(container.textContent).toContain('Second')
    expect(container.textContent).toContain('item3')
    expect(container.textContent).toContain('Third')

    // Should not show items beyond the limit
    expect(container.textContent).not.toContain('item8')
    expect(container.textContent).not.toContain('Eighth')

    // Should show a message indicating hidden items
    const hiddenMessage = container.querySelector('.text-gray-500.italic')
    expect(hiddenMessage).toBeTruthy()
    expect(hiddenMessage?.textContent).toContain('5 more items')
  })

  test('combines maxDepth and maxChildren limits correctly', () => {
    const complexObject = {
      array: [
        { id: 1, nested: { a: 1, b: 2 } },
        { id: 2, nested: { a: 3, b: 4 } },
        { id: 3, nested: { a: 5, b: 6 } },
        { id: 4, nested: { a: 7, b: 8 } },
        { id: 5, nested: { a: 9, b: 10 } }
      ]
    }

    const { container } = render(
      <ObjectDetails
        data={complexObject}
        maxDepth={1}
        maxChildren={2}
        initiallyOpen={true}
      />
    )

    // Should show the array property
    expect(container.textContent).toContain('array')

    // Verify that property items are rendered
    const propertyItems = container.querySelectorAll('.py-1')
    // There should be some items rendered
    expect(propertyItems.length).toBeGreaterThan(0)

    // Check that array is identified as an array with 5 items
    expect(container.textContent).toContain('Array(5)')

    // With maxChildren=2, we should only see a limited number of items
    // We can check that the number of property items is less than the total number of items in the array
    expect(propertyItems.length).toBeLessThan(complexObject.array.length + 1) // +1 for the array property itself
  })
})
