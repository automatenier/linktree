# AGENTS.md — jordanengo.com & Staging Rules

## 🚨 MANDATORY ZERO-ASSUMPTIONS DEPLOYMENT CONTRACT

This repository is served by Cloudflare via Wrangler according to `wrangler.jsonc`:
```json
"assets": { "directory": "./dist" }
```

### 1. Root vs. Dist Source of Truth
* **Never edit files in `dist/` directly.** All human and agent edits MUST occur in the root directory (`index.html`, `site.css`, `agentz-pivot.html`, etc.).
* `dist/` is gitignored and is generated strictly as the deployment artifact.

### 2. Mandatory Build Step
* **Every change to HTML, CSS, or assets MUST be followed by:**
  ```bash
  bash build.sh
  ```
  This command syncs all root assets into `dist/`.

### 3. Verification Gate (No Done Without Proof)
* An agent MUST NEVER claim a task is complete or report "updated" until verifying:
  1. `bash build.sh` executed with exit code 0.
  2. Timestamps and file size of the modified file match between root and `dist/`:
     ```bash
     ls -l <file> dist/<file>
     ```
  3. If running a local preview server (`wrangler dev` or `python3 -m http.server`), verify via curl or browser probe that the served content contains the expected DOM changes.
* Never enter long diagnostic rabbit-holes. Follow Occam's Razor: check file timestamp, check git diff, and check `dist/` sync first.
