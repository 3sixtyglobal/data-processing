# Data Processing Extractors Examples

Use these snippets to map nested JSON data into flatter, application-focused shapes with JSONPath rules.

## JsonPathExtractorConnector

```typescript
import { JsonPathExtractorConnector } from '@twin.org/data-processing-extractors';

const extractor = new JsonPathExtractorConnector();

console.log(extractor.className()); // jsonPathExtractorConnector

const sourceData = {
  users: [
    { firstName: 'John', lastName: 'Doe', age: 30 },
    { firstName: 'Jane', lastName: 'Doe', age: 25 }
  ]
};

const extracted = await extractor.extract(sourceData, [
  { source: '$.users[0].firstName', target: 'profile.givenName' },
  { source: '$.users[1].lastName', target: 'profile.familyName' }
]);

console.log(extracted); // { profile: { givenName: 'John', familyName: 'Doe' } }
```

```typescript
import { JsonPathExtractorConnector } from '@twin.org/data-processing-extractors';

const extractor = new JsonPathExtractorConnector();

const extracted = await extractor.extract(
  {
    store: {
      books: [
        { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
        { title: '1984', author: 'George Orwell' },
        { title: 'Dune', author: 'Frank Herbert' }
      ]
    }
  },
  [{ source: '$.store.books[*].title', target: 'bookTitles' }]
);

console.log(extracted); // { bookTitles: ['The Hobbit', '1984', 'Dune'] }
```

```typescript
import { JsonPathExtractorConnector } from '@twin.org/data-processing-extractors';

const extractor = new JsonPathExtractorConnector();

const extracted = await extractor.extract(
  {
    users: {
      user1: { firstName: 'John', lastName: 'Doe', age: 30 },
      user2: { firstName: 'Jane', lastName: 'Doe', age: 25 }
    }
  },
  [
    { source: '$.users.*.firstName', target: 'selected', retainPathDepth: 2 },
    { source: '$.users.*.lastName', target: 'selected', retainPathDepth: 2 }
  ]
);

console.log(extracted); // { selected: { user1: { firstName: 'John', lastName: 'Doe' }, user2: { firstName: 'Jane', lastName: 'Doe' } } }
```
