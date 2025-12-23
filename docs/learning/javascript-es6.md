---
title: "Learning JavaScript ES6+"
sidebar_position: 1
---

# Modern JavaScript (ES6+) Learning Notes

My comprehensive notes on modern JavaScript features, patterns, and best practices. These notes come from hands-on experience and continuous learning.

## Arrow Functions & This Binding

### 🎯 Understanding Lexical Scope

Arrow functions don't have their own `this` - they inherit it from the enclosing scope.

```javascript
// Traditional function - 'this' depends on how it's called
function TraditionalObject() {
  this.name = 'Traditional';
  
  this.greet = function() {
    console.log(`Hello, I'm ${this.name}`);
  };
  
  this.delayedGreet = function() {
    setTimeout(function() {
      console.log(`Hello, I'm ${this.name}`); // 'this' is undefined or window
    }, 1000);
  };
}

// Arrow function - 'this' is lexically bound
function ModernObject() {
  this.name = 'Modern';
  
  this.greet = () => {
    console.log(`Hello, I'm ${this.name}`);
  };
  
  this.delayedGreet = () => {
    setTimeout(() => {
      console.log(`Hello, I'm ${this.name}`); // 'this' refers to ModernObject
    }, 1000);
  };
}
```

## Destructuring Patterns

### 📦 Array and Object Destructuring

Powerful patterns for extracting data from complex structures.

```javascript
// Basic destructuring
const user = { name: 'Pawina', age: 28, city: 'Bangkok' };
const { name, age, city } = user;

// With default values
const { name, age, country = 'Thailand' } = user;

// Renaming variables
const { name: userName, age: userAge } = user;

// Nested destructuring
const response = {
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ],
    meta: { total: 2 }
  }
};

const { 
  data: { 
    users: [firstUser, ...otherUsers], 
    meta: { total } 
  } 
} = response;

// Array destructuring with rest
const [first, second, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);     // 1
console.log(remaining); // [3, 4, 5]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

## Async/Await & Promises

### ⏳ Modern Asynchronous JavaScript

Moving from callback hell to readable async code.

```javascript
// Promise-based approach
const fetchUserData = (userId) => {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(user => {
      return fetch(`/api/users/${user.id}/posts`);
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

// Async/await approach - cleaner and more readable
const fetchUserData = async (userId) => {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user');
    }
    
    const user = await userResponse.json();
    const postsResponse = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Parallel execution with Promise.all
const fetchAllData = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('One or more requests failed:', error);
  }
};
```

## Modern Array Methods

### 🔄 Functional Programming with Arrays

Powerful methods for data transformation and manipulation.

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
  { id: 2, name: 'Phone', price: 599, category: 'Electronics', inStock: false },
  { id: 3, name: 'Book', price: 29, category: 'Education', inStock: true },
  { id: 4, name: 'Headphones', price: 199, category: 'Electronics', inStock: true }
];

// Filter available electronics under $700
const affordableElectronics = products
  .filter(product => product.category === 'Electronics')
  .filter(product => product.inStock)
  .filter(product => product.price < 700)
  .map(product => ({
    ...product,
    discountedPrice: product.price * 0.9
  }));

// Find total value of inventory
const totalInventoryValue = products
  .filter(product => product.inStock)
  .reduce((total, product) => total + product.price, 0);

// Group products by category
const productsByCategory = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(product);
  return groups;
}, {});

// Check if all products are in stock
const allInStock = products.every(product => product.inStock);

// Check if any electronics are available
const hasElectronics = products.some(product => 
  product.category === 'Electronics' && product.inStock
);
```

## Template Literals & Tagged Templates

### 📝 Advanced String Manipulation

Beyond basic string interpolation.

```javascript
// Multi-line strings and expressions
const user = { name: 'Pawina', role: 'Developer' };
const greeting = `
  Hello ${user.name}!
  Welcome to your ${user.role} dashboard.
  Today is ${new Date().toLocaleDateString()}.
`;

// Tagged template literals for custom processing
const highlight = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<mark>${values[i]}</mark>` : '';
    return result + string + value;
  }, '');
};

const searchTerm = 'JavaScript';
const message = highlight`Found results for ${searchTerm} in the documentation.`;
// Output: "Found results for <mark>JavaScript</mark> in the documentation."

// SQL query builder using tagged templates
const sql = (strings, ...values) => {
  return {
    query: strings.reduce((query, string, i) => {
      return query + string + (values[i] || '');
    }, ''),
    values: values
  };
};

const userId = 123;
const query = sql`SELECT * FROM users WHERE id = ${userId}`;
```

## Modules & Imports

### 📦 Code Organization Patterns

Modern module system for better code organization.

```javascript
// utils/api.js - Named exports
export const BASE_URL = 'https://api.example.com';

export const fetchData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return response.json();
};

export const postData = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

// utils/helpers.js - Default export with named exports
export default class DataProcessor {
  static normalize(data) {
    return data.map(item => ({ ...item, normalized: true }));
  }
}

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// main.js - Various import patterns
import DataProcessor, { debounce } from './utils/helpers.js';
import { fetchData, postData } from './utils/api.js';
import * as API from './utils/api.js'; // Import everything

// Dynamic imports for code splitting
const loadChart = async () => {
  const { Chart } = await import('./components/Chart.js');
  return new Chart();
};
```

## Classes & Inheritance

### 🏗️ Object-Oriented Programming in JavaScript

Modern class syntax with inheritance patterns.

```javascript
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  // Instance method
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  // Static method
  static getKingdom() {
    return 'Animalia';
  }
  
  // Getter
  get info() {
    return `${this.name} is a ${this.species}`;
  }
  
  // Setter
  set name(newName) {
    if (newName.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    this._name = newName;
  }
  
  get name() {
    return this._name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Dog');
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    console.log(`${this.name} barks!`);
  }
  
  // Additional method
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

// Usage
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // "Buddy barks!"
console.log(myDog.info); // "Buddy is a Dog"
```

## Key Learnings & Tips

### 💡 Best Practices I've Adopted

1. **Use const by default**, let when reassignment is needed, avoid var
2. **Prefer arrow functions** for short, anonymous functions
3. **Use array methods** instead of traditional loops for better readability
4. **Async/await over promises** for better error handling and readability
5. **Destructuring for cleaner code** when extracting multiple properties
6. **Template literals** for any string that includes variables

### 🚀 Performance Considerations

```javascript
// Avoid creating functions in render loops
// ❌ Bad
items.map(item => item.process(() => doSomething()));

// ✅ Good
const processor = () => doSomething();
items.map(item => item.process(processor));

// Use optional chaining to avoid errors
// ❌ Verbose null checking
if (user && user.profile && user.profile.address) {
  console.log(user.profile.address.street);
}

// ✅ Clean optional chaining
console.log(user?.profile?.address?.street);

// Nullish coalescing for default values
const username = user?.name ?? 'Anonymous';
```

---

*These notes represent my ongoing journey with modern JavaScript. I update them regularly as I discover new patterns and best practices.*