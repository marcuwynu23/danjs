# Security policy — DAN (JavaScript / npm)

## Supported versions

Security fixes are applied to the **latest published npm line** and backported when practical:

| Version   | Supported          |
| --------- | ------------------ |
| 1.0.x     | :white_check_mark: |
| Before 1.0 | :x:                |

## Reporting a vulnerability

**Do not** use public GitHub issues for undisclosed security problems.

Please report via **[GitHub private vulnerability reporting](https://github.com/marcuwynu23/dan/security/advisories/new)** (repository **Security** tab → **Report a vulnerability**).

Include:

- Description and impact
- Steps to reproduce
- Affected versions or releases (if known)
- Optional: suggested fix or patch

## What to expect

- **Acknowledgment:** we aim to respond within **48 hours**
- **Updates:** we will keep you informed while we investigate and fix
- **Disclosure:** we coordinate public disclosure after a fix is available (credit unless you prefer anonymity)

## Scope

This policy covers the **`@marcuwynu23/dan`** npm package (parser, encoder, and published assets in this repository).

## Safe harbor

Good-faith security research that follows this policy (no unnecessary data access, no harm to users, prompt reporting) is considered authorized.

## Hardening tips for consumers

- Treat DAN as **untrusted input** until you validate the parsed structure for your application.
- Prefer **size limits** and timeouts when parsing from the network.
- **Upgrade** to patched releases when advisories are published.

Thank you for helping keep users safe.
