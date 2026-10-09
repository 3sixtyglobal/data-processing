# Data Processing Service Examples

These examples show how to configure the service, manage rule groups, and process bytes into structured extraction results.

## DataProcessingService

```typescript
import { JsonConverterConnector } from '@3sixty/data-processing-converters';
import { JsonPathExtractorConnector } from '@3sixty/data-processing-extractors';
import {
  DataConverterConnectorFactory,
  DataExtractorConnectorFactory,
  type IRuleGroup
} from '@3sixty/data-processing-models';
import { MemoryEntityStorageConnector } from '@3sixty/entity-storage-connector-memory';
import { EntityStorageConnectorFactory } from '@3sixty/entity-storage-models';
import { nameof } from '@3sixty/nameof';
import {
  DataProcessingService,
  type ExtractionRuleGroup,
  initSchema
} from '@3sixty/data-processing-service';

initSchema();

const storage = new MemoryEntityStorageConnector<ExtractionRuleGroup>({
  entitySchema: nameof<ExtractionRuleGroup>()
});

EntityStorageConnectorFactory.register('extraction-rule-group', () => storage);
DataExtractorConnectorFactory.register('JSONPath', () => new JsonPathExtractorConnector());
DataConverterConnectorFactory.register('json', () => new JsonConverterConnector());

const service = new DataProcessingService({ defaultExtractorType: 'JSONPath' });

console.log(service.className()); // dataProcessingService

const ruleGroup: IRuleGroup = {
  id: 'customer-overview',
  label: 'Customer Overview',
  rules: [
    { source: '$.customer.name', target: 'profile.name' },
    { source: '$.orders[*].total', target: 'profile.orderTotals' }
  ]
};

await service.ruleGroupSet(ruleGroup);

const loaded = await service.ruleGroupGet('customer-overview');
console.log(loaded.label); // Customer Overview
```

```typescript
import { ObjectHelper } from '@3sixty/core';
import { DataProcessingService } from '@3sixty/data-processing-service';

const service = new DataProcessingService({ defaultExtractorType: 'JSONPath' });

const payload = ObjectHelper.toBytes({
  customer: { name: 'Asha' },
  orders: [{ total: 19.99 }, { total: 24.5 }]
});

const converted = await service.convert(payload, 'application/json');
console.log(converted); // { customer: { name: 'Asha' }, orders: [ { total: 19.99 }, { total: 24.5 } ] }

const extracted = await service.extract('customer-overview', payload);
console.log(extracted); // { profile: { name: 'Asha', orderTotals: [19.99, 24.5] } }

const queryResult = await service.query(undefined, 10);
console.log(queryResult.entities.length); // 1
console.log(queryResult.cursor); // undefined

await service.ruleGroupRemove('customer-overview');
```

## ExtractionRuleGroup

```typescript
import { CoerceType } from '@3sixty/core';
import { ExtractionRuleGroup } from '@3sixty/data-processing-service';

const group = new ExtractionRuleGroup();
group.id = 'analytics-group';
group.label = 'Analytics Group';
group.rules = [
  {
    source: '$.metrics.count',
    target: 'stats.count',
    coerce: CoerceType.Integer
  }
];

console.log(group.id); // analytics-group
console.log(group.label); // Analytics Group
```

## ExtractionRule

```typescript
import { CoerceType } from '@3sixty/core';
import { ExtractionRule } from '@3sixty/data-processing-service';

const rule = new ExtractionRule();
rule.source = '$.orders[*].id';
rule.target = 'orderIds';
rule.retainPathDepth = 0;
rule.coerce = CoerceType.String;

console.log(rule.source); // $.orders[*].id
console.log(rule.target); // orderIds
```
