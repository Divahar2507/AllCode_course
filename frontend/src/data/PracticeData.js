export const practiceData = {
    java: [
        {
            id: 'j1', title: 'Java Basics', problems: [
                { id: 'j1_p1', title: 'Hello World', difficulty: 'Easy', hint: 'System.out.println("...");', description: 'Write a program to print "Hello World" to the console.', exampleInput: 'None', exampleOutput: 'Hello World', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}' },
                { id: 'j1_p2', title: 'Variables', difficulty: 'Easy', hint: 'int x = 10;', description: 'Declare an integer `x` with value 10 and print it.', exampleInput: 'None', exampleOutput: '10', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}' },
                { id: 'j1_p3', title: 'Input taking', difficulty: 'Medium', hint: 'Scanner sc = new Scanner(System.in);', description: 'Read an integer from user and print it.', exampleInput: '5', exampleOutput: '5', starterCode: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}' },
                { id: 'j1_p4', title: 'String Concat', difficulty: 'Easy', hint: '+ operator', description: 'Concatenate "Hello" and "Java" and print.', exampleInput: 'None', exampleOutput: 'HelloJava', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}' },
                { id: 'j1_p5', title: 'Simple Math', difficulty: 'Easy', hint: '*, +, -', description: 'Calculate (10 + 5) * 2.', exampleInput: 'None', exampleOutput: '30', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}' }
            ]
        },
        {
            id: 'j2', title: 'Control Flow', problems: [
                { id: 'j2_p1', title: 'Check Even/Odd', difficulty: 'Easy', hint: 'if(n % 2 == 0)', description: 'Check if a given number is even or odd (Hardcode n=5 for example).', exampleInput: '5', exampleOutput: 'Odd', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Write logic\n    }\n}' },
                { id: 'j2_p2', title: 'Factorial', difficulty: 'Medium', hint: 'Loop 1 to n', description: 'Calculate factorial of 5.', exampleInput: '5', exampleOutput: '120', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Write logic\n    }\n}' },
                { id: 'j2_p3', title: 'Fibonacci', difficulty: 'Medium', hint: 'prev + current', description: 'Print first 5 numbers of Fibonacci series.', exampleInput: '5', exampleOutput: '0 1 1 2 3', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write logic\n    }\n}' },
                { id: 'j2_p4', title: 'Prime Check', difficulty: 'Medium', hint: 'Loop 2 to sqrt(n)', description: 'Check if number 17 is prime.', exampleInput: '17', exampleOutput: 'Prime', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write logic\n    }\n}' },
                { id: 'j2_p5', title: 'Switch Case', difficulty: 'Easy', hint: 'switch(day)', description: 'Print day name based on number (1=Mon, etc).', exampleInput: '3', exampleOutput: 'Wednesday', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int day = 3;\n        // Write logic\n    }\n}' }
            ]
        },
        {
            id: 'j3', title: 'OOPs Concepts', problems: [
                { id: 'j3_p1', title: 'Class & Object', difficulty: 'Easy', hint: 'new ClassName()', description: 'Create a class `Dog` with method `bark()` and call it.', exampleInput: 'None', exampleOutput: 'Woof', starterCode: 'class Dog {\n    void bark() {\n        System.out.println("Woof");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        // Create object\n    }\n}' },
                { id: 'j3_p2', title: 'Inheritance', difficulty: 'Medium', hint: 'extends keyword', description: 'Create class `Animal` and subclass `Cat` which meows.', exampleInput: 'None', exampleOutput: 'Meow', starterCode: '// Define classes here' },
                { id: 'j3_p3', title: 'Polymorphism', difficulty: 'Hard', hint: 'Method Overriding', description: 'Demonstrate method overriding with `Shape` and `Circle`.', exampleInput: 'None', exampleOutput: 'Drawing Circle', starterCode: '// Define classes here' },
                { id: 'j3_p4', title: 'Encapsulation', difficulty: 'Medium', hint: 'private fields, getters/setters', description: 'Create a `Person` class with private `name` and public getters.', exampleInput: 'John', exampleOutput: 'John', starterCode: '// Define classes here' },
                { id: 'j3_p5', title: 'Abstraction', difficulty: 'Medium', hint: 'abstract class or interface', description: 'Create an interface `Vehicle` with method `start`.', exampleInput: 'None', exampleOutput: 'Vehicle Started', starterCode: '// Define classes here' }
            ]
        },
        {
            id: 'j4', title: 'Advanced Java', problems: [
                { id: 'j4_p1', title: 'ArrayList', difficulty: 'Easy', hint: 'ArrayList<String>', description: 'Create a list of names and print them.', exampleInput: 'None', exampleOutput: '[Alice, Bob]', starterCode: 'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        // Write code\n    }\n}' },
                { id: 'j4_p2', title: 'HashMap', difficulty: 'Medium', hint: 'put(k,v), get(k)', description: 'Store name-age pairs and retrieve age of "John".', exampleInput: 'None', exampleOutput: '30', starterCode: 'import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        // Write code\n    }\n}' },
                { id: 'j4_p3', title: 'Exception Handling', difficulty: 'Medium', hint: 'try-catch', description: 'Handle division by zero exception.', exampleInput: '10, 0', exampleOutput: 'Error: Division by Zero', starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 0;\n        // Handle exception\n    }\n}' }
            ]
        }
    ],
    javascript: [
        {
            id: 'js1', title: 'JS Fundamentals', problems: [
                { id: 'js1_p1', title: 'Console Log', difficulty: 'Easy', hint: 'console.log()', description: 'Print "JS is awesome" to console.', exampleInput: 'None', exampleOutput: 'JS is awesome', starterCode: 'console.log("...");' },
                { id: 'js1_p2', title: 'Variables', difficulty: 'Easy', hint: 'let, const, var', description: 'Declare a constant `PI` = 3.14 and print it.', exampleInput: 'None', exampleOutput: '3.14', starterCode: '// Write code here' },
                { id: 'js1_p3', title: 'Functions', difficulty: 'Easy', hint: 'function name() {}', description: 'Create a function `greet` that returns "Hello".', exampleInput: 'None', exampleOutput: 'Hello', starterCode: 'function greet() {\n  // return string\n}' },
                { id: 'js1_p4', title: 'Arrow Functions', difficulty: 'Easy', hint: '() => {}', description: 'Convert function to arrow syntax.', exampleInput: '2, 3', exampleOutput: '5', starterCode: 'const add = (a, b) => { return a + b };' },
                { id: 'js1_p5', title: 'Type Check', difficulty: 'Easy', hint: 'typeof', description: 'Check type of variable x = "100".', exampleInput: '"100"', exampleOutput: 'string', starterCode: 'let x = "100";\n// console.log type' }
            ]
        },
        {
            id: 'js2', title: 'Arrays & Objects', problems: [
                { id: 'js2_p1', title: 'Array Filter', difficulty: 'Medium', hint: '.filter()', description: 'Filter even numbers from an array [1,2,3,4,5].', exampleInput: '[1,2,3,4,5]', exampleOutput: '[2,4]', starterCode: 'const arr = [1, 2, 3, 4, 5];\n// Write filter logic' },
                { id: 'js2_p2', title: 'Object Props', difficulty: 'Easy', hint: 'obj.prop', description: 'Access `name` property of user object.', exampleInput: '{name: "John"}', exampleOutput: 'John', starterCode: 'const user = { name: "John", age: 30 };\nconsole.log(user.name);' },
                { id: 'js2_p3', title: 'Map Function', difficulty: 'Medium', hint: '.map()', description: 'Square every number in array [2, 3, 4].', exampleInput: '[2, 3, 4]', exampleOutput: '[4, 9, 16]', starterCode: 'const arr = [2, 3, 4];\n// Use map' },
                { id: 'js2_p4', title: 'Destructuring', difficulty: 'Medium', hint: 'const {a} = obj', description: 'Destructure `id` from `{id: 1, type: "admin"}`.', exampleInput: '{id: 1, type: "admin"}', exampleOutput: '1', starterCode: 'const obj = { id: 1, type: "admin" };\n// Destructure here' },
                { id: 'js2_p5', title: 'Reduce', difficulty: 'Hard', hint: '.reduce()', description: 'Sum all numbers in array using reduce.', exampleInput: '[10, 20, 30]', exampleOutput: '60', starterCode: 'const nums = [10, 20, 30];\n// Calculate sum' }
            ]
        },
        {
            id: 'js3', title: 'DOM Manipulation', problems: [
                { id: 'js3_p1', title: 'Select Element', difficulty: 'Easy', hint: 'getElementById', description: 'Select element with id "app".', exampleInput: '<div id="app"></div>', exampleOutput: 'Element Reference', starterCode: 'const el = document.getElementById("app");' },
                { id: 'js3_p2', title: 'Event Listener', difficulty: 'Medium', hint: 'addEventListener', description: 'Add click event to button.', exampleInput: 'Click Button', exampleOutput: 'Event Fired', starterCode: 'const btn = document.querySelector("button");\n// Add listener' },
                { id: 'js3_p3', title: 'Change Text', difficulty: 'Easy', hint: 'innerText', description: 'Change text of h1 to "Updated".', exampleInput: '<h1>Old</h1>', exampleOutput: '<h1>Updated</h1>', starterCode: 'const h1 = document.querySelector("h1");\n// Update text' }
            ]
        },
        {
            id: 'js4', title: 'Async JS', problems: [
                { id: 'js4_p1', title: 'SsetTimeout', difficulty: 'Easy', hint: 'setTimeout()', description: 'Run code after 2 seconds.', exampleInput: 'Wait 2s', exampleOutput: 'Executed', starterCode: 'setTimeout(() => {\n  // Code\n}, 2000);' },
                { id: 'js4_p2', title: 'Promises', difficulty: 'Medium', hint: 'new Promise', description: 'Create a promise that resolves "Success".', exampleInput: 'None', exampleOutput: 'Success', starterCode: '// Create promise' },
                { id: 'js4_p3', title: 'Async/Await', difficulty: 'Medium', hint: 'async function', description: 'Fetch data from fake API.', exampleInput: 'API Call', exampleOutput: 'Data Received', starterCode: 'async function getData() {\n  // await fetch\n}' }
            ]
        }
    ],
    html: [
        {
            id: 'html1', title: 'Basic Structure', problems: [
                { id: 'h1_p1', title: 'Boilerplate', difficulty: 'Easy', hint: '!DOCTYPE html', description: 'Create a basic HTML5 structure.', exampleInput: 'None', exampleOutput: 'Document Structure', starterCode: '<!DOCTYPE html>\n<html>\n<head></head>\n<body></body>\n</html>' },
                { id: 'h1_p2', title: 'Headings', difficulty: 'Easy', hint: 'h1 to h6', description: 'Create an h1 and h2 tag.', exampleInput: 'None', exampleOutput: 'Title (Large), Subtitle (Medium)', starterCode: '<h1>Title</h1>\n<h2>Subtitle</h2>' },
                { id: 'h1_p3', title: 'Paragraphs', difficulty: 'Easy', hint: '<p>', description: 'Create a paragraph with some text.', exampleInput: 'None', exampleOutput: 'Some text', starterCode: '<p>Some text</p>' },
                { id: 'h1_p4', title: 'Links', difficulty: 'Easy', hint: '<a href>', description: 'Link to google.com.', exampleInput: 'Click Link', exampleOutput: 'Navigates to Google', starterCode: '<a href="...">Google</a>' },
                { id: 'h1_p5', title: 'Images', difficulty: 'Easy', hint: '<img src>', description: 'Display an image "logo.png".', exampleInput: 'logo.png', exampleOutput: 'Image Rendered', starterCode: '<img src="..." alt="Logo" />' }
            ]
        },
        {
            id: 'html2', title: 'Forms & Input', problems: [
                { id: 'h2_p1', title: 'Text Input', difficulty: 'Easy', hint: '<input type="text">', description: 'Create a text input field.', exampleInput: 'User types "Hello"', exampleOutput: 'Field shows "Hello"', starterCode: '<input type="text" placeholder="Enter name" />' },
                { id: 'h2_p2', title: 'Submit Button', difficulty: 'Easy', hint: '<button>', description: 'Create a submit button.', exampleInput: 'Click', exampleOutput: 'Form Submitted', starterCode: '<button type="submit">Send</button>' },
                { id: 'h2_p3', title: 'Checkbox', difficulty: 'Medium', hint: 'type="checkbox"', description: 'Create a checkbox labeled "Terms".', exampleInput: 'Click Box', exampleOutput: 'Checked', starterCode: '<label><input type="checkbox" /> Terms</label>' },
                { id: 'h2_p4', title: 'Dropdown', difficulty: 'Medium', hint: '<select>', description: 'Create a dropdown with 3 options.', exampleInput: 'Click Dropdown', exampleOutput: 'List of Options', starterCode: '<select>\n  <option>1</option>\n</select>' },
                { id: 'h2_p5', title: 'Radio Btn', difficulty: 'Medium', hint: 'type="radio"', description: 'Create gender selection radio buttons.', exampleInput: 'Select Male', exampleOutput: 'Male Selected', starterCode: '<input type="radio" name="g" /> Male' }
            ]
        },
        {
            id: 'html3', title: 'Semantic HTML', problems: [
                { id: 'h3_p1', title: 'Header/Footer', difficulty: 'Easy', hint: '<header>, <footer>', description: 'Use semantic tags for layout.', exampleInput: 'None', exampleOutput: 'Header at top, Footer at bottom', starterCode: '<header>Top</header>\n<footer>Bottom</footer>' },
                { id: 'h3_p2', title: 'Article', difficulty: 'Medium', hint: '<article>', description: 'Wrap content in an article tag.', exampleInput: 'None', exampleOutput: 'Article Block', starterCode: '<article>Content</article>' },
                { id: 'h3_p3', title: 'Nav Bar', difficulty: 'Medium', hint: '<nav>', description: 'Create a navigation menu.', exampleInput: 'None', exampleOutput: 'Menu List', starterCode: '<nav><ul><li>Link</li></ul></nav>' }
            ]
        },
        {
            id: 'html4', title: 'Tables', problems: [
                { id: 'h4_p1', title: 'Basic Table', difficulty: 'Medium', hint: '<table>, <tr>, <td>', description: 'Create a 2x2 table.', exampleInput: 'None', exampleOutput: '2x2 Grid', starterCode: '<table>\n  <tr><td>1</td><td>2</td></tr>\n</table>' }
            ]
        }
    ],
    css: [
        {
            id: 'css1', title: 'Selectors', problems: [
                { id: 'c1_p1', title: 'Class Selector', difficulty: 'Easy', hint: '.classname', description: 'Style elements with class `box`.', exampleInput: '<div class="box"></div>', exampleOutput: 'Red Text', starterCode: '.box {\n  color: red;\n}' },
                { id: 'c1_p2', title: 'ID Selector', difficulty: 'Easy', hint: '#idname', description: 'Style element with id `main`.', exampleInput: '<div id="main"></div>', exampleOutput: 'Blue Background', starterCode: '#main {\n  background: blue;\n}' },
                { id: 'c1_p3', title: 'Element Selector', difficulty: 'Easy', hint: 'p {}', description: 'Style all paragraphs.', exampleInput: '<p>Text</p>', exampleOutput: 'Font size 16px', starterCode: 'p {\n  font-size: 16px;\n}' },
                { id: 'c1_p4', title: 'Descendant', difficulty: 'Medium', hint: 'div p', description: 'Style p inside div.', exampleInput: '<div><p>Tex</p></div>', exampleOutput: 'Styled P', starterCode: 'div p {\n  /* styles */\n}' },
                { id: 'c1_p5', title: 'Hover State', difficulty: 'Easy', hint: ':hover', description: 'Change color on hover.', exampleInput: 'Hover over link', exampleOutput: 'Underlined', starterCode: 'a:hover {\n  text-decoration: underline;\n}' }
            ]
        },
        {
            id: 'css2', title: 'Box Model', problems: [
                { id: 'c2_p1', title: 'Margin & Padding', difficulty: 'Easy', hint: 'margin, padding', description: 'Add 10px margin and 20px padding.', exampleInput: 'None', exampleOutput: 'Spaced Element', starterCode: 'div {\n  margin: 10px;\n  padding: 20px;\n}' },
                { id: 'c2_p2', title: 'Border', difficulty: 'Easy', hint: 'border: 1px solid', description: 'Add a solid black border.', exampleInput: 'None', exampleOutput: 'Border Visible', starterCode: 'div {\n  border: 1px solid black;\n}' },
                { id: 'c2_p3', title: 'Box Sizing', difficulty: 'Medium', hint: 'box-sizing: border-box', description: 'Set box-sizing to border-box.', exampleInput: 'None', exampleOutput: 'Width includes padding', starterCode: '* {\n  box-sizing: border-box;\n}' },
                { id: 'c2_p4', title: 'Border Radius', difficulty: 'Easy', hint: 'border-radius', description: 'Make a circle.', exampleInput: 'None', exampleOutput: 'Circular Shape', starterCode: '.circle {\n  width: 50px; height: 50px;\n  border-radius: 50%;\n}' }
            ]
        },
        {
            id: 'css3', title: 'Layouts', problems: [
                { id: 'c3_p1', title: 'Flex Container', difficulty: 'Medium', hint: 'display: flex', description: 'Make a div a flex container.', exampleInput: 'None', exampleOutput: 'Items in row', starterCode: '.container {\n  display: flex;\n}' },
                { id: 'c3_p2', title: 'Center Content', difficulty: 'Medium', hint: 'justify-content, align-items', description: 'Center content horizontally and vertically.', exampleInput: 'None', exampleOutput: 'Centered', starterCode: '.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
                { id: 'c3_p3', title: 'Grid Basics', difficulty: 'Hard', hint: 'display: grid', description: 'Create a 2 column grid.', exampleInput: 'None', exampleOutput: '2 Columns', starterCode: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}' },
                { id: 'c3_p4', title: 'Responsive', difficulty: 'Hard', hint: '@media', description: 'Change color on small screens.', exampleInput: 'Resize Window < 600px', exampleOutput: 'Pink Background', starterCode: '@media (max-width: 600px) {\n  body { background: pink; }\n}' },
                { id: 'c3_p5', title: 'Positioning', difficulty: 'Medium', hint: 'absolute, relative', description: 'Position an element absolutely.', exampleInput: 'None', exampleOutput: 'Top-Left Corner', starterCode: '.abs {\n  position: absolute;\n  top: 0; left: 0;\n}' }
            ]
        }
    ],
    aptitude: [
        {
            id: 'apt1', title: 'Quantitative', problems: [
                { id: 'a1_p1', title: 'Percentages', difficulty: 'Easy', hint: 'Part/Total * 100', description: 'What is 20% of 500?', exampleInput: '500, 20%', exampleOutput: '100', starterCode: '# Calculate 20% of 500' },
                { id: 'a1_p2', title: 'Profit & Loss', difficulty: 'Medium', hint: 'SP - CP', description: 'Buy at 100, Sell at 120. Profit %?', exampleInput: 'CP=100, SP=120', exampleOutput: '20%', starterCode: '# Result' },
                { id: 'a1_p3', title: 'Time & Work', difficulty: 'Hard', hint: '1/A + 1/B', description: 'A does work in 10 days, B in 15. Together?', exampleInput: '10, 15', exampleOutput: '6 days', starterCode: '# Result' },
                { id: 'a1_p4', title: 'Speed Distance', difficulty: 'Medium', hint: 'D = S * T', description: 'Speed 60km/h, Time 2hrs. Distance?', exampleInput: '60, 2', exampleOutput: '120 km', starterCode: '# Result' },
                { id: 'a1_p5', title: 'Averages', difficulty: 'Easy', hint: 'Sum / Count', description: 'Avg of 10, 20, 30, 40, 50?', exampleInput: '10, 20, 30, 40, 50', exampleOutput: '30', starterCode: '# Result' },
                { id: 'a1_p6', title: 'Simple Interest', difficulty: 'Easy', hint: 'P*R*T/100', description: 'P=1000, R=5%, T=2yrs. Interest?', exampleInput: '1000, 5, 2', exampleOutput: '100', starterCode: '# Result' },
                { id: 'a1_p7', title: 'Ratios', difficulty: 'Medium', hint: 'A:B', description: 'Divide 100 in ratio 2:3.', exampleInput: '100, 2:3', exampleOutput: '40, 60', starterCode: '# Result' }
            ]
        },
        {
            id: 'apt2', title: 'Logical Reasoning', problems: [
                { id: 'a2_p1', title: 'Series 1', difficulty: 'Medium', hint: '+2, +4, +6', description: 'Next in 2, 4, 8, 14, ?', exampleInput: '2, 4, 8, 14', exampleOutput: '22', starterCode: '# Predict' },
                { id: 'a2_p2', title: 'Series 2', difficulty: 'Hard', hint: 'Squares', description: 'Next in 1, 4, 9, 16, ?', exampleInput: '1, 4, 9, 16', exampleOutput: '25', starterCode: '# Predict' },
                { id: 'a2_p3', title: 'Coding Decoding', difficulty: 'Medium', hint: 'Shift +1', description: 'If BAT is CBU, what is CAT?', exampleInput: 'CAT', exampleOutput: 'DBU', starterCode: '# Predict' },
                { id: 'a2_p4', title: 'Direction', difficulty: 'Medium', hint: 'Draw graph', description: 'North -> Right -> Right. Facing?', exampleInput: 'North, R, R', exampleOutput: 'South', starterCode: '# Result' },
                { id: 'a2_p5', title: 'Blood Relations', difficulty: 'Hard', hint: 'Family tree', description: 'A is brother of B...', exampleInput: 'Relationship', exampleOutput: 'Uncle', starterCode: '# Result' },
                { id: 'a2_p6', title: 'Odd One Out', difficulty: 'Easy', hint: 'Find unique', description: 'Apple, Banana, Carrot, Grape. Odd one?', exampleInput: 'Apple, Banana, Carrot, Grape', exampleOutput: 'Carrot', starterCode: '# Result' }
            ]
        },
        {
            id: 'apt3', title: 'Verbal Ability', problems: [
                { id: 'a3_p1', title: 'Synonyms', difficulty: 'Easy', hint: 'Same meaning', description: 'Synonym of Happy?', exampleInput: 'Happy', exampleOutput: 'Joyful', starterCode: '# Type answer' },
                { id: 'a3_p2', title: 'Antonyms', difficulty: 'Easy', hint: 'Opposite', description: 'Opposite of Up?', exampleInput: 'Up', exampleOutput: 'Down', starterCode: '# Type answer' }
            ]
        }
    ],
    python: [
        {
            id: 'py1', title: 'Python Basics', problems: [
                { id: 'py1_p1', title: 'Hello World', difficulty: 'Easy', hint: 'print()', description: 'Print "Hello" in Python.', exampleInput: 'None', exampleOutput: 'Hello', starterCode: 'print("Hello")' },
                { id: 'py1_p2', title: 'Variables', difficulty: 'Easy', hint: 'No type needed', description: 'Assign 10 to x and print.', exampleInput: 'None', exampleOutput: '10', starterCode: 'x = 10\nprint(x)' },
                { id: 'py1_p3', title: 'Lists', difficulty: 'Easy', hint: '[]', description: 'Create a list of 3 items.', exampleInput: 'None', exampleOutput: '[1, 2, 3]', starterCode: 'lst = [1, 2, 3]' },
                { id: 'py1_p4', title: 'Loops', difficulty: 'Medium', hint: 'for i in range()', description: 'Print 0 to 4.', exampleInput: 'None', exampleOutput: '0\n1\n2\n3\n4', starterCode: 'for i in range(5):\n  print(i)' }
            ]
        },
        {
            id: 'py2', title: 'Data Structures', problems: [
                { id: 'py2_p1', title: 'Dictionary', difficulty: 'Medium', hint: '{key: val}', description: 'Store name and age.', exampleInput: 'None', exampleOutput: '{"name": "A", "age": 20}', starterCode: 'd = {"name": "A", "age": 20}' },
                { id: 'py2_p2', title: 'Tuples', difficulty: 'Medium', hint: '()', description: 'Create a tuple of 3 numbers.', exampleInput: 'None', exampleOutput: '(1, 2, 3)', starterCode: 't = (1, 2, 3)' }
            ]
        }
    ]
};
