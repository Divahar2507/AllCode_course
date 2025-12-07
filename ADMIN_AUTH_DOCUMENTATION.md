# Admin-Only User Registration System

## Overview
The AllCode platform implements a secure admin-only user registration system and comprehensive course management tools.

## Key Features
- **Restricted Registration**: Only admins can register users.
- **Curriculum Management**: Admins can manage modules and topics.
- **Batch Management**: Admins can organize students into monthly cohorts.

## Implementation Details

### Backend Changes
- **Middleware**: `verifyAdmin` ensures only authorized access.
- **Routes**: Protected endpoints for Users, Courses (Modules/Topics), and Batches.

### Frontend Changes
- **Admin Panel**: Centralized dashboard for all management tasks.
- **Authentication**: secure admin login handling.

## How to Use

### 1. User Management
- **Login**: `/admin` with `admin@allcode.com` / `admin123`.
- **Create User**: "Users" tab > "+ Add User".
- **Assign Batch**: "Users" tab > Select Batch from dropdown.

### 2. Course Management
- **Create Course**: "Courses" tab > "+ Add Course".
- **Manage Curriculum**:
  1. Click the **List Icon** (Curriculum Manager) next to a course.
  2. **Add Module**: Enter title and click "Add Module".
  3. **Add Topic**: Click "+ Add Topic" inside a module, enter Title/URL, click "Add".
  4. **Delete**: Use trash icons to remove items.

### 3. Batch Management
- **Create Batch**: "Batches" tab > "+ Create Batch".
- **Manage**: View student counts and delete batches.

## API Endpoints (Admin Protected)
- `POST /api/users/register` - Create User
- `POST /api/courses` - Create Course
- `POST /api/courses/:id/modules` - Add Module
- `POST /api/courses/:id/modules/:mid/topics` - Add Topic
- `POST /api/batches` - Create Batch

## Security
- Passwords should be hashed in production.
- Use HTTPS.
- Change default admin credentials.

## Troubleshooting
- **401/403 Errors**: Check admin headers and role.
- **Login Loop**: Check `isAdminLoggedIn` state persistence.

---
**Version**: 1.2.0 | **Status**: ✅ Active
