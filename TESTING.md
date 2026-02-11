# Testing Guide

BloomNote has comprehensive test coverage to ensure reliability and correctness.

## Test Statistics

- **Total Tests**: 44 passing
- **Test Suites**: 6 passing
- **Coverage**: 94.33% statements, 100% branches
- **Execution Time**: ~0.7 seconds

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Structure

```
__tests__/
├── lib/
│   ├── slug.test.ts           # Slug generation tests
│   ├── validation.test.ts     # Zod schema validation
│   └── three-helpers.test.ts  # 3D utility functions
├── components/
│   ├── button.test.tsx        # Button component
│   └── progress-stepper.test.tsx  # Progress stepper
└── integration/
    └── card-creation.test.ts  # End-to-end flows
```

## Test Categories

### 1. Unit Tests

#### Slug Generation (`lib/slug.test.ts`)
- ✅ Generates correct length (10 chars)
- ✅ Ensures uniqueness
- ✅ Uses URL-safe characters
- ✅ Collision resistance (100 unique slugs)

#### Validation (`lib/validation.test.ts`)
- ✅ Accepts valid configurations
- ✅ Rejects empty flower array
- ✅ Rejects >12 flowers
- ✅ Rejects invalid flower types
- ✅ Rejects invalid hex colors
- ✅ Rejects messages >300 chars
- ✅ Accepts exactly 300 chars
- ✅ Rejects invalid theme presets
- ✅ Validates position bounds
- ✅ Validates scale bounds

#### 3D Helpers (`lib/three-helpers.test.ts`)
- ✅ Auto-arrange in circular pattern
- ✅ Maintains flower types
- ✅ Sets y position to 0
- ✅ Distributes flowers evenly
- ✅ Clamp function
- ✅ Random position generation

### 2. Component Tests

#### Button (`components/button.test.tsx`)
- ✅ Renders with text
- ✅ Calls onClick handler
- ✅ Respects disabled state
- ✅ Applies variant styles
- ✅ Applies size classes
- ✅ Merges custom className

#### Progress Stepper (`components/progress-stepper.test.tsx`)
- ✅ Renders all steps
- ✅ Highlights current step
- ✅ Shows checkmark for completed
- ✅ Shows numbers for incomplete
- ✅ Renders connector lines

### 3. Integration Tests

#### Card Creation (`integration/card-creation.test.ts`)
- ✅ End-to-end validation
- ✅ Unique slug generation
- ✅ Minimum flower count
- ✅ Maximum flower count
- ✅ All flower types (rose, tulip, daisy, sunflower)
- ✅ All theme presets (romantic, playful, elegant)
- ✅ All font options (cursive, serif, sans)

## Coverage Report

```
File                   | % Stmts | % Branch | % Funcs | % Lines
-----------------------|---------|----------|---------|--------
All files              |   94.33 |      100 |     100 |     100
 components/ui         |     100 |      100 |     100 |     100
  button.tsx           |     100 |      100 |     100 |     100
  progress-stepper.tsx |     100 |      100 |     100 |     100
 lib/cards             |     100 |      100 |     100 |     100
  slug.ts              |     100 |      100 |     100 |     100
  validation.ts        |     100 |      100 |     100 |     100
 lib/utils             |      90 |      100 |     100 |     100
  cn.ts                |     100 |      100 |     100 |     100
  constants.ts         |   78.57 |      100 |     100 |     100
  three-helpers.ts     |     100 |      100 |     100 |     100
```

## Writing New Tests

### Test File Naming
- Unit tests: `<filename>.test.ts(x)`
- Component tests: `<ComponentName>.test.tsx`
- Integration tests: `<feature-name>.test.ts`

### Test Template

```typescript
import { describe, it, expect } from '@jest/globals';

describe('MyFunction', () => {
  it('should do something', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it('should handle edge case', () => {
    const result = myFunction(edgeCase);
    expect(result).toBe(expectedEdgeCase);
  });
});
```

### Component Test Template

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Test Configuration

### Jest Config (`jest.config.js`)
- Environment: jsdom (for React components)
- Transform: Next.js transformer
- Module mapper: `@/*` alias support
- Setup file: `jest.setup.js`

### Mocks

#### nanoid Mock (`__mocks__/nanoid.ts`)
Mock for nanoid library to avoid ESM issues in Jest.

```typescript
export function nanoid(size: number = 21): string {
  // Simple mock implementation
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

## Manual Testing Checklist

### Creator Flow
- [ ] Landing page loads
- [ ] Click "Create Card" opens wizard
- [ ] Step 1: Add/remove flowers
- [ ] Step 2: Auto-arrange works
- [ ] Step 2: Sliders adjust flowers
- [ ] Step 3: Message input works
- [ ] Step 3: Font picker works
- [ ] Step 3: Theme presets work
- [ ] Publish creates card
- [ ] Redirects to card viewer

### Viewer Flow
- [ ] Card URL loads
- [ ] "Tap to Open" shows
- [ ] Card unfolds on tap
- [ ] Bouquet pops up
- [ ] Flowers sway
- [ ] Message displays
- [ ] View counter increments
- [ ] Share button works

### Responsive Testing
- [ ] Mobile (320px - 428px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Landscape mode
- [ ] Touch interactions

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] iOS Safari
- [ ] Android Chrome

## CI/CD Integration

To add tests to CI/CD pipeline:

### GitHub Actions

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - run: npm run build
```

### Vercel (Automatic)

Tests run automatically on:
- Pull request creation
- Push to main branch
- Deployment previews

## Debugging Tests

### Run Single Test File
```bash
npm test slug.test.ts
```

### Run Tests Matching Pattern
```bash
npm test validation
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open Chrome DevTools at `chrome://inspect`

## Test Best Practices

1. ✅ **One assertion per test** - Makes failures clear
2. ✅ **Descriptive test names** - Use "should" statements
3. ✅ **Arrange-Act-Assert** - Clear test structure
4. ✅ **Test edge cases** - Min/max values, empty inputs
5. ✅ **Mock external dependencies** - Keep tests fast
6. ✅ **Avoid test interdependence** - Each test runs independently
7. ✅ **Clean up after tests** - Reset state, clear mocks

## Performance

- Tests run in parallel by default
- jsdom environment for React components
- Mocks prevent external API calls
- Target: <1 second for full suite

## Future Test Coverage

Areas to expand:
- [ ] API route integration tests (with Supabase mock)
- [ ] E2E tests with Playwright
- [ ] Visual regression tests
- [ ] Accessibility tests
- [ ] Performance benchmarks

---

For questions or issues, see the main [README.md](./README.md)
