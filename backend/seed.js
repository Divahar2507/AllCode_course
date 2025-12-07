const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/allcode';

const seedCourses = [
    {
        title: 'HTML5',
        mentor: 'AllCode Team',
        description: 'Master the skeleton of the web.',
        time: '09:00 AM - 11:00 AM',
        status: 'In Progress',
        type: 'live',
        accentColor: '#E34F26',
        startDate: 'June 1, 2025',
        progress: 0,
        modules: [
            {
                title: 'Introduction to HTML',
                topics: [
                    { title: 'What is HTML?', type: 'video', note: 'Key Topics Covered:\n- Introduction to HTML\n- Understanding the core concepts.\n- Practical application.', content: '## Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup.' },
                    { title: 'HTML Document Structure', type: 'doc', note: 'Key Topics Covered:\n- HTML Document Structure\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Document Structure\n\nEvery HTML document follows a basic structure:\n- DOCTYPE declaration\n- html element\n- head section (metadata)\n- body section (visible content)' },
                    { title: 'HTML Tags and Elements', type: 'video', note: 'Key Topics Covered:\n- HTML Tags\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Tags\n\nHTML tags are the building blocks:\n- Opening tags: <tagname>\n- Closing tags: </tagname>\n- Self-closing tags: <br />' },
                    { title: 'HTML Attributes', type: 'doc', note: 'Key Topics Covered:\n- HTML Attributes\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Attributes\n\nAttributes provide additional information about elements:\n- id, class, style\n- src, href, alt\n- data-* attributes' }
                ]
            },
            {
                title: 'Text Formatting and Structure',
                topics: [
                    { title: 'Headings and Paragraphs', type: 'video', note: 'Key Topics Covered:\n- Headings and Paragraphs\n- Understanding the core concepts.\n- Practical application.', content: '## Headings and Paragraphs\n\nHTML provides six levels of headings (h1-h6) and paragraph tags for text structure.' },
                    { title: 'Lists: Ordered and Unordered', type: 'doc', note: 'Key Topics Covered:\n- HTML Lists\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Lists\n\n- Unordered lists (ul, li)\n- Ordered lists (ol, li)\n- Description lists (dl, dt, dd)' },
                    { title: 'Text Formatting Tags', type: 'video', note: 'Key Topics Covered:\n- Text Formatting\n- Understanding the core concepts.\n- Practical application.', content: '## Text Formatting\n\nBold, italic, underline, mark, small, del, ins, sub, sup tags for text styling.' },
                    { title: 'Links and Navigation', type: 'doc', note: 'Key Topics Covered:\n- HTML Links\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Links\n\nAnchor tags (a) with href attribute for creating hyperlinks and navigation.' }
                ]
            },
            {
                title: 'HTML Forms and Input',
                topics: [
                    { title: 'Creating Forms', type: 'video', note: 'Key Topics Covered:\n- HTML Forms\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Forms\n\nForms collect user input using the form element with action and method attributes.' },
                    { title: 'Input Types', type: 'doc', note: 'Key Topics Covered:\n- Input Types\n- Understanding the core concepts.\n- Practical application.', content: '## Input Types\n\ntext, password, email, number, date, checkbox, radio, file, submit, button' },
                    { title: 'Form Validation', type: 'video', note: 'Key Topics Covered:\n- Form Validation\n- Understanding the core concepts.\n- Practical application.', content: '## Form Validation\n\nHTML5 provides built-in validation: required, pattern, min, max, minlength, maxlength' },
                    { title: 'Textarea and Select', type: 'doc', note: 'Key Topics Covered:\n- Advanced Form Elements\n- Understanding the core concepts.\n- Practical application.', content: '## Advanced Form Elements\n\ntextarea for multi-line input, select and option for dropdowns' }
                ]
            },
            {
                title: 'Multimedia and Graphics',
                topics: [
                    { title: 'Images in HTML', type: 'video', note: 'Key Topics Covered:\n- HTML Images\n- Understanding the core concepts.\n- Practical application.', content: '## HTML Images\n\nimg tag with src, alt, width, height attributes for displaying images.' },
                    { title: 'Audio and Video', type: 'doc', note: 'Key Topics Covered:\n- Multimedia\n- Understanding the core concepts.\n- Practical application.', content: '## Multimedia\n\naudio and video tags with controls, autoplay, loop attributes' },
                    { title: 'Canvas and SVG', type: 'video', note: 'Key Topics Covered:\n- Graphics\n- Understanding the core concepts.\n- Practical application.', content: '## Graphics\n\nCanvas for drawing graphics, SVG for scalable vector graphics' }
                ]
            },
            {
                title: 'Semantic HTML',
                topics: [
                    { title: 'Semantic Tags', type: 'doc', note: 'Key Topics Covered:\n- Semantic HTML\n- Understanding the core concepts.\n- Practical application.', content: '## Semantic HTML\n\nheader, nav, main, article, section, aside, footer for meaningful structure' },
                    { title: 'Accessibility Best Practices', type: 'video', note: 'Key Topics Covered:\n- Web Accessibility\n- Understanding the core concepts.\n- Practical application.', content: '## Web Accessibility\n\nARIA attributes, alt text, semantic markup for accessible web content' },
                    { title: 'SEO Optimization', type: 'doc', note: 'Key Topics Covered:\n- SEO with HTML\n- Understanding the core concepts.\n- Practical application.', content: '## SEO with HTML\n\nMeta tags, title, headings hierarchy, structured data for search engines' }
                ]
            },
            {
                title: 'Advanced HTML',
                topics: [
                    { title: 'HTML5 APIs', type: 'video', note: 'Key Topics Covered:\n- HTML5 APIs\n- Understanding the core concepts.\n- Practical application.', content: '## HTML5 APIs\n\nGeolocation, Local Storage, Session Storage, Web Workers' },
                    { title: 'Responsive Images', type: 'doc', note: 'Key Topics Covered:\n- Responsive Images\n- Understanding the core concepts.\n- Practical application.', content: '## Responsive Images\n\npicture element, srcset attribute for responsive image loading' },
                    { title: 'HTML Best Practices', type: 'video', note: 'Key Topics Covered:\n- Best Practices\n- Understanding the core concepts.\n- Practical application.', content: '## Best Practices\n\nCode organization, indentation, comments, validation' }
                ]
            }
        ]
    },
    {
        title: 'CSS3',
        mentor: 'AllCode Team',
        description: 'Style your websites like a pro.',
        time: '11:00 AM - 01:00 PM',
        status: 'In Progress',
        type: 'live',
        accentColor: '#1572B6',
        startDate: 'June 15, 2025',
        progress: 0,
        modules: [
            {
                title: 'CSS Fundamentals',
                topics: [
                    { title: 'CSS Syntax and Selectors', type: 'video', note: 'Key Topics Covered:\n- CSS Basics\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Basics\n\nElement, class, ID, attribute, pseudo-class, pseudo-element selectors' },
                    { title: 'Colors and Backgrounds', type: 'doc', note: 'Key Topics Covered:\n- Colors in CSS\n- Understanding the core concepts.\n- Practical application.', content: '## Colors in CSS\n\nHex (#FF0000), RGB (255,0,0), RGBA, HSL, named colors, gradients' },
                    { title: 'Box Model', type: 'video', note: 'Key Topics Covered:\n- CSS Box Model\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Box Model\n\nContent, Padding, Border, Margin - understanding spacing' },
                    { title: 'Typography', type: 'doc', note: 'Key Topics Covered:\n- CSS Typography\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Typography\n\nfont-family, font-size, font-weight, line-height, text-align, text-decoration' }
                ]
            },
            {
                title: 'CSS Layout Techniques',
                topics: [
                    { title: 'Display Property', type: 'video', note: 'Key Topics Covered:\n- Display\n- Understanding the core concepts.\n- Practical application.', content: '## Display\n\nblock, inline, inline-block, none - controlling element display' },
                    { title: 'Position Property', type: 'doc', note: 'Key Topics Covered:\n- Positioning\n- Understanding the core concepts.\n- Practical application.', content: '## Positioning\n\nstatic, relative, absolute, fixed, sticky positioning' },
                    { title: 'Float and Clear', type: 'video', note: 'Key Topics Covered:\n- Float Layout\n- Understanding the core concepts.\n- Practical application.', content: '## Float Layout\n\nFloating elements and clearing floats for layout' },
                    { title: 'Z-Index and Stacking', type: 'doc', note: 'Key Topics Covered:\n- Stacking Context\n- Understanding the core concepts.\n- Practical application.', content: '## Stacking Context\n\nz-index for controlling element stacking order' }
                ]
            },
            {
                title: 'Flexbox Layout',
                topics: [
                    { title: 'Flexbox Basics', type: 'video', note: 'Key Topics Covered:\n- Flexbox\n- Understanding the core concepts.\n- Practical application.', content: '## Flexbox\n\nOne-dimensional layout system: flex container and flex items' },
                    { title: 'Flex Container Properties', type: 'doc', note: 'Key Topics Covered:\n- Container Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Container Properties\n\nflex-direction, justify-content, align-items, flex-wrap, align-content' },
                    { title: 'Flex Item Properties', type: 'video', note: 'Key Topics Covered:\n- Item Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Item Properties\n\nflex-grow, flex-shrink, flex-basis, align-self, order' },
                    { title: 'Flexbox Patterns', type: 'doc', note: 'Key Topics Covered:\n- Common Patterns\n- Understanding the core concepts.\n- Practical application.', content: '## Common Patterns\n\nCentering, equal heights, navigation bars, card layouts' }
                ]
            },
            {
                title: 'CSS Grid Layout',
                topics: [
                    { title: 'Grid Basics', type: 'video', note: 'Key Topics Covered:\n- CSS Grid\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Grid\n\nTwo-dimensional layout system for rows and columns' },
                    { title: 'Grid Container Properties', type: 'doc', note: 'Key Topics Covered:\n- Container Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Container Properties\n\ngrid-template-columns, grid-template-rows, gap, grid-template-areas' },
                    { title: 'Grid Item Properties', type: 'video', note: 'Key Topics Covered:\n- Item Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Item Properties\n\ngrid-column, grid-row, grid-area for item placement' },
                    { title: 'Advanced Grid Techniques', type: 'doc', note: 'Key Topics Covered:\n- Advanced Grid\n- Understanding the core concepts.\n- Practical application.', content: '## Advanced Grid\n\nAuto-fit, auto-fill, minmax(), repeat() functions' }
                ]
            },
            {
                title: 'Responsive Design',
                topics: [
                    { title: 'Media Queries', type: 'video', note: 'Key Topics Covered:\n- Media Queries\n- Understanding the core concepts.\n- Practical application.', content: '## Media Queries\n\n@media rules for responsive breakpoints and device targeting' },
                    { title: 'Mobile-First Approach', type: 'doc', note: 'Key Topics Covered:\n- Mobile-First\n- Understanding the core concepts.\n- Practical application.', content: '## Mobile-First\n\nDesigning for mobile first, then scaling up for larger screens' },
                    { title: 'Responsive Units', type: 'video', note: 'Key Topics Covered:\n- CSS Units\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Units\n\nem, rem, %, vw, vh, vmin, vmax for responsive sizing' },
                    { title: 'Responsive Images', type: 'doc', note: 'Key Topics Covered:\n- Responsive Images\n- Understanding the core concepts.\n- Practical application.', content: '## Responsive Images\n\nmax-width: 100%, object-fit, aspect-ratio' }
                ]
            },
            {
                title: 'CSS Animations and Transitions',
                topics: [
                    { title: 'CSS Transitions', type: 'video', note: 'Key Topics Covered:\n- Transitions\n- Understanding the core concepts.\n- Practical application.', content: '## Transitions\n\nSmooth property changes: transition-property, duration, timing-function, delay' },
                    { title: 'CSS Transforms', type: 'doc', note: 'Key Topics Covered:\n- Transforms\n- Understanding the core concepts.\n- Practical application.', content: '## Transforms\n\ntranslate, rotate, scale, skew for 2D and 3D transformations' },
                    { title: 'CSS Animations', type: 'video', note: 'Key Topics Covered:\n- Keyframe Animations\n- Understanding the core concepts.\n- Practical application.', content: '## Keyframe Animations\n\n@keyframes, animation properties for complex animations' },
                    { title: 'Animation Best Practices', type: 'doc', note: 'Key Topics Covered:\n- Performance\n- Understanding the core concepts.\n- Practical application.', content: '## Performance\n\nUsing transform and opacity, will-change, GPU acceleration' }
                ]
            },
            {
                title: 'Advanced CSS',
                topics: [
                    { title: 'CSS Variables', type: 'video', note: 'Key Topics Covered:\n- Custom Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Custom Properties\n\nDefining and using CSS variables with var() function' },
                    { title: 'CSS Preprocessors', type: 'doc', note: 'Key Topics Covered:\n- Sass/SCSS\n- Understanding the core concepts.\n- Practical application.', content: '## Sass/SCSS\n\nVariables, nesting, mixins, functions in CSS preprocessors' },
                    { title: 'CSS Architecture', type: 'video', note: 'Key Topics Covered:\n- CSS Methodologies\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Methodologies\n\nBEM, OOCSS, SMACSS for scalable CSS' },
                    { title: 'Modern CSS Features', type: 'doc', note: 'Key Topics Covered:\n- New CSS\n- Understanding the core concepts.\n- Practical application.', content: '## New CSS\n\nContainer queries, :has(), :is(), :where(), cascade layers' }
                ]
            }
        ]
    },
    {
        title: 'JavaScript',
        mentor: 'AllCode Team',
        description: 'The language of the web.',
        time: '02:00 PM - 04:00 PM',
        status: 'In Progress',
        type: 'live',
        accentColor: '#F7DF1E',
        startDate: 'July 1, 2025',
        progress: 0,
        modules: [
            {
                title: 'JavaScript Basics',
                topics: [
                    { title: 'Variables and Data Types', type: 'video', note: 'Key Topics Covered:\n- JavaScript Variables\n- Understanding the core concepts.\n- Practical application.', content: '## JavaScript Variables\n\nlet, const, var - and primitive data types: string, number, boolean, null, undefined, symbol' },
                    { title: 'Operators', type: 'doc', note: 'Key Topics Covered:\n- Operators\n- Understanding the core concepts.\n- Practical application.', content: '## Operators\n\nArithmetic (+, -, *, /), comparison (==, ===, !=, !==), logical (&&, ||, !), assignment (=, +=, -=)' },
                    { title: 'Control Flow', type: 'video', note: 'Key Topics Covered:\n- Control Structures\n- Understanding the core concepts.\n- Practical application.', content: '## Control Structures\n\nif-else statements, switch cases, ternary operator' },
                    { title: 'Loops', type: 'doc', note: 'Key Topics Covered:\n- Loops\n- Understanding the core concepts.\n- Practical application.', content: '## Loops\n\nfor, while, do-while, for...of, for...in loops' }
                ]
            },
            {
                title: 'Functions',
                topics: [
                    { title: 'Function Declaration', type: 'video', note: 'Key Topics Covered:\n- Functions\n- Understanding the core concepts.\n- Practical application.', content: '## Functions\n\nFunction declarations, expressions, and arrow functions' },
                    { title: 'Parameters and Arguments', type: 'doc', note: 'Key Topics Covered:\n- Function Parameters\n- Understanding the core concepts.\n- Practical application.', content: '## Function Parameters\n\nDefault parameters, rest parameters, spread operator' },
                    { title: 'Return Values', type: 'video', note: 'Key Topics Covered:\n- Return Statement\n- Understanding the core concepts.\n- Practical application.', content: '## Return Statement\n\nReturning values, early returns, implicit returns in arrow functions' },
                    { title: 'Scope and Closures', type: 'doc', note: 'Key Topics Covered:\n- Scope\n- Understanding the core concepts.\n- Practical application.', content: '## Scope\n\nGlobal, function, and block scope. Understanding closures and lexical scope' }
                ]
            },
            {
                title: 'Arrays and Objects',
                topics: [
                    { title: 'Array Basics', type: 'video', note: 'Key Topics Covered:\n- Arrays\n- Understanding the core concepts.\n- Practical application.', content: '## Arrays\n\nCreating arrays, accessing elements, array length, multi-dimensional arrays' },
                    { title: 'Array Methods', type: 'doc', note: 'Key Topics Covered:\n- Array Methods\n- Understanding the core concepts.\n- Practical application.', content: '## Array Methods\n\npush, pop, shift, unshift, splice, slice, concat, indexOf, includes' },
                    { title: 'Object Basics', type: 'video', note: 'Key Topics Covered:\n- Objects\n- Understanding the core concepts.\n- Practical application.', content: '## Objects\n\nObject literals, properties, methods, accessing properties (dot and bracket notation)' },
                    { title: 'Object Methods', type: 'doc', note: 'Key Topics Covered:\n- Object Methods\n- Understanding the core concepts.\n- Practical application.', content: '## Object Methods\n\nObject.keys(), Object.values(), Object.entries(), Object.assign()' }
                ]
            },
            {
                title: 'Higher-Order Functions',
                topics: [
                    { title: 'Callbacks', type: 'video', note: 'Key Topics Covered:\n- Callback Functions\n- Understanding the core concepts.\n- Practical application.', content: '## Callback Functions\n\nPassing functions as arguments, callback patterns' },
                    { title: 'Array Iteration Methods', type: 'doc', note: 'Key Topics Covered:\n- Iteration\n- Understanding the core concepts.\n- Practical application.', content: '## Iteration\n\nforEach, map, filter, reduce, find, findIndex, some, every' },
                    { title: 'Function Composition', type: 'video', note: 'Key Topics Covered:\n- Composition\n- Understanding the core concepts.\n- Practical application.', content: '## Composition\n\nCombining functions, pure functions, function chaining' }
                ]
            },
            {
                title: 'DOM Manipulation',
                topics: [
                    { title: 'Selecting Elements', type: 'video', note: 'Key Topics Covered:\n- DOM Selection\n- Understanding the core concepts.\n- Practical application.', content: '## DOM Selection\n\nquerySelector, querySelectorAll, getElementById, getElementsByClassName' },
                    { title: 'Modifying Elements', type: 'doc', note: 'Key Topics Covered:\n- DOM Manipulation\n- Understanding the core concepts.\n- Practical application.', content: '## DOM Manipulation\n\ninnerHTML, textContent, setAttribute, classList methods' },
                    { title: 'Creating and Removing Elements', type: 'video', note: 'Key Topics Covered:\n- DOM Creation\n- Understanding the core concepts.\n- Practical application.', content: '## DOM Creation\n\ncreateElement, appendChild, removeChild, insertBefore' },
                    { title: 'Event Handling', type: 'doc', note: 'Key Topics Covered:\n- Events\n- Understanding the core concepts.\n- Practical application.', content: '## Events\n\naddEventListener, event object, event bubbling and capturing, event delegation' }
                ]
            },
            {
                title: 'Asynchronous JavaScript',
                topics: [
                    { title: 'setTimeout and setInterval', type: 'video', note: 'Key Topics Covered:\n- Timers\n- Understanding the core concepts.\n- Practical application.', content: '## Timers\n\nDelaying execution and creating intervals' },
                    { title: 'Promises', type: 'doc', note: 'Key Topics Covered:\n- Promises\n- Understanding the core concepts.\n- Practical application.', content: '## Promises\n\nCreating promises, then, catch, finally, Promise.all, Promise.race' },
                    { title: 'Async/Await', type: 'video', note: 'Key Topics Covered:\n- Async/Await\n- Understanding the core concepts.\n- Practical application.', content: '## Async/Await\n\nModern asynchronous JavaScript with async functions and await keyword' },
                    { title: 'Fetch API', type: 'doc', note: 'Key Topics Covered:\n- Fetch API\n- Understanding the core concepts.\n- Practical application.', content: '## Fetch API\n\nMaking HTTP requests, handling responses, error handling' }
                ]
            },
            {
                title: 'ES6+ Features',
                topics: [
                    { title: 'Destructuring', type: 'video', note: 'Key Topics Covered:\n- Destructuring\n- Understanding the core concepts.\n- Practical application.', content: '## Destructuring\n\nArray and object destructuring, nested destructuring' },
                    { title: 'Template Literals', type: 'doc', note: 'Key Topics Covered:\n- Template Strings\n- Understanding the core concepts.\n- Practical application.', content: '## Template Strings\n\nString interpolation, multi-line strings, tagged templates' },
                    { title: 'Modules', type: 'video', note: 'Key Topics Covered:\n- ES6 Modules\n- Understanding the core concepts.\n- Practical application.', content: '## ES6 Modules\n\nimport and export, default exports, named exports' },
                    { title: 'Classes', type: 'doc', note: 'Key Topics Covered:\n- ES6 Classes\n- Understanding the core concepts.\n- Practical application.', content: '## ES6 Classes\n\nClass syntax, constructors, methods, inheritance, static methods' }
                ]
            },
            {
                title: 'Advanced JavaScript',
                topics: [
                    { title: 'Prototypes and Inheritance', type: 'video', note: 'Key Topics Covered:\n- Prototypal Inheritance\n- Understanding the core concepts.\n- Practical application.', content: '## Prototypal Inheritance\n\nPrototype chain, Object.create(), constructor functions' },
                    { title: 'this Keyword', type: 'doc', note: 'Key Topics Covered:\n- this Context\n- Understanding the core concepts.\n- Practical application.', content: '## this Context\n\nUnderstanding this in different contexts, bind, call, apply' },
                    { title: 'Error Handling', type: 'video', note: 'Key Topics Covered:\n- Error Handling\n- Understanding the core concepts.\n- Practical application.', content: '## Error Handling\n\ntry-catch-finally, throwing errors, custom errors' },
                    { title: 'Regular Expressions', type: 'doc', note: 'Key Topics Covered:\n- RegEx\n- Understanding the core concepts.\n- Practical application.', content: '## RegEx\n\nPattern matching, test, match, replace, regex flags' }
                ]
            }
        ]
    },
    {
        title: 'Java',
        mentor: 'James Gosling',
        description: 'Enterprise level application development.',
        time: '04:00 PM - 06:00 PM',
        status: 'In Progress',
        type: 'live',
        accentColor: '#007396',
        startDate: 'May 20, 2025',
        progress: 0,
        modules: [
            {
                title: 'Java Fundamentals',
                topics: [
                    { title: 'Introduction to Java', type: 'video', note: 'Key Topics Covered:\n- Java Basics\n- Understanding the core concepts.\n- Practical application.', content: '## Java Basics\n\nJDK, JRE, JVM - Understanding the Java ecosystem and platform independence' },
                    { title: 'Variables and Data Types', type: 'doc', note: 'Key Topics Covered:\n- Java Data Types\n- Understanding the core concepts.\n- Practical application.', content: '## Java Data Types\n\nPrimitive types: byte, short, int, long, float, double, char, boolean\nReference types: String, Arrays, Objects' },
                    { title: 'Operators and Expressions', type: 'video', note: 'Key Topics Covered:\n- Operators\n- Understanding the core concepts.\n- Practical application.', content: '## Operators\n\nArithmetic, relational, logical, bitwise, assignment, ternary operators' },
                    { title: 'Control Statements', type: 'doc', note: 'Key Topics Covered:\n- Control Flow\n- Understanding the core concepts.\n- Practical application.', content: '## Control Flow\n\nif-else, switch, for, while, do-while, break, continue' }
                ]
            },
            {
                title: 'Object-Oriented Programming',
                topics: [
                    { title: 'Classes and Objects', type: 'video', note: 'Key Topics Covered:\n- OOP Basics\n- Understanding the core concepts.\n- Practical application.', content: '## OOP Basics\n\nDefining classes, creating objects, instance variables, methods' },
                    { title: 'Constructors', type: 'doc', note: 'Key Topics Covered:\n- Constructors\n- Understanding the core concepts.\n- Practical application.', content: '## Constructors\n\nDefault constructor, parameterized constructor, constructor overloading, this keyword' },
                    { title: 'Inheritance', type: 'video', note: 'Key Topics Covered:\n- Inheritance\n- Understanding the core concepts.\n- Practical application.', content: '## Inheritance\n\nextends keyword, super keyword, method overriding, IS-A relationship' },
                    { title: 'Polymorphism', type: 'doc', note: 'Key Topics Covered:\n- Polymorphism\n- Understanding the core concepts.\n- Practical application.', content: '## Polymorphism\n\nMethod overloading (compile-time), method overriding (runtime), dynamic binding' },
                    { title: 'Encapsulation', type: 'video', note: 'Key Topics Covered:\n- Encapsulation\n- Understanding the core concepts.\n- Practical application.', content: '## Encapsulation\n\nAccess modifiers (private, public, protected, default), getters and setters' },
                    { title: 'Abstraction', type: 'doc', note: 'Key Topics Covered:\n- Abstraction\n- Understanding the core concepts.\n- Practical application.', content: '## Abstraction\n\nAbstract classes, abstract methods, interfaces, multiple inheritance' }
                ]
            },
            {
                title: 'Exception Handling',
                topics: [
                    { title: 'Try-Catch-Finally', type: 'video', note: 'Key Topics Covered:\n- Exception Handling\n- Understanding the core concepts.\n- Practical application.', content: '## Exception Handling\n\ntry, catch, finally blocks for handling runtime errors' },
                    { title: 'Checked vs Unchecked Exceptions', type: 'doc', note: 'Key Topics Covered:\n- Exception Types\n- Understanding the core concepts.\n- Practical application.', content: '## Exception Types\n\nChecked exceptions (compile-time), unchecked exceptions (runtime), Error class' },
                    { title: 'Throw and Throws', type: 'video', note: 'Key Topics Covered:\n- Throwing Exceptions\n- Understanding the core concepts.\n- Practical application.', content: '## Throwing Exceptions\n\nthrow keyword for throwing exceptions, throws for declaring exceptions' },
                    { title: 'Custom Exceptions', type: 'doc', note: 'Key Topics Covered:\n- Custom Exceptions\n- Understanding the core concepts.\n- Practical application.', content: '## Custom Exceptions\n\nCreating user-defined exception classes extending Exception' }
                ]
            },
            {
                title: 'Collections Framework',
                topics: [
                    { title: 'List Interface', type: 'video', note: 'Key Topics Covered:\n- List\n- Understanding the core concepts.\n- Practical application.', content: '## List\n\nArrayList, LinkedList, Vector - ordered collections allowing duplicates' },
                    { title: 'Set Interface', type: 'doc', note: 'Key Topics Covered:\n- Set\n- Understanding the core concepts.\n- Practical application.', content: '## Set\n\nHashSet, LinkedHashSet, TreeSet - unordered collections without duplicates' },
                    { title: 'Map Interface', type: 'video', note: 'Key Topics Covered:\n- Map\n- Understanding the core concepts.\n- Practical application.', content: '## Map\n\nHashMap, LinkedHashMap, TreeMap - key-value pair collections' },
                    { title: 'Queue and Deque', type: 'doc', note: 'Key Topics Covered:\n- Queue\n- Understanding the core concepts.\n- Practical application.', content: '## Queue\n\nPriorityQueue, ArrayDeque - FIFO and LIFO data structures' },
                    { title: 'Iterators and Comparators', type: 'video', note: 'Key Topics Covered:\n- Iteration\n- Understanding the core concepts.\n- Practical application.', content: '## Iteration\n\nIterator, ListIterator, Comparable, Comparator for sorting' }
                ]
            },
            {
                title: 'Multithreading',
                topics: [
                    { title: 'Thread Basics', type: 'video', note: 'Key Topics Covered:\n- Threads\n- Understanding the core concepts.\n- Practical application.', content: '## Threads\n\nCreating threads: extending Thread class, implementing Runnable interface' },
                    { title: 'Thread Lifecycle', type: 'doc', note: 'Key Topics Covered:\n- Thread States\n- Understanding the core concepts.\n- Practical application.', content: '## Thread States\n\nNew, Runnable, Running, Blocked, Waiting, Terminated states' },
                    { title: 'Synchronization', type: 'video', note: 'Key Topics Covered:\n- Synchronization\n- Understanding the core concepts.\n- Practical application.', content: '## Synchronization\n\nsynchronized keyword, locks, preventing race conditions' },
                    { title: 'Inter-thread Communication', type: 'doc', note: 'Key Topics Covered:\n- Communication\n- Understanding the core concepts.\n- Practical application.', content: '## Communication\n\nwait(), notify(), notifyAll() methods for thread coordination' }
                ]
            },
            {
                title: 'File I/O and Serialization',
                topics: [
                    { title: 'File Handling', type: 'video', note: 'Key Topics Covered:\n- File I/O\n- Understanding the core concepts.\n- Practical application.', content: '## File I/O\n\nFile class, FileReader, FileWriter, BufferedReader, BufferedWriter' },
                    { title: 'Byte Streams', type: 'doc', note: 'Key Topics Covered:\n- Byte Streams\n- Understanding the core concepts.\n- Practical application.', content: '## Byte Streams\n\nFileInputStream, FileOutputStream for binary data' },
                    { title: 'Character Streams', type: 'video', note: 'Key Topics Covered:\n- Character Streams\n- Understanding the core concepts.\n- Practical application.', content: '## Character Streams\n\nFileReader, FileWriter for text data' },
                    { title: 'Serialization', type: 'doc', note: 'Key Topics Covered:\n- Serialization\n- Understanding the core concepts.\n- Practical application.', content: '## Serialization\n\nSerializable interface, ObjectInputStream, ObjectOutputStream' }
                ]
            },
            {
                title: 'Advanced Java Concepts',
                topics: [
                    { title: 'Lambda Expressions', type: 'video', note: 'Key Topics Covered:\n- Lambdas\n- Understanding the core concepts.\n- Practical application.', content: '## Lambdas\n\nFunctional programming in Java, lambda syntax, functional interfaces' },
                    { title: 'Stream API', type: 'doc', note: 'Key Topics Covered:\n- Streams\n- Understanding the core concepts.\n- Practical application.', content: '## Streams\n\nfilter, map, reduce, collect operations on collections' },
                    { title: 'Optional Class', type: 'video', note: 'Key Topics Covered:\n- Optional\n- Understanding the core concepts.\n- Practical application.', content: '## Optional\n\nAvoiding NullPointerException with Optional container' },
                    { title: 'Date and Time API', type: 'doc', note: 'Key Topics Covered:\n- Date/Time\n- Understanding the core concepts.\n- Practical application.', content: '## Date/Time\n\nLocalDate, LocalTime, LocalDateTime, ZonedDateTime' }
                ]
            },
            {
                title: 'JDBC - Database Connectivity',
                topics: [
                    { title: 'JDBC Architecture', type: 'video', note: 'Key Topics Covered:\n- JDBC\n- Understanding the core concepts.\n- Practical application.', content: '## JDBC\n\nDriver Manager, Connection, Statement, ResultSet interfaces' },
                    { title: 'Connecting to Database', type: 'doc', note: 'Key Topics Covered:\n- Database Connection\n- Understanding the core concepts.\n- Practical application.', content: '## Database Connection\n\nLoading drivers, establishing connection, connection string' },
                    { title: 'CRUD Operations', type: 'video', note: 'Key Topics Covered:\n- Database Operations\n- Understanding the core concepts.\n- Practical application.', content: '## Database Operations\n\nCreate, Read, Update, Delete using Statement and PreparedStatement' },
                    { title: 'Transaction Management', type: 'doc', note: 'Key Topics Covered:\n- Transactions\n- Understanding the core concepts.\n- Practical application.', content: '## Transactions\n\ncommit, rollback, setAutoCommit for transaction control' }
                ]
            },
            {
                title: 'Spring Framework Basics',
                topics: [
                    { title: 'Introduction to Spring', type: 'video', note: 'Key Topics Covered:\n- Spring Framework\n- Understanding the core concepts.\n- Practical application.', content: '## Spring Framework\n\nDependency Injection, Inversion of Control, Spring modules' },
                    { title: 'Spring Beans', type: 'doc', note: 'Key Topics Covered:\n- Beans\n- Understanding the core concepts.\n- Practical application.', content: '## Beans\n\nBean lifecycle, scopes (singleton, prototype), configuration' },
                    { title: 'Dependency Injection', type: 'video', note: 'Key Topics Covered:\n- DI\n- Understanding the core concepts.\n- Practical application.', content: '## DI\n\nConstructor injection, setter injection, @Autowired annotation' },
                    { title: 'Spring MVC', type: 'doc', note: 'Key Topics Covered:\n- MVC Pattern\n- Understanding the core concepts.\n- Practical application.', content: '## MVC Pattern\n\nModel-View-Controller architecture, DispatcherServlet, Controllers' }
                ]
            },
            {
                title: 'Spring Boot',
                topics: [
                    { title: 'Spring Boot Basics', type: 'video', note: 'Key Topics Covered:\n- Spring Boot\n- Understanding the core concepts.\n- Practical application.', content: '## Spring Boot\n\nAuto-configuration, starter dependencies, embedded servers' },
                    { title: 'Building REST APIs', type: 'doc', note: 'Key Topics Covered:\n- REST APIs\n- Understanding the core concepts.\n- Practical application.', content: '## REST APIs\n\n@RestController, @GetMapping, @PostMapping, @PutMapping, @DeleteMapping' },
                    { title: 'JPA and Hibernate', type: 'video', note: 'Key Topics Covered:\n- ORM\n- Understanding the core concepts.\n- Practical application.', content: '## ORM\n\nJPA annotations, Entity, Repository, CRUD operations' },
                    { title: 'Spring Security', type: 'doc', note: 'Key Topics Covered:\n- Security\n- Understanding the core concepts.\n- Practical application.', content: '## Security\n\nAuthentication, authorization, JWT tokens, password encoding' }
                ]
            },
            {
                title: 'Microservices with Spring',
                topics: [
                    { title: 'Microservices Architecture', type: 'video', note: 'Key Topics Covered:\n- Microservices\n- Understanding the core concepts.\n- Practical application.', content: '## Microservices\n\nService decomposition, API Gateway, service discovery' },
                    { title: 'Spring Cloud', type: 'doc', note: 'Key Topics Covered:\n- Spring Cloud\n- Understanding the core concepts.\n- Practical application.', content: '## Spring Cloud\n\nEureka, Zuul, Config Server, Circuit Breaker' },
                    { title: 'Docker and Deployment', type: 'video', note: 'Key Topics Covered:\n- Deployment\n- Understanding the core concepts.\n- Practical application.', content: '## Deployment\n\nDockerizing Spring Boot apps, container orchestration' }
                ]
            }
        ]
    },
    {
        title: 'MEAN Stack',
        mentor: 'AllCode Team',
        description: 'MongoDB, Express, Angular, Node.js',
        time: '05:00 PM - 07:00 PM',
        type: 'live',
        accentColor: '#DD0031',
        startDate: 'Aug 15, 2025',
        title: 'SQL',
        mentor: 'AllCode Team',
        description: 'Master Database Management.',
        time: '08:00 AM - 10:00 AM',
        status: 'In Progress',
        type: 'live',
        accentColor: '#00758F',
        startDate: 'June 10, 2025',
        progress: 0,
        modules: [
            {
                title: 'SQL Basics',
                topics: [
                    { title: 'Introduction to Databases', type: 'video', note: 'Key Topics Covered:\n- Databases\n- Understanding the core concepts.\n- Practical application.', content: '## Databases\n\nRelational databases, tables, rows, columns, primary keys' },
                    { title: 'Creating Tables', type: 'doc', note: 'Key Topics Covered:\n- DDL Commands\n- Understanding the core concepts.\n- Practical application.', content: '## DDL Commands\n\nCREATE TABLE, ALTER TABLE, DROP TABLE, TRUNCATE' },
                    { title: 'Data Types', type: 'video', note: 'Key Topics Covered:\n- SQL Data Types\n- Understanding the core concepts.\n- Practical application.', content: '## SQL Data Types\n\nINT, VARCHAR, CHAR, DATE, DATETIME, BOOLEAN, DECIMAL' },
                    { title: 'Constraints', type: 'doc', note: 'Key Topics Covered:\n- Constraints\n- Understanding the core concepts.\n- Practical application.', content: '## Constraints\n\nPRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT' }
                ]
            },
            {
                title: 'Data Manipulation',
                topics: [
                    { title: 'INSERT Statement', type: 'video', note: 'Key Topics Covered:\n- Inserting Data\n- Understanding the core concepts.\n- Practical application.', content: '## Inserting Data\n\nINSERT INTO table VALUES, inserting multiple rows' },
                    { title: 'SELECT Queries', type: 'doc', note: 'Key Topics Covered:\n- Querying Data\n- Understanding the core concepts.\n- Practical application.', content: '## Querying Data\n\nSELECT columns FROM table, WHERE clause, DISTINCT keyword' },
                    { title: 'UPDATE Statement', type: 'video', note: 'Key Topics Covered:\n- Updating Data\n- Understanding the core concepts.\n- Practical application.', content: '## Updating Data\n\nUPDATE table SET column = value WHERE condition' },
                    { title: 'DELETE Statement', type: 'doc', note: 'Key Topics Covered:\n- Deleting Data\n- Understanding the core concepts.\n- Practical application.', content: '## Deleting Data\n\nDELETE FROM table WHERE condition' }
                ]
            },
            {
                title: 'Filtering and Sorting',
                topics: [
                    { title: 'WHERE Clause', type: 'video', note: 'Key Topics Covered:\n- Filtering\n- Understanding the core concepts.\n- Practical application.', content: '## Filtering\n\nComparison operators (=, !=, <, >, <=, >=), logical operators (AND, OR, NOT)' },
                    { title: 'LIKE and Wildcards', type: 'doc', note: 'Key Topics Covered:\n- Pattern Matching\n- Understanding the core concepts.\n- Practical application.', content: '## Pattern Matching\n\nLIKE operator, % and _ wildcards for pattern matching' },
                    { title: 'ORDER BY', type: 'video', note: 'Key Topics Covered:\n- Sorting\n- Understanding the core concepts.\n- Practical application.', content: '## Sorting\n\nORDER BY column ASC/DESC, sorting by multiple columns' },
                    { title: 'LIMIT and OFFSET', type: 'doc', note: 'Key Topics Covered:\n- Pagination\n- Understanding the core concepts.\n- Practical application.', content: '## Pagination\n\nLIMIT for row count, OFFSET for skipping rows' }
                ]
            },
            {
                title: 'Aggregate Functions',
                topics: [
                    { title: 'COUNT, SUM, AVG', type: 'video', note: 'Key Topics Covered:\n- Aggregate Functions\n- Understanding the core concepts.\n- Practical application.', content: '## Aggregate Functions\n\nCOUNT(*), SUM(column), AVG(column) for calculations' },
                    { title: 'MIN and MAX', type: 'doc', note: 'Key Topics Covered:\n- Min/Max\n- Understanding the core concepts.\n- Practical application.', content: '## Min/Max\n\nFinding minimum and maximum values in columns' },
                    { title: 'GROUP BY', type: 'video', note: 'Key Topics Covered:\n- Grouping\n- Understanding the core concepts.\n- Practical application.', content: '## Grouping\n\nGROUP BY clause for grouping rows, using with aggregate functions' },
                    { title: 'HAVING Clause', type: 'doc', note: 'Key Topics Covered:\n- Filtering Groups\n- Understanding the core concepts.\n- Practical application.', content: '## Filtering Groups\n\nHAVING clause for filtering grouped results' }
                ]
            },
            {
                title: 'SQL Joins',
                topics: [
                    { title: 'INNER JOIN', type: 'video', note: 'Key Topics Covered:\n- Inner Join\n- Understanding the core concepts.\n- Practical application.', content: '## Inner Join\n\nReturning matching rows from both tables' },
                    { title: 'LEFT JOIN', type: 'doc', note: 'Key Topics Covered:\n- Left Join\n- Understanding the core concepts.\n- Practical application.', content: '## Left Join\n\nReturning all rows from left table and matching rows from right' },
                    { title: 'RIGHT JOIN', type: 'video', note: 'Key Topics Covered:\n- Right Join\n- Understanding the core concepts.\n- Practical application.', content: '## Right Join\n\nReturning all rows from right table and matching rows from left' },
                    { title: 'FULL OUTER JOIN', type: 'doc', note: 'Key Topics Covered:\n- Full Join\n- Understanding the core concepts.\n- Practical application.', content: '## Full Join\n\nReturning all rows from both tables' },
                    { title: 'Self Join and Cross Join', type: 'video', note: 'Key Topics Covered:\n- Advanced Joins\n- Understanding the core concepts.\n- Practical application.', content: '## Advanced Joins\n\nJoining table with itself, Cartesian product' }
                ]
            },
            {
                title: 'Subqueries',
                topics: [
                    { title: 'Subquery Basics', type: 'video', note: 'Key Topics Covered:\n- Subqueries\n- Understanding the core concepts.\n- Practical application.', content: '## Subqueries\n\nNested SELECT statements, subqueries in WHERE clause' },
                    { title: 'Correlated Subqueries', type: 'doc', note: 'Key Topics Covered:\n- Correlated Subqueries\n- Understanding the core concepts.\n- Practical application.', content: '## Correlated Subqueries\n\nSubqueries referencing outer query columns' },
                    { title: 'EXISTS and IN', type: 'video', note: 'Key Topics Covered:\n- Subquery Operators\n- Understanding the core concepts.\n- Practical application.', content: '## Subquery Operators\n\nEXISTS, NOT EXISTS, IN, NOT IN operators' }
                ]
            },
            {
                title: 'Indexes and Performance',
                topics: [
                    { title: 'Creating Indexes', type: 'video', note: 'Key Topics Covered:\n- Indexes\n- Understanding the core concepts.\n- Practical application.', content: '## Indexes\n\nCREATE INDEX for faster query performance' },
                    { title: 'Index Types', type: 'doc', note: 'Key Topics Covered:\n- Index Types\n- Understanding the core concepts.\n- Practical application.', content: '## Index Types\n\nUnique indexes, composite indexes, clustered vs non-clustered' },
                    { title: 'Query Optimization', type: 'video', note: 'Key Topics Covered:\n- Optimization\n- Understanding the core concepts.\n- Practical application.', content: '## Optimization\n\nEXPLAIN command, query execution plans, optimization tips' }
                ]
            },
            {
                title: 'Advanced SQL',
                topics: [
                    { title: 'Views', type: 'video', note: 'Key Topics Covered:\n- Views\n- Understanding the core concepts.\n- Practical application.', content: '## Views\n\nCREATE VIEW, virtual tables, updatable views' },
                    { title: 'Stored Procedures', type: 'doc', note: 'Key Topics Covered:\n- Stored Procedures\n- Understanding the core concepts.\n- Practical application.', content: '## Stored Procedures\n\nCREATE PROCEDURE, parameters, reusable SQL code' },
                    { title: 'Triggers', type: 'video', note: 'Key Topics Covered:\n- Triggers\n- Understanding the core concepts.\n- Practical application.', content: '## Triggers\n\nCREATE TRIGGER, BEFORE/AFTER INSERT/UPDATE/DELETE' },
                    { title: 'Transactions', type: 'doc', note: 'Key Topics Covered:\n- Transactions\n- Understanding the core concepts.\n- Practical application.', content: '## Transactions\n\nBEGIN TRANSACTION, COMMIT, ROLLBACK, ACID properties' }
                ]
            }
        ]
    },
    {
        title: 'Automation Testing',
        mentor: 'AllCode Team',
        description: 'Selenium, TestNG, Maven.',
        time: '02:00 PM - 04:00 PM',
        type: 'live',
        accentColor: '#00C853',
        startDate: 'July 20, 2025',
        progress: 0,
        modules: [
            {
                title: 'Introduction To Automation Testing',
                topics: [
                    { title: 'What is Automation Testing?', type: 'video', note: 'Key Topics Covered:\n- Automation Testing\n- Understanding the core concepts.\n- Practical application.', content: '## Automation Testing\n\nAutomated execution of test cases using tools and scripts. Benefits: speed, accuracy, reusability' },
                    { title: 'Manual vs Automation Testing', type: 'doc', note: 'Key Topics Covered:\n- Comparison\n- Understanding the core concepts.\n- Practical application.', content: '## Comparison\n\nWhen to use manual testing vs automation testing, cost-benefit analysis' },
                    { title: 'Selenium Overview', type: 'video', note: 'Key Topics Covered:\n- Selenium\n- Understanding the core concepts.\n- Practical application.', content: '## Selenium\n\nOpen-source automation tool, Selenium WebDriver, Selenium Grid, Selenium IDE' },
                    { title: 'Setting Up Selenium', type: 'doc', note: 'Key Topics Covered:\n- Setup\n- Understanding the core concepts.\n- Practical application.', content: '## Setup\n\nInstalling Java, Selenium WebDriver, browser drivers (ChromeDriver, GeckoDriver)' }
                ]
            },
            {
                title: 'Selenium WebDriver Basics',
                topics: [
                    { title: 'WebDriver Architecture', type: 'video', note: 'Key Topics Covered:\n- Architecture\n- Understanding the core concepts.\n- Practical application.', content: '## Architecture\n\nClient libraries, JSON wire protocol, browser drivers, browsers' },
                    { title: 'First Selenium Script', type: 'doc', note: 'Key Topics Covered:\n- First Script\n- Understanding the core concepts.\n- Practical application.', content: '## First Script\n\nInitializing WebDriver, navigating to URL, closing browser' },
                    { title: 'WebDriver Commands', type: 'video', note: 'Key Topics Covered:\n- Commands\n- Understanding the core concepts.\n- Practical application.', content: '## Commands\n\nget(), getTitle(), getCurrentUrl(), getPageSource(), close(), quit()' },
                    { title: 'Browser Navigation', type: 'doc', note: 'Key Topics Covered:\n- Navigation\n- Understanding the core concepts.\n- Practical application.', content: '## Navigation\n\nnavigate().to(), back(), forward(), refresh()' }
                ]
            },
            {
                title: 'Locators in Selenium',
                topics: [
                    { title: 'Locator Strategies', type: 'video', note: 'Key Topics Covered:\n- Locators\n- Understanding the core concepts.\n- Practical application.', content: '## Locators\n\nID, Name, ClassName, TagName, LinkText, PartialLinkText' },
                    { title: 'CSS Selectors', type: 'doc', note: 'Key Topics Covered:\n- CSS Selectors\n- Understanding the core concepts.\n- Practical application.', content: '## CSS Selectors\n\nTag, ID (#), Class (.), Attribute, Descendant selectors' },
                    { title: 'XPath', type: 'video', note: 'Key Topics Covered:\n- XPath\n- Understanding the core concepts.\n- Practical application.', content: '## XPath\n\nAbsolute vs Relative XPath, XPath axes, XPath functions' },
                    { title: 'Best Practices for Locators', type: 'doc', note: 'Key Topics Covered:\n- Best Practices\n- Understanding the core concepts.\n- Practical application.', content: '## Best Practices\n\nPreferring ID and Name, avoiding absolute XPath, using unique attributes' }
                ]
            },
            {
                title: 'Handling Web Elements',
                topics: [
                    { title: 'Interacting with Elements', type: 'video', note: 'Key Topics Covered:\n- Element Interaction\n- Understanding the core concepts.\n- Practical application.', content: '## Element Interaction\n\nclick(), sendKeys(), clear(), getText(), getAttribute()' },
                    { title: 'Dropdowns and Select', type: 'doc', note: 'Key Topics Covered:\n- Select Class\n- Understanding the core concepts.\n- Practical application.', content: '## Select Class\n\nselectByVisibleText(), selectByValue(), selectByIndex()' },
                    { title: 'Checkboxes and Radio Buttons', type: 'video', note: 'Key Topics Covered:\n- Checkboxes/Radio\n- Understanding the core concepts.\n- Practical application.', content: '## Checkboxes/Radio\n\nisSelected(), isEnabled(), isDisplayed() methods' },
                    { title: 'Handling Alerts', type: 'doc', note: 'Key Topics Covered:\n- Alerts\n- Understanding the core concepts.\n- Practical application.', content: '## Alerts\n\nswitchTo().alert(), accept(), dismiss(), getText(), sendKeys()' }
                ]
            },
            {
                title: 'Advanced Selenium Concepts',
                topics: [
                    { title: 'Waits in Selenium', type: 'video', note: 'Key Topics Covered:\n- Waits\n- Understanding the core concepts.\n- Practical application.', content: '## Waits\n\nImplicit wait, Explicit wait (WebDriverWait), Fluent wait' },
                    { title: 'Handling Frames', type: 'doc', note: 'Key Topics Covered:\n- Frames\n- Understanding the core concepts.\n- Practical application.', content: '## Frames\n\nswitchTo().frame() by index, name, WebElement' },
                    { title: 'Window Handling', type: 'video', note: 'Key Topics Covered:\n- Windows\n- Understanding the core concepts.\n- Practical application.', content: '## Windows\n\ngetWindowHandle(), getWindowHandles(), switchTo().window()' },
                    { title: 'Actions Class', type: 'doc', note: 'Key Topics Covered:\n- Actions\n- Understanding the core concepts.\n- Practical application.', content: '## Actions\n\nmoveToElement(), click(), doubleClick(), contextClick(), dragAndDrop()' }
                ]
            },
            {
                title: 'TestNG Framework',
                topics: [
                    { title: 'Introduction to TestNG', type: 'video', note: 'Key Topics Covered:\n- TestNG\n- Understanding the core concepts.\n- Practical application.', content: '## TestNG\n\nTesting framework for Java, annotations, test configuration' },
                    { title: 'TestNG Annotations', type: 'doc', note: 'Key Topics Covered:\n- Annotations\n- Understanding the core concepts.\n- Practical application.', content: '## Annotations\n\n@Test, @BeforeMethod, @AfterMethod, @BeforeClass, @AfterClass, @BeforeSuite, @AfterSuite' },
                    { title: 'Assertions', type: 'video', note: 'Key Topics Covered:\n- Assertions\n- Understanding the core concepts.\n- Practical application.', content: '## Assertions\n\nassertEquals(), assertTrue(), assertFalse(), assertNull(), assertNotNull()' },
                    { title: 'TestNG XML', type: 'doc', note: 'Key Topics Covered:\n- XML Configuration\n- Understanding the core concepts.\n- Practical application.', content: '## XML Configuration\n\ntestng.xml for test suite configuration, parallel execution' }
                ]
            },
            {
                title: 'Page Object Model',
                topics: [
                    { title: 'POM Design Pattern', type: 'video', note: 'Key Topics Covered:\n- Page Object Model\n- Understanding the core concepts.\n- Practical application.', content: '## Page Object Model\n\nSeparating page elements and test logic, creating page classes' },
                    { title: 'Implementing POM', type: 'doc', note: 'Key Topics Covered:\n- Implementation\n- Understanding the core concepts.\n- Practical application.', content: '## Implementation\n\n@FindBy annotation, PageFactory.initElements(), page methods' },
                    { title: 'POM Best Practices', type: 'video', note: 'Key Topics Covered:\n- Best Practices\n- Understanding the core concepts.\n- Practical application.', content: '## Best Practices\n\nOne class per page, meaningful method names, returning page objects' }
                ]
            },
            {
                title: 'Data-Driven Testing',
                topics: [
                    { title: 'Data Providers in TestNG', type: 'video', note: 'Key Topics Covered:\n- Data Providers\n- Understanding the core concepts.\n- Practical application.', content: '## Data Providers\n\n@DataProvider annotation, 2D Object array, parameterized tests' },
                    { title: 'Reading from Excel', type: 'doc', note: 'Key Topics Covered:\n- Excel Integration\n- Understanding the core concepts.\n- Practical application.', content: '## Excel Integration\n\nApache POI library, reading data from Excel sheets' },
                    { title: 'Properties Files', type: 'video', note: 'Key Topics Covered:\n- Properties\n- Understanding the core concepts.\n- Practical application.', content: '## Properties\n\nStoring configuration in .properties files, reading with Properties class' }
                ]
            },
            {
                title: 'Maven and CI/CD',
                topics: [
                    { title: 'Maven Basics', type: 'video', note: 'Key Topics Covered:\n- Maven\n- Understanding the core concepts.\n- Practical application.', content: '## Maven\n\nBuild automation tool, pom.xml, dependencies, plugins' },
                    { title: 'Maven Project Structure', type: 'doc', note: 'Key Topics Covered:\n- Project Structure\n- Understanding the core concepts.\n- Practical application.', content: '## Project Structure\n\nsrc/main/java, src/test/java, test resources' },
                    { title: 'Jenkins Integration', type: 'video', note: 'Key Topics Covered:\n- CI/CD\n- Understanding the core concepts.\n- Practical application.', content: '## CI/CD\n\nContinuous Integration with Jenkins, automated test execution' }
                ]
            },
            {
                title: 'Reporting and Logging',
                topics: [
                    { title: 'TestNG Reports', type: 'video', note: 'Key Topics Covered:\n- TestNG Reports\n- Understanding the core concepts.\n- Practical application.', content: '## TestNG Reports\n\nDefault HTML reports, emailable reports, test results' },
                    { title: 'Extent Reports', type: 'doc', note: 'Key Topics Covered:\n- Extent Reports\n- Understanding the core concepts.\n- Practical application.', content: '## Extent Reports\n\nCustom HTML reports with screenshots, detailed test information' },
                    { title: 'Log4j Logging', type: 'video', note: 'Key Topics Covered:\n- Logging\n- Understanding the core concepts.\n- Practical application.', content: '## Logging\n\nLog4j configuration, logging levels, log files' }
                ]
            }
        ]
    },
    {
        title: 'Aptitude and Reasoning',
        mentor: 'AllCode Team',
        description: 'Crack any interview.',
        status: 'Self Paced',
        type: 'self-paced',
        accentColor: '#FFD700',
        startDate: 'Anytime',
        progress: 0,
        modules: [
            {
                title: 'Quantitative Aptitude',
                topics: [
                    { title: 'Number System', type: 'doc', note: 'Key Topics Covered:\n- Number System\n- Understanding the core concepts.\n- Practical application.', content: '## Number System\n\nPrime numbers, HCF, LCM, divisibility rules, number properties' },
                    { title: 'Percentages', type: 'video', note: 'Key Topics Covered:\n- Percentages\n- Understanding the core concepts.\n- Practical application.', content: '## Percentages\n\nCalculating percentages, profit and loss, discount problems' },
                    { title: 'Ratio and Proportion', type: 'doc', note: 'Key Topics Covered:\n- Ratio and Proportion\n- Understanding the core concepts.\n- Practical application.', content: '## Ratio and Proportion\n\nSimplifying ratios, direct and inverse proportion, partnership' },
                    { title: 'Time and Work', type: 'video', note: 'Key Topics Covered:\n- Time and Work\n- Understanding the core concepts.\n- Practical application.', content: '## Time and Work\n\nWork efficiency, pipes and cisterns, work done together' },
                    { title: 'Time, Speed and Distance', type: 'doc', note: 'Key Topics Covered:\n- Speed and Distance\n- Understanding the core concepts.\n- Practical application.', content: '## Speed and Distance\n\nRelative speed, average speed, trains and boats problems' },
                    { title: 'Simple and Compound Interest', type: 'video', note: 'Key Topics Covered:\n- Interest\n- Understanding the core concepts.\n- Practical application.', content: '## Interest\n\nSI and CI formulas, difference between SI and CI' }
                ]
            },
            {
                title: 'Logical Reasoning',
                topics: [
                    { title: 'Blood Relations', type: 'doc', note: 'Key Topics Covered:\n- Blood Relations\n- Understanding the core concepts.\n- Practical application.', content: '## Blood Relations\n\nFamily tree problems, relationship identification' },
                    { title: 'Coding-Decoding', type: 'video', note: 'Key Topics Covered:\n- Coding-Decoding\n- Understanding the core concepts.\n- Practical application.', content: '## Coding-Decoding\n\nLetter coding, number coding, pattern recognition' },
                    { title: 'Series Completion', type: 'doc', note: 'Key Topics Covered:\n- Series\n- Understanding the core concepts.\n- Practical application.', content: '## Series\n\nNumber series, letter series, alpha-numeric series' },
                    { title: 'Puzzles', type: 'video', note: 'Key Topics Covered:\n- Logical Puzzles\n- Understanding the core concepts.\n- Practical application.', content: '## Logical Puzzles\n\nSeating arrangements, scheduling, floor-based puzzles' },
                    { title: 'Syllogism', type: 'doc', note: 'Key Topics Covered:\n- Syllogism\n- Understanding the core concepts.\n- Practical application.', content: '## Syllogism\n\nVenn diagrams, conclusions from statements' },
                    { title: 'Direction Sense', type: 'video', note: 'Key Topics Covered:\n- Directions\n- Understanding the core concepts.\n- Practical application.', content: '## Directions\n\nFinding directions, shortest path, distance calculations' }
                ]
            },
            {
                title: 'Verbal Ability',
                topics: [
                    { title: 'Synonyms and Antonyms', type: 'doc', note: 'Key Topics Covered:\n- Vocabulary\n- Understanding the core concepts.\n- Practical application.', content: '## Vocabulary\n\nBuilding vocabulary, word meanings, opposite words' },
                    { title: 'Sentence Correction', type: 'video', note: 'Key Topics Covered:\n- Grammar\n- Understanding the core concepts.\n- Practical application.', content: '## Grammar\n\nIdentifying and correcting grammatical errors, sentence structure' },
                    { title: 'Reading Comprehension', type: 'doc', note: 'Key Topics Covered:\n- Comprehension\n- Understanding the core concepts.\n- Practical application.', content: '## Comprehension\n\nReading passages, answering questions, inference skills' },
                    { title: 'Para Jumbles', type: 'video', note: 'Key Topics Covered:\n- Para Jumbles\n- Understanding the core concepts.\n- Practical application.', content: '## Para Jumbles\n\nArranging sentences in logical order' },
                    { title: 'Idioms and Phrases', type: 'doc', note: 'Key Topics Covered:\n- Idioms\n- Understanding the core concepts.\n- Practical application.', content: '## Idioms\n\nCommon idioms, their meanings and usage' }
                ]
            },
            {
                title: 'Data Interpretation',
                topics: [
                    { title: 'Tables and Charts', type: 'video', note: 'Key Topics Covered:\n- Data Interpretation\n- Understanding the core concepts.\n- Practical application.', content: '## Data Interpretation\n\nReading tables, bar charts, pie charts, line graphs' },
                    { title: 'Percentage Calculations', type: 'doc', note: 'Key Topics Covered:\n- Calculations\n- Understanding the core concepts.\n- Practical application.', content: '## Calculations\n\nCalculating percentages from data, comparisons' },
                    { title: 'Data Sufficiency', type: 'video', note: 'Key Topics Covered:\n- Data Sufficiency\n- Understanding the core concepts.\n- Practical application.', content: '## Data Sufficiency\n\nDetermining if given data is sufficient to answer questions' }
                ]
            },
            {
                title: 'Problem Solving',
                topics: [
                    { title: 'Age Problems', type: 'doc', note: 'Key Topics Covered:\n- Age Problems\n- Understanding the core concepts.\n- Practical application.', content: '## Age Problems\n\nSolving age-related word problems, equations' },
                    { title: 'Probability', type: 'video', note: 'Key Topics Covered:\n- Probability\n- Understanding the core concepts.\n- Practical application.', content: '## Probability\n\nBasic probability concepts, calculating probabilities' },
                    { title: 'Permutation and Combination', type: 'doc', note: 'Key Topics Covered:\n- P&C\n- Understanding the core concepts.\n- Practical application.', content: '## P&C\n\nArrangements and selections, factorial notation' },
                    { title: 'Algebra Basics', type: 'video', note: 'Key Topics Covered:\n- Algebra\n- Understanding the core concepts.\n- Practical application.', content: '## Algebra\n\nLinear equations, quadratic equations, simplification' }
                ]
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/allcode');
        console.log('MongoDB connected for seeding');

        await Course.deleteMany({});
        console.log('Cleared existing courses');

        await Course.insertMany(seedCourses);
        console.log('Database seeded successfully with comprehensive modules!');
        console.log(`Total courses: ${seedCourses.length}`);
        console.log(`Total modules: ${seedCourses.reduce((acc, c) => acc + c.modules.length, 0)}`);
        console.log(`Total topics: ${seedCourses.reduce((acc, c) => acc + c.modules.reduce((a, m) => a + m.topics.length, 0), 0)}`);
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
