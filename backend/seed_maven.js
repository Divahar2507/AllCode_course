const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/allcode';

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            // 1. Find or Create "Java Masterclass" Course
            let course = await Course.findOne({ title: 'Java Masterclass' });
            if (!course) {
                console.log('Creating Java Masterclass course...');
                course = new Course({
                    title: 'Java Masterclass',
                    mentor: 'Kodnest Expert',
                    description: 'Comprehensive guide to Java Frameworks and Tools.',
                    time: '10:00 AM - 12:00 PM',
                    type: 'self-paced',
                    accentColor: '#E76F00', // Orange (Java style)
                    startDate: '2025-01-01',
                    status: 'In Progress',
                    modules: []
                });
                await course.save();
            } else {
                console.log('Found existing Java Masterclass course.');
            }

            // 2. Check/Add Module "Java Frameworks and More"
            let module = course.modules.find(m => m.title === 'Java Frameworks and More');
            if (!module) {
                console.log('Adding Module 6...');
                course.modules.push({
                    title: 'Java Frameworks and More',
                    topics: []
                });
                await course.save();
                // Refresh to get ID
                course = await Course.findById(course._id);
                module = course.modules[course.modules.length - 1];
            } else {
                console.log('Module found.');
            }

            // 3. Add Content Topic "Maven - Project Management Tool"
            const topicTitle = 'Maven - Project Management Tool';
            let topic = module.topics.find(t => t.title === topicTitle);

            const mavenContent = `
# Overview of Maven & Challenges Without Maven

Imagine a group of people in a village who want to build a small community hall. Everyone brings their own bricks, cement, wood, and tools. But there is no clear plan. Some bring extra materials, while others forget important ones. Sometimes the work stops because the tools do not fit, or the design changes at the last moment. Building becomes very slow, and people get confused.

Now think about Java developers building software. Without proper tools and planning, their work can also become messy and slow. This is where **Maven** comes in as a helper.

## What Is Maven?

### Standard Definition:
> Maven is a tool that helps Java developers manage their projects easily. It works like a smart organizer that brings all the things needed for the project, keeps them in the right place, and makes sure everything fits together.

### In simple words:
Maven is a build tool for Java that helps to manage libraries, project structure, and build process automatically.

## Why Should We Learn Maven?

When we build Java programs, we often use extra libraries (like drivers, tools, or frameworks). Without Maven, we have to download these libraries by hand, store them properly, and set them up. This takes a lot of time and leads to mistakes.

Maven saves us from all this trouble by:
* Downloading libraries automatically.
* Organizing the project neatly.
* Making the build process faster and easier.

## Challenges Without Maven
(To be continued...)
            `;

            if (!topic) {
                console.log('Adding Maven Topic...');
                module.topics.push({
                    title: topicTitle,
                    type: 'doc', // Document type
                    content: mavenContent,
                    completed: false
                });
            } else {
                console.log('Updating Maven Topic content...');
                topic.content = mavenContent;
                topic.type = 'doc';
            }

            await course.save();
            console.log('Successfully seeded Maven content.');

        } catch (err) {
            console.error('Error:', err);
        } finally {
            mongoose.disconnect();
            process.exit();
        }
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });
