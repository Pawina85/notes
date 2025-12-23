---
title: "React Best Practices"
sidebar_position: 2
---

# React Development Best Practices

My collected knowledge and best practices for building robust React applications, gathered from real-world projects and continuous learning.

## Component Architecture

### 🏗️ Component Composition Patterns

**Prefer composition over inheritance** - React's composition model is powerful and flexible.

```jsx
// ❌ Avoid inheritance-like patterns
class BaseButton extends React.Component {
  // shared logic
}

class PrimaryButton extends BaseButton {
  // specific implementation
}

// ✅ Use composition instead
const Button = ({ variant, children, ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-medium";
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-800"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 🎯 Single Responsibility Principle

Each component should have one reason to change.

```jsx
// ❌ Component doing too much
const UserDashboard = () => {
  // User data fetching
  // Analytics calculation
  // UI rendering
  // Form handling
  // etc...
};

// ✅ Separated concerns
const UserDashboard = () => {
  return (
    <div>
      <UserProfile />
      <UserAnalytics />
      <UserActions />
    </div>
  );
};
```

## State Management

### 🔄 Local vs Global State

**Start local, promote to global only when necessary.**

```jsx
// ✅ Local state for component-specific data
const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Component-specific logic
};

// ✅ Global state for shared data
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}));
```

### 🪝 Custom Hooks for Logic Reuse

Extract complex logic into reusable custom hooks.

```jsx
// Custom hook for API data fetching
const useApiData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage in components
const UserList = () => {
  const { data: users, loading, error } = useApiData('/api/users');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <UserGrid users={users} />;
};
```

## Performance Optimization

### ⚡ Memoization Strategies

Use memoization wisely to prevent unnecessary re-renders.

```jsx
import { memo, useMemo, useCallback } from 'react';

// ✅ Memo for expensive components
const ExpensiveComponent = memo(({ data, onAction }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      calculated: item.value * 1.5
    }));
  }, [data]);

  const handleAction = useCallback((id) => {
    onAction(id);
  }, [onAction]);

  return (
    <div>
      {processedData.map(item => (
        <Item 
          key={item.id} 
          data={item} 
          onAction={handleAction} 
        />
      ))}
    </div>
  );
});
```

### 🔄 Code Splitting

Split your code at route and component levels for better loading performance.

```jsx
import { lazy, Suspense } from 'react';

// Route-level splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Component-level splitting for heavy features
const ChartComponent = lazy(() => import('./components/Chart'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

## Testing Strategies

### 🧪 Testing Pyramid

Focus on unit tests, with integration and E2E tests for critical paths.

```jsx
// Unit test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-blue-500');
  });
});
```

### 🎯 Test User Behavior, Not Implementation

```jsx
// ❌ Testing implementation details
expect(component.state().isOpen).toBe(true);

// ✅ Testing user-visible behavior
expect(screen.getByText('Modal is open')).toBeInTheDocument();
expect(screen.getByRole('dialog')).toBeVisible();
```

## Error Boundaries

### 🛡️ Graceful Error Handling

Implement error boundaries to catch and handle component errors gracefully.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
const App = () => (
  <ErrorBoundary>
    <Header />
    <MainContent />
    <Footer />
  </ErrorBoundary>
);
```

## Key Takeaways

1. **Start simple, refactor as needed** - Don't over-engineer from the beginning
2. **Composition over inheritance** - Use React's compositional nature
3. **Performance is about user perception** - Optimize for the critical path
4. **Test behavior, not implementation** - Write tests that give confidence
5. **Error boundaries are essential** - Always have a fallback plan

---

*These practices have evolved through building multiple React applications. They're guidelines, not rigid rules - adapt them to your specific use case.*