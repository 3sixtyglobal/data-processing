# Interface: IDataProcessingRuleGroupSetRequest

Set a rule group.

## Properties

### pathParams {#pathparams}

> **pathParams**: `object`

The path parameters for the request.

#### id

> **id**: `string`

The id of the rule group to set.

***

### body {#body}

> **body**: `object`

The rule group data to store.

#### label

> **label**: `string`

The label for the rule group.

#### rules

> **rules**: [`IRule`](IRule.md)[]

The rules.
