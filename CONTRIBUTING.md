# Contributing to EduFlow

Thank you for your interest in contributing to EduFlow! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include environment information
- Add screenshots if applicable

### Feature Requests
- Check existing issues first
- Provide clear use cases
- Explain the expected behavior
- Consider implementation complexity

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Update documentation
6. Submit a pull request

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Testing
- Add unit tests for utilities
- Test API endpoints thoroughly
- Ensure responsive design works
- Verify accessibility compliance

### Documentation
- Update README for new features
- Add JSDoc comments for functions
- Include API documentation
- Update changelog

## 🚀 Getting Started

1. **Setup Development Environment**
   ```bash
   git clone https://github.com/yourusername/eduflow-lms.git
   cd eduflow-lms
   npm install
   cp .env.example .env.local
   ```

2. **Configure Environment**
   - Set up Supabase project
   - Configure payment gateways
   - Add environment variables

3. **Start Development**
   ```bash
   npm run dev
   ```

## 📝 Pull Request Process

1. **Before Submitting**
   - Ensure all tests pass
   - Update documentation
   - Follow commit conventions
   - Rebase on latest main

2. **PR Description**
   - Clear title and description
   - Link related issues
   - Include screenshots/videos
   - List breaking changes

3. **Review Process**
   - Address reviewer feedback
   - Keep discussions constructive
   - Update based on suggestions
   - Maintain code quality

## 🏷️ Commit Convention

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(auth): add social login support
fix(payment): resolve stripe webhook handling
docs(readme): update installation instructions
```

## 🎯 Areas for Contribution

### High Priority
- Bug fixes and security issues
- Performance improvements
- Accessibility enhancements
- Mobile responsiveness

### Medium Priority
- New payment gateways
- Additional themes
- Course content types
- Analytics features

### Low Priority
- UI/UX improvements
- Code refactoring
- Documentation updates
- Test coverage

## 🛡️ Security

- Report security issues privately
- Use responsible disclosure
- Don't commit sensitive data
- Follow security best practices

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/eduflow)
- **Discussions**: Use GitHub Discussions
- **Email**: dev@eduflow.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make EduFlow better! 🎓