# Class: JsonConverterConnector

Class for converting data to JSON from bytes.

## Implements

- `IDataConverterConnector`

## Constructors

### Constructor

> **new JsonConverterConnector**(): `JsonConverterConnector`

#### Returns

`JsonConverterConnector`

## Properties

### NAMESPACE {#namespace}

> `readonly` `static` **NAMESPACE**: `string` = `"json"`

The namespace supported by the data converter connector.

***

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### className() {#classname}

> **className**(): `string`

Returns the class name of the component.

#### Returns

`string`

The class name of the component.

#### Implementation of

`IDataConverterConnector.className`

***

### mimeTypes() {#mimetypes}

> **mimeTypes**(): `string`[]

Returns the MIME types that this connector can convert.

#### Returns

`string`[]

The supported MIME type strings.

#### Implementation of

`IDataConverterConnector.mimeTypes`

***

### convert() {#convert}

> **convert**(`data`): `Promise`\<`unknown`\>

Converts the binary data to a structured object by parsing it as JSON.

#### Parameters

##### data

`Uint8Array`

The binary data to convert.

#### Returns

`Promise`\<`unknown`\>

The parsed JSON object.

#### Throws

GeneralError if the data cannot be parsed as valid JSON.

#### Implementation of

`IDataConverterConnector.convert`
