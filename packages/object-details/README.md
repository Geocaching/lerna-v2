# Object Details Component

A React component that creates a collapsible representation of JavaScript objects using the HTML `<details>` and `<summary>` elements.

## Features

- Displays objects in a collapsible tree structure
- Shows curly braces for objects and square brackets for arrays
- Uses monospaced font for better code readability
- Recursively renders nested objects and arrays
- Represents functions as `[Function]`
- Supports light and dark mode with Tailwind CSS
- Customizable styling through CSS classes
- TypeScript support with full type definitions

## Installation

```bash
# Using npm
npm install @geocaching/object-details

# Using yarn
yarn add @geocaching/object-details

# Using bun
bun add @geocaching/object-details
```

## Usage

```jsx
import ObjectDetails from '@geocaching/object-details';

// Basic usage
function ExampleComponent() {
  const data = {
    name: "John Doe",
    age: 30,
    isActive: true,
    address: {
      street: "123 Main St",
      city: "Anytown",
      zipCode: 12345
    },
    hobbies: ["reading", "hiking", "coding"],
    greet: function() { console.log("Hello!"); }
  };

  return <ObjectDetails data={data} />;
}

// With custom title and initially open
function CustomTitleExample() {
  const user = {
    id: 1,
    username: "johndoe",
    email: "john@example.com"
  };

  return (
    <ObjectDetails 
      data={user} 
      title="User Information" 
      initiallyOpen={true} 
    />
  );
}

// With custom styling
function StyledExample() {
  const config = {
    apiKey: "abc123",
    timeout: 5000,
    debug: false
  };

  return (
    <ObjectDetails 
      data={config} 
      className="bg-blue-50 dark:bg-blue-900"
      summaryClassName="text-blue-800 dark:text-blue-200"
      contentClassName="border-blue-300 dark:border-blue-700"
    />
  );
}

// Dark mode toggle example
function DarkModeExample() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      
      <ObjectDetails 
        data={{ 
          name: "Example Object", 
          nested: { a: 1, b: 2 },
          array: [1, 2, 3]
        }} 
        initiallyOpen={true} 
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any` | (required) | The object to display in a collapsible format |
| `title` | `string` | Object's constructor name or "Object" | Custom title to display in the summary element |
| `initiallyOpen` | `boolean` | `false` | Whether the details element should be initially open |
| `maxDepth` | `number` | `Infinity` | Maximum depth of nested objects to display |
| `maxChildren` | `number` | `Infinity` | Maximum number of children to display |
| `className` | `string` | `''` | Custom CSS class name for the details element |
| `summaryClassName` | `string` | `''` | Custom CSS class name for the summary element |
| `contentClassName` | `string` | `''` | Custom CSS class name for the content container |

### Dark Mode Support
The component automatically adapts to dark mode when the parent HTML element has the `dark` class. You can toggle dark mode with JavaScript:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
```

## License

UNLICENSED