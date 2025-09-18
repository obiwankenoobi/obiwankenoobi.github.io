# 📜 Project Rules and Guidelines for Any Project

These rules **must** be followed at all times when working on any project. They exist to ensure consistency, maintainability, and comprehensive documentation.

---

## **1. Documentation First Approach** 📚
- **ALWAYS** reference `./docs/documentation.md` **BEFORE** making any changes
- **ALWAYS** update `./docs/documentation.md` **AFTER** implementing any feature
- **NEVER** make code changes without checking existing documentation first

---

## **2. Documentation Structure** 📁
```
./docs/
├── documentation.md          # Main documentation hub (ALWAYS UPDATE THIS)
├── features/                 # Feature-specific documentation
│   ├── profile-generation.md
│   ├── fingerprinting.md
│   ├── extension-management.md
│   └── ...
├── api/                     # API documentation
│   └── endpoints.md
└── architecture/            # System architecture docs
    └── system-design.md
```

### Rules:
- **Main Hub**: `./docs/documentation.md` is the central documentation hub
- **Feature Docs**: Create specific `.md` files for each feature in appropriate subdirectories
- **Linking**: ALWAYS link new documentation files back to `documentation.md`
- **Cross-References**: Include cross-references between related documentation

---

## **3. Documentation Workflow** 🔄

### Before Starting Any Task:
1. **Read** `./docs/documentation.md` to understand current system state
2. **Check** if feature-specific documentation exists
3. **Review** related documentation sections
4. **Understand** the full context before coding

### After Completing Any Task:
1. **Update** `./docs/documentation.md` with changes made
2. **Create** or update feature-specific documentation if needed
3. **Link** new documentation to the main documentation.md
4. **Document** any new dependencies, APIs, or configurations
5. **Include** code examples and usage instructions

---

## **4. Documentation Standards** 📝

### Every Documentation File Must Include:
- **Title & Purpose**: Clear description of what the document covers
- **Last Updated**: Date of last modification
- **Table of Contents**: For documents longer than 3 sections
- **Examples**: Code examples for implementation details
- **Cross-References**: Links to related documentation
- **Version Info**: Note which version of the system it applies to

### Format Example:
```markdown
# Feature Name

**Last Updated**: 2024-01-13
**Version**: 1.0.0
**Related Docs**: [Main Documentation](../documentation.md), [API Docs](../api/endpoints.md)

## Table of Contents
1. [Overview](#overview)
2. [Implementation](#implementation)
3. [Usage](#usage)
4. [Examples](#examples)

## Overview
Brief description of the feature...

## Implementation
Technical details...

## Usage
How to use this feature...

## Examples
\```javascript
// Code example
\```
```

---

## **5. Feature Documentation Requirements** 🎯

When implementing a new feature:

1. **Create** a feature-specific document in `./docs/features/`
2. **Document** the following:
   - Purpose and use cases
   - Technical implementation
   - Configuration options
   - API endpoints (if any)
   - Dependencies
   - Examples
   - Testing procedures
3. **Update** `./docs/documentation.md` with:
   - Link to the new feature doc
   - Brief summary in the features section
   - Any changes to system architecture

---

## **6. Code-Documentation Sync** 🔗

### In Code Comments:
```javascript
/**
 * Function description
 * @see ./docs/features/specific-feature.md
 */
function exampleFunction() {
  // Implementation
}
```

### In Documentation:
```markdown
## Implementation
See implementation in: `src/module/file.js:functionName()`
```

---

## **7. Documentation Review Checklist** ✅

Before committing any changes:

- [ ] Referenced `./docs/documentation.md` before starting
- [ ] Updated `./docs/documentation.md` with changes
- [ ] Created/updated feature-specific documentation
- [ ] Added links from feature docs to main documentation
- [ ] Added links from main documentation to feature docs
- [ ] Included code examples where appropriate
- [ ] Updated "Last Updated" dates
- [ ] Verified all cross-references work
- [ ] Added inline code comments referencing docs

---

## **8. Special Documentation Areas** 🌟

### Always Document:
- **BUILD_SEED Logic**: How deterministic generation works
- **Fingerprinting Methods**: Canvas, WebGL, TLS, HTTP/2 variations
- **Chrome Integration**: Profile structure, preferences, extensions
- **Integration Points**: Links to phantom-users-hub, stealth_browser
- **Security Considerations**: Privacy, data handling, profile isolation
- **Performance Metrics**: Profile creation time, storage requirements

---

## **9. Documentation Templates** 📋

### New Feature Template:
Create at: `./docs/features/[feature-name].md`
```markdown
# [Feature Name]

**Last Updated**: [Date]
**Status**: [Planning/Development/Testing/Production]
**Main Doc**: [documentation.md](../documentation.md)

## Overview
[What this feature does]

## Technical Details
[How it works]

## Configuration
[Settings and options]

## Usage Examples
[Code examples]

## Testing
[How to test this feature]

## Related Documentation
- [Link to related doc 1]
- [Link to related doc 2]
```

---

## **10. Continuous Documentation** 🔄

- **Daily**: Update documentation for any changes made
- **Weekly**: Review and consolidate documentation
- **Monthly**: Audit documentation for completeness
- **Per Release**: Create version-specific documentation snapshot

---

## **11. Error Documentation** ⚠️

When encountering errors or edge cases:
1. **Document** the error in `./docs/troubleshooting.md`
2. **Link** from main documentation
3. **Include** error message, cause, and solution
4. **Update** relevant feature documentation

---

## **12. Testing Standards** 🧪

### Test Directory Structure:
- **ALL tests** must be written in `./tests` directory
- Organize tests by feature/module:
```
./tests/
├── unit/               # Unit tests
│   ├── utils/         # Test utility functions
│   ├── generators/    # Test generators
│   └── writers/       # Test writers
├── integration/        # Integration tests
│   ├── profile-flow/  # End-to-end profile creation
│   └── chrome-launch/ # Chrome integration tests
├── fixtures/          # Test data and fixtures
│   ├── sample-profiles.json
│   └── test-data.json
└── helpers/           # Test helper functions
    └── test-utils.js
```

### Test File Naming:
- Unit tests: `[module-name].test.js`
- Integration tests: `[feature-name].integration.test.js`
- Test fixtures: `[data-type].fixture.js`

### Test Requirements:
- **ALWAYS** create tests for new features
- **ALWAYS** update tests when modifying existing features
- **NEVER** commit without running tests
- Use descriptive test names and assertions

---

## **13. Quick Reference** 🚀

### Before ANY work:
```bash
# Check main documentation
cat ./docs/documentation.md

# Check for feature-specific docs
ls ./docs/features/

# Search for existing documentation
grep -r "feature_name" ./docs/

# Check existing tests
ls ./tests/
```

### After ANY work:
```bash
# Update main documentation
echo "- [New Feature](./features/new-feature.md)" >> ./docs/documentation.md

# Create feature documentation
touch ./docs/features/new-feature.md

# Create tests
mkdir -p ./tests/unit/new-feature
touch ./tests/unit/new-feature/new-feature.test.js

# Run tests
npm test

# Verify all links
find ./docs -name "*.md" -exec grep -l "documentation.md" {} \;
```

---

## **Remember** 💡

> "Code without documentation is like a map without a legend - it might work, but nobody knows how to navigate it."

**Documentation is not optional - it's a core part of the development process.**

---

✅ Following these rules will ensure:
- Complete system understanding
- Easy onboarding for new developers
- Consistent implementation
- Reduced debugging time
- Better collaboration
- Maintained project knowledge