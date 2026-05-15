# BrainDump — Product Requirements Document

## Problem
The user forgets thoughts, ideas, and intentions easily.
By the time they remember, it's too late to act on them.

## Solution
A zero-friction mobile-first app to capture thoughts instantly.
No categories. No organization. Just dump it and move on.

## Target User
Solo user. Always on mobile. Needs to capture thoughts in under 3 seconds.

## MVP Features
- [x] Text input, auto-focused when app opens
- [x] "Dump It" button to save the thought
- [x] Screen clears after saving, ready for next thought
- [x] Side panel showing all dumps in chronological order
- [x] Each dump shows text + time it was captured
- [x] Persists across refresh via SQLite database
- [x] Delete individual dump
- [x] Mark dump as done with strikethrough
- [x] Done dumps sort to bottom
- [x] Dump count in header
- [x] Search through dumps
- [x] Delete all with confirmation

## Out of Scope for MVP
- Categories or tags
- Priority sorting
- User accounts
- PWA / installable app

## Tech Stack
- Next.js 16
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite

## Next Steps
- [ ] Deployment — host on internet, accessible from phone
- [ ] User accounts — multi-user support
- [ ] PWA — installable on phone like a native app

## Version
v0.1 — MVP completed May 2026