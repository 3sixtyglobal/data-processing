# Data Processing Models Examples

These examples focus on registering and resolving connector implementations so processing components can discover them at runtime.

## DataConverterConnectorFactory

```typescript
import { JsonConverterConnector } from '@3sixty/data-processing-converters';
import { DataConverterConnectorFactory } from '@3sixty/data-processing-models';

DataConverterConnectorFactory.register('json', () => new JsonConverterConnector());

const converterNames = DataConverterConnectorFactory.names();
const converter = DataConverterConnectorFactory.get('json');
const converterInstances = DataConverterConnectorFactory.instancesList();

console.log(converterNames); // ['json']
console.log(converter.className()); // jsonConverterConnector
console.log(converterInstances.length); // 1
```

## DataExtractorConnectorFactory

```typescript
import { JsonPathExtractorConnector } from '@3sixty/data-processing-extractors';
import { DataExtractorConnectorFactory } from '@3sixty/data-processing-models';

DataExtractorConnectorFactory.register('JSONPath', () => new JsonPathExtractorConnector());

const extractorNames = DataExtractorConnectorFactory.names();
const extractor = DataExtractorConnectorFactory.get('JSONPath');

console.log(extractorNames); // ['JSONPath']
console.log(extractor.className()); // jsonPathExtractorConnector
```
