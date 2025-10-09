# Interface: IDataConverterConnector

Interface describing a connector for extracting data.

## Extends

- `IComponent`

## Indexable

\[`key`: `string`\]: `any`

All methods are optional, so we introduce an index signature to allow
any additional properties or methods, which removes the TypeScript error where
the class has no properties in common with the type.

## Methods

### mimeTypes()

> **mimeTypes**(): `string`[]

The MIME types that the converter can convert.

#### Returns

`string`[]

The MIME types.

***

### convert()

> **convert**(`data`): `Promise`\<`unknown`\>

Converts the data to a structured object.

#### Parameters

##### data

`Uint8Array`

The data to extract from.

#### Returns

`Promise`\<`unknown`\>

The extracted data.
