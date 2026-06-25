// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { CoerceType } from "@twin.org/core";

/**
 * Rule defining how to extract data from an object.
 */
export interface IRule {
	/**
	 * The JSONPath expression identifying the data to extract from the document.
	 * @see https://www.rfc-editor.org/rfc/rfc9535.html
	 */
	source: string;

	/**
	 * The target path of where to store the extracted data, using dotted or numeric index notation.
	 */
	target: string;

	/**
	 * When extracting objects, how much of the original path should be maintained in the target object.
	 */
	retainPathDepth?: number;

	/**
	 * Should the data be coerced to a specific type.
	 */
	coerce?: CoerceType;
}
