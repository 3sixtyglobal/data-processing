# Class: ExtractionRule

Class defining an extraction rule.

## Constructors

### Constructor

> **new ExtractionRule**(): `ExtractionRule`

#### Returns

`ExtractionRule`

## Properties

### source {#source}

> **source**: `string`

The JSONPath expression identifying the source field in the input document.

***

### target {#target}

> **target**: `string`

The dotted path identifying where to store the extracted value in the output.

***

### retainPathDepth? {#retainpathdepth}

> `optional` **retainPathDepth?**: `number`

The number of path segments from the source location to preserve in the target path.

***

### coerce? {#coerce}

> `optional` **coerce?**: `CoerceType`

The type to coerce the extracted value to.
