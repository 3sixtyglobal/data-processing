# Interface: IDataConverterConnector

Interface describing a connector for converting data.

## Extends

- `IComponent`

## Methods

### mimeTypes() {#mimetypes}

> **mimeTypes**(): `string`[]

Returns the MIME types that this connector can convert.

#### Returns

`string`[]

The supported MIME type strings.

***

### convert() {#convert}

> **convert**(`data`): `Promise`\<`unknown`\>

Converts the data to a structured object.

#### Parameters

##### data

`Uint8Array`

The binary data to convert.

#### Returns

`Promise`\<`unknown`\>

The parsed structured object.
