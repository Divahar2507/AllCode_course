const axios = require('axios');

(async () => {
    try {
        console.log('Fetching courses...');
        const courses = await axios.get('http://127.0.0.1:5000/api/courses');
        if (courses.data.length === 0) {
            console.log('No courses found.');
            return;
        }
        const courseId = courses.data[0]._id;
        console.log('Target Course:', courseId, courses.data[0].title);

        console.log('Adding Module...');
        const res = await axios.post(`http://127.0.0.1:5000/api/courses/${courseId}/modules`,
            { title: 'Script Module' },
            { headers: { adminEmail: 'admin@allcode.com', adminPassword: 'admin123' } }
        );

        console.log('Success! Module Count:', res.data.modules.length);
        const lastMod = res.data.modules[res.data.modules.length - 1];
        console.log('Last Module:', lastMod.title);

    } catch (e) {
        console.error('Error:', e.response ? JSON.stringify(e.response.data) : e.message);
    }
})();
