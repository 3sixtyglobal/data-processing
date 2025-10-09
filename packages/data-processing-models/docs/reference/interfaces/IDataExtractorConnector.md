# Interface: IDataExtractorConnector

Interface describing a connector for extracting data.

## Extends

- `IComponent`

## Indexable

\[`key`: `string`\]: `any`

All methods are optional, so we introduce an index signature to allow
any additional properties or methods, which removes the TypeScript error where
the class has no properties in common with the type.

## Methods

### extract()

> **extract**(`data`, `rules`): `Promise`\<`unknown`\>

Extracts data from the provided input.

#### Parameters

##### data

`unknown`

The object to extract from.

##### rules

[`IRule`](IRule.md)[]

The rules to use to extract the data.

#### Returns

`Promise`\<`unknown`\>

The extracted data.
