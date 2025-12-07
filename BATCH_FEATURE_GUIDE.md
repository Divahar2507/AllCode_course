# AllCode Batch Management System

This document outlines the new Batch Management features added to the Admin Panel.

## Overview
The Batch System allows administrators to group students into monthly batches (e.g., "December 2025"). This helps in organizing cohorts and managing course schedules.

## Features

### 1. Manage Batches
- **Navigate to:** Admin Dashboard > **Batches** tab.
- **View Batches:** See a list of all active batches, their start dates, and the number of students assigned.
- **Create Batch:**
  - Click **+ Create Batch**.
  - Enter a descriptive Name (e.g., "January 2026").
  - Select a Start Date.
  - Click **Create Batch**.
- **Delete Batch:** Remove a batch if needed (Note: This does not delete the students, but unlinks them).

### 2. Assign Users to Batches
- **Navigate to:** Admin Dashboard > **Users** tab.
- **Assign Batch:**
  - Locate the student in the list.
  - Use the **Batch** dropdown menu in the student's row.
  - Select the desired batch.
  - The system automatically saves the assignment.
- **Filtering:** (Future) Filter users by their assigned batch.

## Technical Details
- **Backend Model:** `Batch` (`name`, `startDate`).
- **User Association:** `User` model now has a `batch` field referencing the `Batch` model.
- **API Endpoints:**
  - `GET /api/batches` - List all batches.
  - `POST /api/batches` - Create a new batch (Admin only).
  - `PUT /api/users/:id/batch` - Assign a user to a batch (Admin only).

## Usage Tips
- **Monthly Batches:** It is recommended to create batches named after the month and year (e.g., "Dec 2025", "Jan 2026") for clarity.
- **Pre-created Data:** We have initialized the system with "December 2025" and "January 2026" batches for you to start immediately.
