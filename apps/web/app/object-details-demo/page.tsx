'use client'

import React, { useState, useEffect } from 'react'
import ObjectDetails from '@/packages/object-details/src'

// Sample data with various types
const sampleData = {
  string: 'Hello, world!',
  number: 42,
  boolean: true,
  null: null,
  undefined: undefined,
  function: function () {
    console.log('Hello!')
  },
  arrowFunction: () => console.log('Arrow function'),
  asyncFunction: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
  },
  array: [1, 'two', { three: 3 }, [4, 5]],
  nestedObject: {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      zipCode: 12345
    },
    hobbies: ['reading', 'hiking', 'coding']
  },
  emptyObject: {},
  emptyArray: []
}

export default function ObjectDetailsDemo() {
  const [darkMode, setDarkMode] = useState(false)

  // Update the HTML class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className='min-h-screen p-[12px] bg-white dark:bg-gray-900 transition-colors duration-200'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            ObjectDetails Component Demo
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
          >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>

        <div className='space-y-8'>
          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Sample Object
            </h2>
            <div className='dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails data={sampleData} initiallyOpen={true} />
            </div>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Primitive Values
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
                  String
                </h3>
                <ObjectDetails data='This is a string value' />
              </div>
              <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
                  Number
                </h3>
                <ObjectDetails data={123.456} />
              </div>
              <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
                  Boolean
                </h3>
                <ObjectDetails data={true} />
              </div>
              <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
                  Null
                </h3>
                <ObjectDetails data={null} />
              </div>
            </div>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Arrays
            </h2>
            <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails
                data={[
                  1,
                  'two',
                  { three: 3 },
                  [4, 5],
                  null,
                  undefined,
                  () => {}
                ]}
                initiallyOpen={true}
              />
            </div>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Custom Title
            </h2>
            <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails
                data={{ id: 1, name: 'Custom Title Example', value: 42 }}
                title='User Configuration'
                initiallyOpen={true}
              />
            </div>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Limited Depth (maxDepth)
            </h2>
            <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails
                data={{
                  level1: {
                    level2: {
                      level3: {
                        level4: {
                          level5: "This won't be shown as a nested object"
                        }
                      }
                    }
                  },
                  anotherProperty: 'This is at level 1'
                }}
                maxDepth={2}
                initiallyOpen={true}
              />
            </div>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              This example limits the nesting depth to 2 levels. Deeper objects
              show a summary instead of expanding.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Limited Children (maxChildren)
            </h2>
            <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails
                data={{
                  item1: 'First item',
                  item2: 'Second item',
                  item3: 'Third item',
                  item4: 'Fourth item',
                  item5: 'Fifth item',
                  item6: 'Sixth item',
                  item7: 'Seventh item',
                  item8: 'Eighth item',
                  item9: 'Ninth item',
                  item10: 'Tenth item'
                }}
                maxChildren={5}
                initiallyOpen={true}
              />
            </div>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              This example limits the number of children displayed to 5.
              Additional items are summarized.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
              Combined Limits
            </h2>
            <div className='border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
              <ObjectDetails
                data={[
                  {
                    id: 1,
                    name: 'Item 1',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  {
                    id: 2,
                    name: 'Item 2',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  {
                    id: 3,
                    name: 'Item 3',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  {
                    id: 4,
                    name: 'Item 4',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  {
                    id: 5,
                    name: 'Item 5',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  {
                    id: 6,
                    name: 'Item 6',
                    details: { a: 1, b: 2, c: 3, d: 4 }
                  },
                  { id: 7, name: 'Item 7', details: { a: 1, b: 2, c: 3, d: 4 } }
                ]}
                maxDepth={1}
                maxChildren={3}
                initiallyOpen={true}
              />
            </div>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              This example combines both limits: maximum depth of 1 and maximum
              of 3 children displayed.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
