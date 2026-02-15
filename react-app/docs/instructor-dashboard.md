# 👩‍🏫 Instructor Dashboard – University Project Submission System

## 📌 Overview
The **Instructor Dashboard** is the primary workspace for instructors after login.  
It provides a centralized view for managing courses, assignments, student submissions, grading, and performance tracking.

The dashboard is designed to support **efficient review, grading, and academic oversight**.

---

## 🎯 Objectives
- Provide instructors with a clear overview of teaching activities
- Enable fast access to student submissions
- Simplify grading and feedback workflows
- Track course progress and student performance

---

## 🧭 Navigation Access
The Instructor Dashboard is accessible via:

//login

---

## 🧩 Dashboard Components

### 1️⃣ Summary Cards (Top Section)
Displayed as responsive cards.

| Card | Description |
|----|------------|
| Active Courses | Number of courses currently taught |
| Total Assignments | Assignments created by the instructor |
| Pending Reviews | Submissions awaiting grading |
| Late Submissions | Number of late submissions |

---

### 2️⃣ Course Overview
**Purpose:** Quick access to managed courses

**Details Displayed**
- Course name
- Course code
- Total enrolled students
- View course button

---

### 3️⃣ Recent Submissions
**Purpose:** Prioritize grading tasks

**Fields**
- Student name
- Assignment title
- Course
- Submitted date
- Status (On-time / Late)
- Review & Grade button

---

### 4️⃣ Assignment Management
**Purpose:** Monitor assignment activity

**Details**
- Assignment title
- Due date
- Submission count
- Pending grading count
- Edit / View assignment options

---

### 5️⃣ Student Performance Snapshot
**Purpose:** Academic insight

**Metrics**
- Average score per course
- Completion rate
- Submission trends
- Low-performing students indicator (optional)

---

### 6️⃣ Notifications Panel
**Purpose:** Instructor alerts

**Examples**
- New submissions received
- Approaching deadlines
- Late submission alerts
- System announcements

---

## 📊 Data Visualization (Optional – Advanced)
- Submission timeline chart
- Course performance bar chart
- Assignment completion rate graph

---

## 🔐 Permissions & Access Control
- Only authenticated users with **Instructor role** can access this dashboard
- Instructors can only view:
  - Their own courses
  - Enrolled students
  - Related assignments and submissions
- No access to admin-level controls

---

## 🛠 Functional Requirements
- Real-time update of submissions
- Secure file download
- Inline grading and feedback submission
- JWT-based API protection
- Pagination for large student lists

---

## 🧑‍🎨 UI/UX Guidelines
- Clean and professional layout
- Prioritize grading actions
- Status indicators:
  - Green → Graded
  - Yellow → Pending Review
  - Red → Late
- Responsive design for all devices

---

## 🔗 Related Pages
- My Courses
- Assignments
- Submissions
- Gradebook
- Students
- Reports
- Profile

---

## 🚀 Future Enhancements
- Bulk grading support
- Rubric-based evaluation
- Plagiarism detection integration
- Export grades to CSV/PDF
- Advanced analytics dashboard

---

## ✅ Conclusion
The Instructor Dashboard serves as a **control center for academic delivery**, enabling instructors to manage coursework, evaluate submissions, and monitor student performance efficiently.
