# 🎓 University Project Submission Management System (UPSMS) – Complete Project Workflow Documentation

## 📌 System Overview
The **University Project Submission Management System (UPSMS)** is a specialized academic platform focused entirely on the lifecycle of university projects rather than general student management. It is designed to streamline how academic projects are created, assigned, developed, submitted, reviewed, graded, and archived.

The platform connects **Administrators, Instructors, and Students** through a structured project-based ecosystem that ensures transparency, efficiency, and academic accountability.

---

# 👥 Core User Roles

| Role | Primary Responsibility | Main Objective |
| :--- | :--- | :--- |
| **Administrator** | Controls system structure, monitors workflows, and supervises academic project operations | Governance & Oversight |
| **Instructor / Supervisor** | Creates projects, assigns them, reviews submissions, and grades student work | Academic Supervision |
| **Student / Group** | Accepts assigned projects, develops them, submits deliverables, and responds to feedback | Project Execution |

---

# 🚀 FULL PROJECT LIFECYCLE WORKFLOW

# 🛠 PHASE 1: SYSTEM PREPARATION & PROJECT ENVIRONMENT SETUP

## Step 1: Administrator Establishes Project Framework
The Admin prepares the project ecosystem before any project begins.

### Admin Tasks:
- Create departments or academic programs
- Define project categories:
  - Final Year Project
  - Capstone Project
  - Semester Assignment
  - Research Thesis
- Set semester/session period
- Register instructors and supervisors
- Register students
- Assign instructors to project categories or departments
- Configure project deadlines and submission policies

### Example:
**Computer Science Department → Final Year Project → Mobile App Development → Assigned Supervisor: Dr. John**

---

# 👨‍🏫 PHASE 2: PROJECT CREATION & STUDENT ASSIGNMENT

## Step 2: Instructor Creates Project
The Instructor/Supervisor creates detailed project assignments.

### Required Project Details:
- Project Title
- Problem Statement
- Objectives
- Functional Requirements
- Deliverables
- Submission Deadline
- Grading Rubric
- Supporting Documents/Templates
- Group or Individual Type

### Example:
**Project Title:** Smart Inventory Management System  
**Deadline:** July 15  
**Deliverables:** Source Code + Technical Documentation + Presentation Slides

---

## Step 3: Project Assignment Process
The Instructor assigns the project directly to:
### Option A: Individual Student  
### Option B: Group of Students  

### Assignment Workflow:
- Instructor selects eligible students/groups
- System pushes dashboard notification
- Email/system alerts are sent
- Countdown timer activates
- Status becomes:
### 🟡 Assigned

---

# 👨‍🎓 PHASE 3: STUDENT PROJECT INTERACTION

## Step 4: Student Reviews Assigned Project
Student logs into dashboard and accesses:
- Project Title
- Objectives
- Technical Requirements
- Submission Deadline
- Deliverables
- Rubric
- Supervisor Instructions

---

## Step 5: Student Accepts Project
### Student Actions:
- Accept assignment
- Download resources
- Begin planning and development
- Track progress using dashboard

### Status Flow:
### 🟡 Assigned → 🔵 Accepted → 🟣 In Progress

---

## Step 6: Development Stage
Student or project group:
- Conducts research
- Designs solution
- Builds project
- Prepares documentation
- Creates final deliverables

### Dashboard Features:
- Milestone tracker
- Progress percentage
- Deadline reminders
- Supervisor announcements

---

# 📤 PHASE 4: PROJECT SUBMISSION

## Step 7: Final Upload
Student uploads:
- PDF Report
- Source Code
- Presentation
- Prototype files
- Additional resources

### System Validation:
- File type verification
- File size validation
- Deadline timestamp
- Completeness check

### Status Outcome:
- 🟢 Submitted On Time  
- 🔴 Late Submission  

---

## Step 8: Submission Confirmation
System automatically:
- Stores files securely
- Records timestamp
- Updates project status to:
### 🟠 Under Review
- Notifies Instructor

---

# 👨‍🏫 PHASE 5: INSTRUCTOR REVIEW & FEEDBACK

## Step 9: Instructor Accesses Submission
Instructor dashboard displays:
- Student/Group Name
- Submission Date
- Status
- Attached Files
- Deadline compliance

---

## Step 10: Evaluation Process
Instructor assesses:
- Technical implementation
- Innovation
- Requirement fulfillment
- Documentation quality
- Presentation
- Code structure

---

## Step 11: Decision Point
### Option A: Revision Required
- Instructor provides correction notes
- Student notified
- Status:
### 🟠 Revision Required

### Option B: Approved
- Grade submitted
- Feedback published
- Status:
### 🟢 Graded & Completed

---

# 🔁 PHASE 6: REVISION CYCLE (IF APPLICABLE)

## Step 12: Student Resubmission
Student:
- Reviews feedback
- Applies corrections
- Reuploads revised deliverables

### Status:
### 🔵 Resubmitted → 🟠 Under Re-Review

---

# 🛡 PHASE 7: ADMINISTRATIVE OVERSIGHT

## Step 13: Admin Monitoring Dashboard
Admin tracks:
- Total projects assigned
- Active projects
- Submission rates
- Late projects
- Revision cycles
- Instructor grading completion
- Department performance

---

## Step 14: Audit & Compliance
Admin reviews:
- Submission timestamps
- User activity
- Instructor responsiveness
- Project completion rates
- Security logs

---

# 📊 PHASE 8: FINALIZATION & REPORTING

## Step 15: Grade Release
Students can:
- View final score
- Access instructor feedback
- Download reviewed files
- Compare rubric performance

---

## Step 16: Archiving
System archives:
- Final submission
- Grades
- Revision history
- Feedback
- Submission metadata

---

## Step 17: Administrative Reporting
### Reports Generated:
### Student-Level:
- Submission status
- Performance
- Completion trends

### Instructor-Level:
- Review efficiency
- Project supervision metrics

### Institution-Level:
- Department performance
- Completion percentages
- Academic quality indicators

---

# 🔄 PROJECT STATUS LIFECYCLE

## 1. Assigned  
## 2. Accepted  
## 3. In Progress  
## 4. Submitted  
## 5. Under Review  
## 6. Revision Required (Optional)  
## 7. Resubmitted (Optional)  
## 8. Approved  
## 9. Graded  
## 10. Archived  

---

# 🔔 COMMUNICATION & NOTIFICATION SYSTEM

## Students Receive:
- New project alerts
- Deadline reminders
- Submission confirmations
- Revision requests
- Final grade notifications

## Instructors Receive:
- Submission alerts
- Late notices
- Revision submissions

## Admin Receives:
- Workflow analytics
- Compliance issues
- Performance reports

---

# 🎨 UX/UI DESIGN GOALS
- Glassmorphism dashboard
- Real-time status indicators
- Interactive project cards
- Deadline countdown timers
- Animated workflow transitions
- Responsive mobile/desktop design

---

# 🎯 CORE SYSTEM PURPOSE

## UPSMS focuses exclusively on:
### Create Project → Assign Project → Accept Project → Build Project → Submit Project → Review Project → Revise Project (Optional) → Grade Project → Archive Project

---

# 🏁 FINAL SUMMARY
The **University Project Submission Management System** is not a broad student management platform.

It is a **dedicated academic project operations system** that ensures:
- Structured project supervision
- Transparent student workflow
- Efficient grading
- Institutional oversight
- Academic excellence

---
# ?? Postman Security & Environment Setup

To ensure academic and system security, the following measures are implemented for API testing:

## 1. Environment Protection
- Sensitive keys are stored in .env and never pushed to GitHub.
- *.postman_environment.json is ignored by Git.

## 2. Using the Template
- Use Local.postman_environment.json.example as a starting point.
- Import into Postman and update variables from your local .env.

---
