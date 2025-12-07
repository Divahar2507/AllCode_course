# User Approval Workflow

## Overview
We have implemented a **User Approval System** to control access to the platform. 
1. **Public Registration**: Anyone can sign up, but their account is set to `Pending`.
2. **Admin Approval**: Admins must approve pending users via the Admin Panel before they can login.

## Workflow

### 1. Student Registration (Public)
- **URL**: `http://localhost:3000/register`
- **Action**: User fills out Name, Email, Password.
- **Result**: 
  - Account created in database.
  - Status: `Pending` (`isApproved: false`).
  - User **cannot** login yet.

### 2. Admin Review
- **URL**: `http://localhost:3000/admin`
- **Action**: Login as Admin (`admin@allcode.com` / `admin123`).
- **Notification**: A red badge on the "Users" tab shows the count of pending users.
- **Review**:
  - Pending users are highlighted in red/pink.
  - Status shows as "Pending".
  - An **Approve** (Shield Icon) button appears next to their name.

### 3. Approval
- **Action**: Admin clicks the **Approve** button.
- **Result**:
  - User status changes to `Active` (`isApproved: true`).
  - User can now login via the Login page (when implemented) or API.

### 4. Login Check
- **Endpoint**: `POST /api/users/login`
- **Logic**:
  - Checks if email/password match.
  - **New**: Checks if `users.isApproved === true`.
  - **Error**: If pending, returns 403 "Account pending approval".

## API Endpoints

### **POST** `/api/users/signup` (Public)
- Creates a new user with `isApproved: false`.
- **Body**: `{ name, email, password }`

### **PUT** `/api/users/:id/approve` (Admin Only)
- Sets `isApproved: true` for the specified user.
- **Headers**: `{ adminEmail, adminPassword }`

## Files Changed.
- `backend/models/User.js`: Added `isApproved` field.
- `backend/routes/users.js`: Updated Logic for login, signup, and approval.
- `frontend/src/pages/Register.js`: New registration page.
- `frontend/src/pages/Admin.js`: Updated UI to manage approvals.

## Testing
1. Go to `/register` and sign up as a new user.
2. Try to login (should fail / or check database status).
3. Go to `/admin`, login as admin.
4. Go to Users tab, see the pending user.
5. Click Approve.
6. User can now login.
