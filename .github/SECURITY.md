# Security Policy

## Supported Versions

We actively support the following versions of DAN with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in DAN, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **Email**: [INSERT SECURITY EMAIL ADDRESS]
2. **GitHub Security Advisory**: Use the "Report a vulnerability" button on the repository's Security tab

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)
- Your contact information (optional, but helpful for follow-up questions)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depends on severity and complexity

### Security Severity Levels

We classify vulnerabilities using the following severity levels:

- **Critical**: Remote code execution, data breach, authentication bypass
- **High**: Privilege escalation, significant data exposure
- **Medium**: Information disclosure, denial of service
- **Low**: Minor information disclosure, edge cases

### Disclosure Policy

- We will acknowledge receipt of your report within 48 hours
- We will keep you informed of the progress toward resolving the issue
- We will notify you when the vulnerability has been fixed
- We will credit you in the security advisory (unless you prefer to remain anonymous)

### Safe Harbor

We consider security research and vulnerability disclosure activities conducted in accordance with this policy to be "authorized" conduct. We will not pursue legal action against researchers who:

- Act in good faith
- Do not access more data than necessary
- Do not cause harm to users or the service
- Report vulnerabilities promptly

## Best Practices

When using DAN in your applications:

1. **Validate Input**: Always validate and sanitize input data before parsing
2. **Use Latest Version**: Keep your dependencies up to date
3. **Review Changes**: Review changelogs and security advisories
4. **Limit File Size**: For untrusted input, consider file size limits
5. **Error Handling**: Implement proper error handling for parsing operations

## Security Considerations

### Parser Security

- The parser handles untrusted input, but you should validate data after parsing
- Large files may consume significant memory
- Malformed input may cause parsing errors (handled gracefully)

### Recommendations

- Always validate parsed data against your expected schema
- Use file size limits for untrusted input
- Consider rate limiting for parsing operations in web applications
- Keep the library updated to the latest version

## Security Updates

Security updates will be:

- Released as patch versions (e.g., 1.0.1, 1.0.2)
- Documented in the CHANGELOG
- Announced via GitHub Security Advisories
- Backported to supported versions when possible

## Questions?

If you have questions about this security policy, please open a GitHub issue with the `question` label.

Thank you for helping keep DAN and its users safe!

