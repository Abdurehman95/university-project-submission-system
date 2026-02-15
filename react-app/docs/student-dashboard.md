# 🎓 Student Dashboard – University Project Submission System

## 📌 Overview
The **Student Dashboard** is the primary landing page for students after successful authentication. It serves as a centralized hub providing a comprehensive overview of academic activities, including enrolled courses, assignments, submissions, grades, and upcoming deadlines.

The dashboard is designed with a **simple, informative, and action-oriented** user interface to enhance student productivity and engagement.

---

## 🎯 Objectives
*   **Snapshot View:** Provide students with a clear and immediate overview of their academic progress.
*   **Task Management:** Highlight pending and upcoming tasks to ensure nothing is missed.
*   **Quick Access:** Enable fast navigation to assignment submissions and instructor feedback.
*   **Time Management:** Improve scheduling through automated reminders and deadline countdowns.

---

## 🧭 Navigation Access
The Student Dashboard is automatically accessed upon authentication for users with the `Student` role. It can also be reached via the primary navigation sidebar/header.

---

## 🧩 Dashboard Components

### 1️⃣ Summary Cards (Top Section)
Responsive cards providing high-level metrics at a glance.

| Card | Description | icon |
| :--- | :--- | :--- |
| **Enrolled Courses** | Total number of active courses the student is registered in. | `FiBook` |
| **Pending Assignments** | Number of assignments currently awaiting student submission. | `FiClock` |
| **Submitted Assignments** | Total count of successfully submitted assignments. | `FiCheckSquare` |
| **Average Score** | The student's cumulative average marks across all graded assignments. | `FiTrendingUp` |

---

### 2️⃣ Upcoming Deadlines
**Purpose:** Help students prioritize tasks and manage time effectively.

**Details Displayed:**
*   **Assignment Title:** Link to the submission page.
*   **Course Name:** The department/course associated with the task.
*   **Due Date:** Clear date and time formatting.
*   **Countdown:** Dynamic indicator (e.g., "2 days left", "5 hours remaining").
*   **Status Indicator:** 
    *   🟢 **On Track** (More than 3 days remaining)
    *   🟡 **Due Soon** (Less than 3 days remaining)
    *   🔴 **Overdue** (Past deadline)

---

### 3️⃣ Recent Submissions
**Purpose:** Quick access to recently performed work for tracking and review.

**Fields:**
*   Assignment Name
*   Course
*   Submission Date & Time
*   **Status:** (Submitted / Late / Graded)
*   **Action:** "View Details" button to see the submitted file and history.

---

### 4️⃣ Grades & Feedback Preview
**Purpose:** Provide immediate visibility into academic performance and instructor comments.

**Details:**
*   Recently graded assignments with obtained marks.
*   Instructor feedback snippet (expandable).
*   "View Full Feedback" option linking to the detailed grade report.

---

### 5️⃣ Notifications Panel
**Purpose:** Real-time alerts to keep students informed of critical updates.

**Examples:**
*   Assignment deadline reminders (24h/1h before).
*   New feedback or grades posted by instructors.
*   Late submission warnings.
*   General course announcements.

---

## 📊 Data Visualization (Advanced Features)
*   **Submission Progress Chart:** Circular progress bar showing completion percentage.
*   **Course Performance Graph:** Line/Bar chart mapping grades across different courses over time.

---

## 🔐 Permissions & Access Control
*   **Authorization:** Restricted to authenticated users with the **Student** role.
*   **Data Privacy:** Students can **only** view their own enrollment, submission, and grade data.
*   **Isolation:** No access to instructor-specific views or administrative management panels.

---

## 🛠 Functional Requirements
*   **Real-time Data:** Fetch data from the API on component mount.
*   **Live Updates:** Statistics should auto-update immediately after a student completes a submission.
*   **Responsive UI:** Fully optimized for Mobile, Tablet, and Desktop viewports.
*   **Security:** All API communication secured via JWT (JSON Web Tokens).

---

## 🧑‍🎨 UI/UX Guidelines
*   **Aesthetics:** Minimalist design with a focus on readability and modern typography.
*   **Color Palette:**
    *   `#10B981` (Green) → Completed / On Track
    *   `#F59E0B` (Yellow) → Due Soon / Pending
    *   `#EF4444` (Red) → Overdue / Critical
*   **Interactivity:** Subtle hover effects and smooth transitions (using `framer-motion`).

---

## 🔗 Related Pages
*   [My Courses](/courses)
*   [Assignments](/assignments)
*   [Submissions](/submissions)
*   [Grades & Feedback](/grades)
*   [Calendar](/calendar)
*   [Profile Settings](/profile)

---

## 🚀 Future Enhancements
*   **Personalization:** AI-driven study tips based on performance trends.
*   **Prioritization:** Automatic sorting of assignments by "Urgency" and "Weight".
*   **Export:** Option to download academic transcripts/grades as PDF.
*   **Dark Mode:** Switch between Light and Dark themes for better eye comfort.
