Dashboard
User Management
Courses
Enrollments
Submissions Overview
Reports & Analytics
System Settings
Activity Logs
Profile
---

# 📊 Dashboard Components

## 1️⃣ Summary Cards (Top Section)

| Card | Description |
|------|------------|
| Total Users | All registered users |
| Active Courses | Currently running courses |
| Total Assignments | Assignments created system-wide |
| Total Submissions | All student submissions |
| System Alerts | Flags or reported issues |

---

## 2️⃣ User Management

### Features
- Create new users
- Edit user details
- Assign roles (Student / Instructor / Admin)
- Disable / Activate accounts
- Reset passwords

### Displayed Fields
- Name
- Email
- Role
- Status
- Date Created
- Actions (Edit / Disable / Delete)

---

## 3️⃣ Course Management

### Features
- Create new courses
- Assign instructors
- Edit course details
- Archive or delete courses

### Displayed Fields
- Course name
- Course code
- Assigned instructor
- Enrolled students count
- Status

---

## 4️⃣ Enrollment Management

### Features
- Enroll students into courses
- Remove students
- View course enrollment lists
- Bulk enrollment (optional advanced feature)

---

## 5️⃣ Submissions Overview

### Purpose
System-level monitoring (not grading)

### Displayed Data
- Total submissions per course
- Late submission statistics
- Submission trends
- Flagged submissions (optional)

---

## 6️⃣ Reports & Analytics

### Available Reports
- User growth over time
- Course performance summary
- Submission activity trends
- Instructor workload report

### Export Options
- CSV export
- PDF report download

---

## 7️⃣ System Settings

### Configurable Options
- Allowed file upload types
- Maximum file size limit
- Deadline policy rules
- Role permission settings
- Email notification settings

---

## 8️⃣ Activity Logs

Tracks important system actions:

- User creation
- Role updates
- Course modifications
- Account deactivation
- Assignment deletion

Each log includes:
- Action type
- User responsible
- Timestamp
- Affected entity

---

# 🧑‍🎨 UI/UX Guidelines

- Clean administrative layout
- Data tables with pagination
- Search & filter functionality
- Confirmation modals for destructive actions
- Color indicators:
  - Green → Active
  - Yellow → Pending
  - Red → Disabled / Critical

---

# 🛠 Functional Requirements

- Secure JWT-based authentication
- Role-based route protection
- Server-side pagination
- Real-time statistics updates
- Audit logging for critical actions

---

# 🔗 Related System Modules

- Student Dashboard
- Instructor Dashboard
- Authentication Module
- Reporting Engine
- Notification System

---

# 🚀 Future Enhancements

- Advanced analytics dashboard
- System health monitoring
- AI anomaly detection
- Multi-university support
- Backup & restore management

---

# ✅ Conclusion

The Admin Dashboard serves as the **governance and control center** of the University Project Submission System.  

It ensures:
- Security
- Proper user role management
- Academic structure integrity
- Scalable system operations