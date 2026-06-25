// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { CoerceType } from "@twin.org/core";
import { entity, property } from "@twin.org/entity";

/**
 * Class defining an extraction rule.
 */
@entity()
export class ExtractionRule {
	/**
	 * The JSONPath expression identifying the source field in the input document.
	 */
	@property({ type: "string" })
	public source!: string;

	/**
	 * The dotted path identifying where to store the extracted value in the output.
	 */
	@property({ type: "string" })
	public target!: string;

	/**
	 * The number of path segments from the source location to preserve in the target path.
	 */
	@property({ type: "number", optional: true })
	public retainPathDepth?: number;

	/**
	 * The type to coerce the extracted value to.
	 */
	@property({ type: "string", optional: true })
	public coerce?: CoerceType;
}
