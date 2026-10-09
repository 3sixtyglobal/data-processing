# Data Processing REST Client Examples

These snippets show how to connect to a running service, maintain rule groups, and call extraction and conversion endpoints.

## DataProcessingRestClient

```typescript
import { ObjectHelper } from '@3sixty/core';
import type { IRuleGroup } from '@3sixty/data-processing-models';
import { DataProcessingRestClient } from '@3sixty/data-processing-rest-client';

const client = new DataProcessingRestClient({ endpoint: 'http://localhost:8080' });

console.log(client.className()); // dataProcessingRestClient

const ruleGroup: IRuleGroup = {
  id: 'orders-summary',
  label: 'Orders Summary',
  rules: [
    { source: '$.orders[*].id', target: 'orderIds' },
    { source: '$.orders[*].total', target: 'totals' }
  ]
};

await client.ruleGroupSet(ruleGroup);

const saved = await client.ruleGroupGet('orders-summary');
console.log(saved); // { id: 'orders-summary', label: 'Orders Summary', rules: [ { source: '$.orders[*].id', target: 'orderIds' }, { source: '$.orders[*].total', target: 'totals' } ] }
```

```typescript
import { ObjectHelper } from '@3sixty/core';
import { DataProcessingRestClient } from '@3sixty/data-processing-rest-client';

const client = new DataProcessingRestClient({ endpoint: 'http://localhost:8080' });

const payload = ObjectHelper.toBytes({
  orders: [
    { id: 'A-100', total: 19.99 },
    { id: 'A-101', total: 24.5 }
  ]
});

const extracted = await client.extract('orders-summary', payload);
console.log(extracted); // { orderIds: ['A-100', 'A-101'], totals: [19.99, 24.5] }

const converted = await client.convert(payload, 'application/json');
console.log(converted); // { orders: [ { id: 'A-100', total: 19.99 }, { id: 'A-101', total: 24.5 } ] }
```

```typescript
import { DataProcessingRestClient } from '@3sixty/data-processing-rest-client';

const client = new DataProcessingRestClient({ endpoint: 'http://localhost:8080' });

const listed = await client.query(undefined, 10);
console.log(listed.entities.length); // 1
console.log(listed.cursor); // undefined

await client.ruleGroupRemove('orders-summary');
```
