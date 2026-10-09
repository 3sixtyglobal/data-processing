# Data Processing Converters Examples

These snippets show how to inspect supported MIME types and convert common payloads into structured objects.

## JsonConverterConnector

```typescript
import { Converter } from '@3sixty/core';
import { JsonConverterConnector } from '@3sixty/data-processing-converters';

const connector = new JsonConverterConnector();

console.log(connector.className()); // jsonConverterConnector
console.log(connector.mimeTypes()); // ['application/json', 'application/ld+json']

const jsonData = Converter.utf8ToBytes('{"user":{"name":"Asha","active":true}}');
const converted = await connector.convert(jsonData);

console.log(converted); // { user: { name: 'Asha', active: true } }
```

```typescript
import { JsonConverterConnector } from '@3sixty/data-processing-converters';

const connector = new JsonConverterConnector();
const convertedEmpty = await connector.convert(new Uint8Array());

console.log(convertedEmpty); // {}
```

## XmlConverterConnector

```typescript
import { Converter } from '@3sixty/core';
import { XmlConverterConnector } from '@3sixty/data-processing-converters';

const connector = new XmlConverterConnector();

console.log(connector.className()); // xmlConverterConnector
console.log(connector.mimeTypes()); // ['application/xml']

const xmlData = Converter.utf8ToBytes('<menu><food><name>Belgian Waffles</name></food></menu>');
const converted = await connector.convert(xmlData);

console.log(converted); // { menu: { food: { name: 'Belgian Waffles' } } }
```

```typescript
import { XmlConverterConnector } from '@3sixty/data-processing-converters';

const connector = new XmlConverterConnector();
const convertedEmpty = await connector.convert(new Uint8Array());

console.log(convertedEmpty); // {}
```
