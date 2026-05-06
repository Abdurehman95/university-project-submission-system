Create a professional Entity Relationship Diagram (ERD) for a system called:

"University Project Submission Management System (UPSMS)"

The system manages the full lifecycle of academic projects including creation, assignment, submission, review, grading, and archiving.

---

🎯 OBJECTIVE:
Design a normalized relational database schema that supports:

* Role-based users (Admin, Instructor, Student)
* Project creation and assignment
* Individual and group projects
* Submission with version control
* Review and grading workflow
* Notifications and audit tracking

---

📦 ENTITIES AND ATTRIBUTES:

1. Users

* id (PK)
* name
* email (unique)
* password
* role_id (FK)
* department_id (FK)
* created_at

2. Roles

* id (PK)
* name (Admin, Instructor, Student)

3. Departments

* id (PK)
* name

4. Project_Categories

* id (PK)
* name
* description

5. Academic_Sessions

* id (PK)
* name
* start_date
* end_date

6. Projects

* id (PK)
* title
* description
* objectives
* requirements
* deliverables
* deadline
* category_id (FK)
* instructor_id (FK → Users)
* session_id (FK)
* is_group_project
* created_at

7. Project_Groups

* id (PK)
* name
* project_id (FK)

8. Group_Members

* id (PK)
* group_id (FK)
* student_id (FK → Users)

9. Project_Assignments

* id (PK)
* project_id (FK)
* student_id (FK, nullable)
* group_id (FK, nullable)
* assigned_by (FK → Users)
* status (assigned, accepted, in_progress, submitted, under_review, revision_required, resubmitted, approved, graded, archived)
* assigned_at
* accepted_at

10. Submissions

* id (PK)
* assignment_id (FK)
* version
* submitted_at
* is_late
* status

11. Submission_Files

* id (PK)
* submission_id (FK)
* file_name
* file_url
* file_type

12. Reviews

* id (PK)
* submission_id (FK)
* instructor_id (FK → Users)
* feedback
* decision (approved, revision_required)
* created_at

13. Grades

* id (PK)
* submission_id (FK)
* score
* grade_letter
* rubric_data (JSON)
* graded_by (FK → Users)
* graded_at

14. Notifications

* id (PK)
* user_id (FK)
* title
* message
* is_read
* created_at

15. Audit_Logs

* id (PK)
* user_id (FK)
* action
* entity
* entity_id
* timestamp

---

🔗 RELATIONSHIPS (VERY IMPORTANT):

* One Role → Many Users

* One Department → Many Users

* One Instructor (User) → Many Projects

* One Project Category → Many Projects

* One Academic Session → Many Projects

* One Project → Many Project Groups

* One Group → Many Group Members

* One User (Student) → Can belong to Many Groups

* One Project → Many Assignments

* One Assignment → Assigned to ONE Student OR ONE Group

* One Assignment → Many Submissions (version control)

* One Submission → Many Files

* One Submission → Many Reviews

* One Submission → One Grade

* One User → Many Notifications

* One User → Many Audit Logs

---

📐 DIAGRAM REQUIREMENTS:

* Use Crow’s Foot notation
* Clearly show Primary Keys (PK) and Foreign Keys (FK)
* Show cardinality (1:N, M:N)
* Avoid redundancy (normalized design)
* Separate entities for submissions, reviews, and grades
* Ensure assignment acts as the central linking entity

---

🎨 LAYOUT INSTRUCTION:

Organize diagram in layers:

Top Layer:
Roles, Departments

Middle Layer:
Users → Projects → Assignments

Lower Layer:
Groups → Submissions → Files → Reviews → Grades

Side Layer:
Notifications, Audit Logs

---

🏁 FINAL EXPECTATION:

The ER diagram should clearly represent:

* Full project lifecycle workflow
* Support for both individual and group assignments
* Traceability of submissions and grading
* Clean, scalable academic system design

Make the diagram clean, readable, and suitable for university-level project submission.
