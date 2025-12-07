const axios = require('axios');

(async () => {
    try {
        const courses = await axios.get('http://127.0.0.1:5000/api/courses');
        const course = courses.data[0];
        console.log('Course:', course.title);

        const modulesToDelete = course.modules.filter(m => m.title === 'Script Module' || m.title === 'New Admin Module');

        for (const m of modulesToDelete) {
            console.log('Deleting:', m.title);
            await axios.delete(`http://127.0.0.1:5000/api/courses/${course._id}/modules/${m._id}`, {
                headers: { adminEmail: 'admin@allcode.com', adminPassword: 'admin123' }
            });
        }
        console.log('Cleanup done.');

    } catch (e) {
        console.error('Error:', e.message);
    }
})();
