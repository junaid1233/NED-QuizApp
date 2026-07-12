# NED MasterPrep — Product Plan

> **Disclaimer:** Independent preparation platform. Not officially affiliated with or endorsed by NED University.

## Phase 1 Audit (Current Codebase)

### Working
- React quiz flow: Main → Quiz → Result
- Local question bank (`question.json`, 100 questions)
- Answer shuffling, scoring, grade calculation
- Results stats + QNA review
- PWA service worker, Storybook stories

### Broken / Incomplete
| Issue | Details |
|-------|---------|
| Category filter | Dropdown shown but never applied; labels don't match JSON categories |
| Difficulty filter | State exists, no UI, no `difficulty` field in JSON |
| Question count | Always loads all 100 questions |
| Timer | Hardcoded 1 hour; picker UI removed |
| Countdown | Interval recreated every second; incorrect elapsed time |
| Timeout scoring | Current answer + remaining questions not scored on time-up |
| Question mutation | `options` shuffled in-place on source data |
| Branding | Still "QuizApp by Junaid"; no product disclaimer |
| Backend | None — static JSON only |

### Question Bank (Current)
- **Artificial Intelligence** — 70 questions
- **Analytical Geometry** — 10 questions
- **Programming (C/Java)** — 10 questions
- **Digital Logic** — 10 questions

---

## Proposed Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    NED MasterPrep                        │
├─────────────────────────────────────────────────────────┤
│  Frontend: React (Vite migration in Phase 2+)           │
│  Auth: Supabase Auth (Phase 3)                          │
│  Database: Supabase PostgreSQL (Phase 3)                │
│  Storage: Supabase Storage (Phase 5)                    │
│  Deploy: Vercel (frontend) + Supabase (backend)         │
└─────────────────────────────────────────────────────────┘
```

### Phase Roadmap

| Phase | Scope |
|-------|-------|
| **1** ✅ | Audit, fix filters/timer/scoring, rebrand, disclaimer |
| **2** | Modern UI, landing page, dashboard, dark mode |
| **3** | Supabase auth, database schema, question bank API |
| **4** | Test modes, analytics, bookmarks, history |
| **5** | Admin panel, bulk import, audit trail |
| **6** | Tests, security, PWA polish, deployment docs |

---

## Database Schema (Phase 3+)

```sql
-- profiles (extends Supabase auth.users)
profiles: id, email, full_name, role (student|admin), avatar_url, streak, created_at

-- subjects
subjects: id, name, slug, description, icon, sort_order, is_active

-- topics
topics: id, subject_id, name, slug, sort_order

-- questions
questions: id, subject_id, topic_id, question_text, option_a/b/c/d,
           correct_option, explanation, difficulty, source_reference,
           is_verified, is_active, created_by, created_at

-- mock_tests
mock_tests: id, title, description, duration_seconds, question_count,
            is_premium, is_active

-- test_attempts
test_attempts: id, user_id, mock_test_id, mode, score, total, percentage,
               time_taken_seconds, started_at, completed_at

-- attempt_answers
attempt_answers: id, attempt_id, question_id, selected_option,
                 is_correct, is_marked_review, time_spent_seconds

-- bookmarks, achievements, announcements, audit_logs (Phase 4-5)
```

---

## Pages & User Flows

### Public
- Landing → About → FAQ → Contact → Privacy → Terms

### Student
- Sign up / Login → Dashboard → Choose test mode → Quiz → Results → Review → Profile → History

### Admin
- Dashboard → Questions CRUD → Bulk import → Users → Announcements → Reports

---

## Phase 1 Changes (Implemented)

- `questionService.js` — filter, normalize, non-mutating shuffle
- Categories aligned with actual JSON subjects
- Restored difficulty, question count, timer pickers
- Fixed countdown interval and timeout scoring
- Rebranded to **NED MasterPrep** with disclaimer
- Added unit tests for question filtering
