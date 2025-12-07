const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        console.log('--- verifyAdmin Request Headers ---');

        const adminEmail = req.headers['adminemail'] || req.headers['adminEmail'];
        const adminPassword = req.headers['adminpassword'] || req.headers['adminPassword'];

        console.log('Extracted credentials:', { adminEmail: adminEmail, adminPassword: adminPassword ? '******' : 'MISSING' });

        if (!adminEmail || !adminPassword) {
            return res.status(401).json({
                message: 'Admin credentials required. Only administrators can perform this action.'
            });
        }

        const admin = await User.findOne({ email: adminEmail });

        if (!admin || admin.password !== adminPassword || admin.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = verifyAdmin;
