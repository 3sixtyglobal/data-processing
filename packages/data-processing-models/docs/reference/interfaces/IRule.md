# Interface: IRule

Rule defining how to extract data from an object.

## Properties

### source {#source}

> **source**: `string`

The JSONPath expression identifying the data to extract from the document.

#### See

https://www.rfc-editor.org/rfc/rfc9535.html

***

### target {#target}

> **target**: `string`

The target path of where to store the extracted data, using dotted or numeric index notation.

***

### retainPathDepth? {#retainpathdepth}

> `optional` **retainPathDepth?**: `number`

When extracting objects, how much of the original path should be maintained in the target object.

***

### coerce? {#coerce}

> `optional` **coerce?**: `CoerceType`

Should the data be coerced to a specific type.
