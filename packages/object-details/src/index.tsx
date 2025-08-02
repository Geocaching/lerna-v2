import React, { useState, useEffect } from 'react'

/**
 * Custom hook to detect dark mode
 * Checks if the component is rendered in dark mode by looking for a 'dark' class
 * on the document or any ancestor element
 */
const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Function to check if dark mode is active
    const checkDarkMode = () => {
      // Check if document has 'dark' class
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    checkDarkMode()

    // Set up a mutation observer to detect changes to the class list
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Clean up observer on unmount
    return () => observer.disconnect()
  }, [])

  return isDarkMode
}

/**
 * Component for rendering a single property with collapsible functionality
 * for nested objects and arrays
 */
interface PropertyItemProps {
  propertyKey: string
  propertyValue: any
  level: number
  maxDepth?: number
}

const PropertyItem: React.FC<PropertyItemProps> = ({
  propertyKey,
  propertyValue,
  level,
  maxDepth = Infinity
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isNestedObject =
    propertyValue !== null &&
    propertyValue !== undefined &&
    typeof propertyValue === 'object'

  // Determine the type of the value
  let typeLabel = ''
  if (isNestedObject) {
    typeLabel = Array.isArray(propertyValue)
      ? `Array(${propertyValue.length})`
      : propertyValue.constructor.name || 'Object'
  }

  // Check if it's an empty array
  const isEmptyArray =
    Array.isArray(propertyValue) && propertyValue.length === 0

  // Handle toggle for nested objects
  const handleToggle = () => {
    if (isNestedObject) {
      setIsOpen(!isOpen)
    }
  }

  // Check if we've reached the maximum depth
  if (isNestedObject && level >= maxDepth) {
    const itemCount = Array.isArray(propertyValue)
      ? propertyValue.length
      : Object.keys(propertyValue).length
    const itemText = itemCount === 1 ? 'item' : 'items'

    return (
      <div className='py-1'>
        {'     '.repeat(level)}
        <span
          className='font-semibold text-cyan-600 text-[#0891b2] cursor-pointer'
          onClick={handleToggle}
        >
          {propertyKey}:
        </span>{' '}
        <span className='text-gray-500 text-[#6b7280]'>({typeLabel})</span>{' '}
        <code className='text-gray-500 text-[#6b7280] italic font-mono'>
          {Array.isArray(propertyValue) ? '[' : '{'} {itemCount} {itemText}{' '}
          {Array.isArray(propertyValue) ? ']' : '}'}
        </code>
      </div>
    )
  }

  return (
    <div className='py-1'>
      {'     '.repeat(level)}
      <span
        className={`font-semibold text-cyan-600 text-[#0891b2] ${isNestedObject ? 'cursor-pointer' : ''}`}
        onClick={isNestedObject ? handleToggle : undefined}
      >
        {propertyKey}:
      </span>{' '}
      {isNestedObject && !isEmptyArray && (
        <span className='text-gray-500 text-[#6b7280]'>({typeLabel})</span>
      )}
      {/* Render the value */}
      {isNestedObject ? (
        <>
          {/* Show content based on type */}
          {!Array.isArray(propertyValue) &&
          Object.keys(propertyValue).length === 0 ? (
            <span className='text-gray-500 text-[#6b7280] italic py-1'>
              {'{}'}
            </span>
          ) : Array.isArray(propertyValue) && propertyValue.length === 0 ? (
            <span className='text-gray-500 text-[#6b7280] italic py-1'>[]</span>
          ) : (
            <>
              {/* Show opening bracket and content if not empty */}
              <span>
                {!isOpen
                  ? Array.isArray(propertyValue)
                    ? '[...]'
                    : '{...}'
                  : Array.isArray(propertyValue)
                    ? '['
                    : '{'}
              </span>

              {/* Show content if open */}
              {isOpen && (
                <div>
                  {Array.isArray(propertyValue)
                    ? // Render array items
                      propertyValue.map((item, index) => (
                        <PropertyItem
                          key={index}
                          propertyKey={String(index)}
                          propertyValue={item}
                          level={level + 1}
                          maxDepth={maxDepth}
                        />
                      ))
                    : // Render object properties
                      Object.entries(propertyValue).map(([key, value]) => (
                        <PropertyItem
                          key={key}
                          propertyKey={key}
                          propertyValue={value}
                          level={level + 1}
                          maxDepth={maxDepth}
                        />
                      ))}

                  {/* Show closing bracket */}
                  <div>
                    {'     '.repeat(level)}
                    <span>{Array.isArray(propertyValue) ? ']' : '}'}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        // Render primitive values
        <ValueRenderer
          value={propertyValue}
          level={level}
          maxDepth={maxDepth}
        />
      )}
    </div>
  )
}

interface ObjectDetailsProps {
  /**
   * The object to display in a collapsible format
   */
  data: any
  /**
   * Optional custom title to display in the summary element
   * If not provided, will use the object's constructor name or "Object"
   */
  title?: string
  /**
   * Whether the details element should be initially open
   * @default false
   */
  initiallyOpen?: boolean
  /**
   * Custom CSS class name for the details element
   */
  className?: string
  /**
   * Custom CSS class name for the summary element
   */
  summaryClassName?: string
  /**
   * Custom CSS class name for the content container
   */
  contentClassName?: string
  /**
   * Maximum depth of nested objects to display
   * @default Infinity
   */
  maxDepth?: number
  /**
   * Maximum number of children to display
   * @default Infinity
   */
  maxChildren?: number
  /**
   * Current nesting level for indentation (internal use)
   * @default 0
   */
  level?: number
}

/**
 * Renders a primitive value based on its type
 * - Functions are rendered as [Function]
 * - Null and undefined are rendered as text
 * - Strings, numbers, and booleans are rendered with appropriate styling
 *
 * @param props - Component properties
 * @param props.value - The primitive value to render
 * @param props.level - Current nesting level for indentation
 * @param props.maxDepth - Maximum depth of nested objects to display
 * @returns React component that renders the primitive value
 */
const ValueRenderer: React.FC<{
  value: any
  level?: number
  maxDepth?: number
}> = ({ value, level = 0, maxDepth = Infinity }) => {
  // Handle null and undefined
  if (value === null) {
    return (
      <code className='text-gray-500 text-[#6b7280] italic font-mono'>
        null
      </code>
    )
  }
  if (value === undefined) {
    return (
      <code className='text-gray-500 text-[#6b7280] italic font-mono'>
        undefined
      </code>
    )
  }

  // Handle functions
  if (typeof value === 'function') {
    return (
      <code className='text-blue-600 text-[#2563eb] font-mono'>[Function]</code>
    )
  }

  // Handle primitive values
  let colorClass
  let tailwindClass
  if (typeof value === 'string') {
    colorClass = 'text-[#16a34a]'
    tailwindClass = 'text-green-600'
  } else if (typeof value === 'number') {
    colorClass = 'text-[#9333ea]'
    tailwindClass = 'text-purple-600'
  } else if (typeof value === 'boolean') {
    colorClass = 'text-[#ea580c]'
    tailwindClass = 'text-orange-600'
  } else {
    colorClass = 'text-[#374151]'
    tailwindClass = 'text-gray-700'
  }

  return (
    <code className={`${tailwindClass} ${colorClass} font-mono`}>
      {typeof value === 'string' ? `"${value}"` : String(value)}
    </code>
  )
}

/**
 * Component for displaying objects in a collapsible format using HTML details/summary elements
 * Recursively renders nested objects and arrays, and represents functions as [Function]
 *
 * @component
 * @example
 * // Basic usage
 * <ObjectDetails data={{ name: "John", age: 30, greet: () => console.log("Hello") }} />
 *
 * // With custom title and initially open
 * <ObjectDetails
 *   data={{ name: "John", age: 30 }}
 *   title="User Information"
 *   initiallyOpen={true}
 * />
 *
 * @param props - Component properties
 * @returns React component that renders a collapsible representation of the object
 */
const ObjectDetails: React.FC<ObjectDetailsProps> = ({
  data,
  title,
  initiallyOpen = false,
  className = '',
  summaryClassName = '',
  contentClassName = '',
  maxDepth = Infinity,
  maxChildren = Infinity,
  level = 0
}) => {
  // Determine the display title
  const displayTitle =
    title ||
    (Array.isArray(data) ? 'Array' : data?.constructor?.name || 'Object')

  // Handle non-object data
  if (data === null || data === undefined || typeof data !== 'object') {
    return <ValueRenderer value={data} level={level} maxDepth={maxDepth} />
  }

  // Get entries for rendering
  const allEntries = Array.isArray(data)
    ? data.map((item, index) => [String(index), item])
    : Object.entries(data)

  // Apply maxChildren limit
  const entries = allEntries.slice(0, maxChildren)
  const hiddenCount = allEntries.length - entries.length

  const isDarkMode = useDarkMode()

  return (
    <div className={`border rounded p-1 my-1 font-mono ${className}`}>
      <div className={`font-medium p-1 flex items-center ${summaryClassName}`}>
        {displayTitle}
        {Array.isArray(data) && data.length > 0 && ` (${data.length})`}
      </div>
      <pre className={`${contentClassName}`}>
        {entries.length === 0 ? (
          <div className='text-gray-500 text-[#6b7280] italic py-1'>
            {Array.isArray(data) ? '[]' : '{}'}
          </div>
        ) : (
          <>
            <div>{'{'}</div>
            {entries.map(([key, value]) => (
              <PropertyItem
                key={key}
                propertyKey={key}
                propertyValue={value}
                level={1}
                maxDepth={maxDepth}
              />
            ))}
            {hiddenCount > 0 && (
              <div className='text-gray-500 text-[#6b7280] italic py-1'>
                {'     '}
                ... {hiddenCount} more {hiddenCount === 1 ? 'item' : 'items'}{' '}
                ...
              </div>
            )}
            <div>{'}'}</div>
          </>
        )}
      </pre>
    </div>
  )
}

export default ObjectDetails
