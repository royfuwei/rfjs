---
"orm-app": patch
---

ci(orm-app): enable npmrc secret mount in Docker builds

Add restricted cache mount for .npmrc to allow secure dependency installation during Docker builds.
Apply changes to both main Dockerfile and Turbo-specific Dockerfiles.
