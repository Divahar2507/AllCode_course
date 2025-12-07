const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/allcode';

const coursesData = [
    {
        title: "Full Stack Web Development",
        modules: [
            {
                title: "HTML5 Fundamentals",
                topics: [
                    {
                        title: "Introduction to HTML",
                        type: "doc",
                        content: `# Introduction to HTML

## 1. The Story: Building a House
Imagine you are building a new house. Before you can paint the walls (CSS) or install smart lights that turn on when you clap (JavaScript), you need the solid frame—foundations, walls, and roof. 
**HTML is that frame.** It tells the browser "This is a heading", "This is a paragraph", just like a blueprint tells a builder "This is a bedroom". Without HTML, the web would just be a pile of unorganized text bricks.

## 2. Definition
**HTML (HyperText Markup Language)** is the standard markup language for documents designed to be displayed in a web browser. It uses "element tags" to define the structure of a page.

## 3. Code Example
Here is the skeleton of every webpage you visit:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First House</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is the living room of my site.</p>
</body>
</html>
\`\`\`

## 4. Important Questions
*   **Q: What is the purpose of \`<!DOCTYPE html>\`?**
    *   **A:** It tells the browser that this is an HTML5 document so it renders correctly.
*   **Q: What is the difference between \`<head>\` and \`<body>\`?**
    *   **A:** \`<head>\` contains metadata (title, links to CSS) not visible on the page. \`<body>\` contains the visible content (text, images).

## 5. Summary
HTML provides the skeletal structure of a web page. It uses tags like \`<h1>\` and \`<p>\` to organize content. It is the first step in web development.
`
                    },
                    {
                        title: "Forms and Inputs",
                        type: "doc",
                        content: `# Forms and Inputs

## 1. The Story: The Suggestion Box
Think of a physical suggestion box at a restaurant. Customers write their feedback on a paper (Input) and drop it into the box (Form). The manager later collects those papers to read them (Server Processing).
On the web, **HTML Forms** are that suggestion box. They are how users "talk back" to a website, whether logging in, searching, or buying shoes.

## 2. Definition
An **HTML Form** is used to collect user input. The user input is most often sent to a server for processing.

## 3. Code Example

\`\`\`html
<form action="/submit-feedback">
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="John Doe">
    
    <p>Favorite Color:</p>
    <input type="radio" id="red" name="color" value="red">
    <label for="red">Red</label>
    
    <input type="radio" id="blue" name="color" value="blue">
    <label for="blue">Blue</label>
    
    <br><br>
    <input type="submit" value="Send Feedback">
</form>
\`\`\`

## 4. Important Questions
*   **Q: Why do radio buttons share the same \`name\` attribute?**
    *   **A:** So that only *one* can be selected at a time (mutually exclusive group).
*   **Q: What is the \`action\` attribute?**
    *   **A:** It specifies the URL where the form data should be sent when the user clicks submit.

## 5. Summary
Forms allow bidirectional communication. Use \`<input>\` tags for text, radios, and checkboxes. Always use \`<label>\` for accessibility.
`
                    }
                ]
            },
            {
                title: "CSS3 Styling",
                topics: [
                    {
                        title: "Selectors and Specificity",
                        type: "doc",
                        content: `# Selectors and Specificity

## 1. The Story: The Classroom Rules
Imagine a classroom. The Principal makes a rule: "All students must wear uniforms" (Tag Selector). 
The Teacher says: "Students in Row 1 must wear red hats" (Class Selector).
Then, one specific student, Bob, has a doctor's note saying "Bob must wear a green hat" (ID Selector).
**Specificity** is the rulebook that decides Bob wears the **green hat**, not the uniform or the red hat, because a specific doctor's note outweighs general rules.

## 2. Definition
**CSS Selectors** are patterns used to select elements to style. **Specificity** is the weight given to a selector to determine which CSS rule applies when multiple rules compete.

## 3. Code Example

\`\`\`css
/* 1. Tag Selector (Least Specific) */
p {
    color: black;
}

/* 2. Class Selector */
.highlight {
    color: blue;
}

/* 3. ID Selector (Most Specific) */
#unique-msg {
    color: red;
}
\`\`\`

\`\`\`html
<p class="highlight" id="unique-msg">What color am I?</p>
<!-- Result: Red, because ID wins. -->
\`\`\`

## 4. Important Questions
*   **Q: How do you calculate specificity?**
    *   **A:** (IDs, Classes, Tags). \`#id\` (1,0,0) > \`.class\` (0,1,0) > \`div\` (0,0,1).
*   **Q: What happens if two rules have equal specificity?**
    *   **A:** The one written *last* in the CSS file wins (Cascading).

## 5. Summary
Selectors target elements. When conflicts occur, the specialized (ID) beats the specific (Class), which beats the general (Tag).
`
                    }
                ]
            }
        ]
    },
    {
        title: "Java Masterclass",
        modules: [
            {
                title: "Introduction to Java",
                topics: [
                    {
                        title: "Java Syntax and Variables",
                        type: "doc",
                        content: `# Java Syntax & Variables

## 1. The Story: The Warehouse
Imagine a giant Amazon warehouse. You have millions of items. To manage them, you need boxes.
You have small boxes for rings (byte), medium boxes for books (int), and reinforced crates for heavy gym weights (double). And you need to label every box (Variable Name).
**Java Variables** are these labeled boxes. Java is strict—you can't put a gym weight in a ring box (Type Safety).

## 2. Definition
**Variables** are containers for storing data values. In Java, every variable must have a specified **Data Type** (strongly typed).

## 3. Code Example

\`\`\`java
public class Warehouse {
    public static void main(String[] args) {
        // Declaring variables (Creating the boxes)
        int itemCount = 50;           // Integer box
        double price = 19.99;         // Decimal box
        boolean isStocked = true;     // Box representing Yes/No
        String productName = "Watch"; // Box for Text
        
        System.out.println("Item: " + productName);
        System.out.println("Total: " + (itemCount * price));
    }
}
\`\`\`

## 4. Important Questions
*   **Q: Why is Java called "Statically Typed"?**
    *   **A:** Because you must declare the type of a variable (\`int\`, \`String\`) before using it, and it cannot change type later.
*   **Q: What is the size of an \`int\` vs \`long\`?**
    *   **A:** \`int\` is 32-bit (approx +/- 2 billion). \`long\` is 64-bit (huge numbers).

## 5. Summary
Java requires strict variable declaration. Use specific types (\`int\`, \`double\`, \`boolean\`) to store data efficiently and safely.
`
                    }
                ]
            },
            {
                title: "Detailed OOPs Concepts",
                topics: [
                    {
                        title: "Inheritance and Polymorphism",
                        type: "doc",
                        content: `# Inheritance & Polymorphism

## 1. The Story: Genetic Traits
Think of DNA. You inherited your eyes and hair color from your parents (Inheritance). You didn't have to "code" your eye color from scratch; you reused their code.
However, even though you inherited the "Speak" ability, you might speak differently (voice, language) than your father (Polymorphism - Method Overriding).
**OOP** models this efficiently.

## 2. Definition
*   **Inheritance**: A mechanism where a new class adopts the attributes and methods of an existing class.
*   **Polymorphism**: The ability of an object to take many forms, usually allowing a subclass to define a specific implementation of a method declared in its parent.

## 3. Code Example

\`\`\`java
// Parent Class
class Animal {
    void makeSound() {
        System.out.println("Some generic sound");
    }
}

// Child Class (Inheritance)
class Dog extends Animal {
    // Polymorphism (Overriding)
    @Override
    void makeSound() {
        System.out.println("Bark! Bark!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myPet = new Dog();
        myPet.makeSound(); // Output: Bark! Bark!
    }
}
\`\`\`

## 4. Important Questions
*   **Q: Does Java support Multiple Inheritance (extending two classes)?**
    *   **A:** No, to avoid complexity (Diamond Problem). It uses Interfaces instead.
*   **Q: What is the keyword to inherit a class?**
    *   **A:** \`extends\`.

## 5. Summary
Inheritance promotes code reuse (Don't Repeat Yourself). Polymorphism allows flexibility, letting different objects respond to the same method call in their own unique way.
`
                    }
                ]
            },
            {
                title: "Java Frameworks and More",
                topics: [
                    {
                        title: "Maven - Project Management Tool",
                        type: "doc",
                        content: `# Maven: Project Management

## 1. The Story: The Chef's Shopping List
Imagine you are a head chef cooking a massive wedding banquet. You need flour, eggs, sugar, and specialized chocolates from Belgium.
Instead of driving to 10 different stores yourself (Downloading JARs manually), you just write a **Shopping List** (pom.xml) and give it to a **Professional Shopper** (Maven). The shopper goes out, finds the exact brands and versions you asked for, and puts them in your pantry.
**Maven** is that shopper for Java coding.

## 2. Definition
**Maven** is a build automation tool used primarily for Java projects. It addresses two aspects of building software: how software is built, and its dependencies.

## 3. Code Example (pom.xml)

\`\`\`xml
<project>
  <!-- The Shopping List -->
  <groupId>com.allcode</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>

  <dependencies>
    <!-- We need the Spring Framework ingredient -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>5.3.10</version>
    </dependency>
  </dependencies>
</project>
\`\`\`

## 4. Important Questions
*   **Q: What is the POM?**
    *   **A:** Project Object Model. It translates your project structure and dependencies into an XML file Maven can read.
*   **Q: Where does Maven store downloaded libraries?**
    *   **A:** In the Local Repository (usually \`.m2\` folder in your user home directory).

## 5. Summary
Maven simplifies project setups. You declare *what* you need in \`pom.xml\`, and Maven handles the *how* (downloading, compiling, packaging).
`
                    }
                ]
            }
        ]
    }
];

mongoose.connect(mongoURI).then(async () => {
    console.log('Connected to DB for Deep Story Seed...');

    for (const data of coursesData) {
        let course = await Course.findOne({ title: data.title });
        if (!course) {
            console.log(`Creating ${data.title}...`);
            course = new Course(data);
            await course.save();
            continue;
        }
        console.log(`Updating ${data.title}...`);

        for (const modData of data.modules) {
            let module = course.modules.find(m => m.title === modData.title);
            if (!module) {
                course.modules.push({ title: modData.title, topics: [] });
                await course.save();
                course = await Course.findOne({ title: data.title });
                module = course.modules.find(m => m.title === modData.title);
            }

            for (const topicData of modData.topics) {
                let topic = module.topics.find(t => t.title === topicData.title);
                if (!topic) {
                    module.topics.push({
                        title: topicData.title,
                        type: 'doc',
                        content: topicData.content,
                        completed: false
                    });
                } else {
                    console.log(`  Updating Content: ${topicData.title}`);
                    topic.content = topicData.content;
                    topic.type = 'doc';
                }
            }
        }
        await course.save();
    }
    console.log('Story Notes Seeding Done.');
    mongoose.disconnect();
    process.exit();
}).catch(e => console.log(e));
