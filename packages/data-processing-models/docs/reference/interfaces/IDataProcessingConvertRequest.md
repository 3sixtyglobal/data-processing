# Interface: IDataProcessingConvertRequest

Perform a conversion on the data.

## Properties

### body {#body}

> **body**: `object`

The request body containing the data to convert.

#### data

> **data**: `string`

The binary data to convert in base64.

#### overrideMimeType?

> `optional` **overrideMimeType?**: `string`

Use the specified mime type for conversion, will auto detect if undefined.
