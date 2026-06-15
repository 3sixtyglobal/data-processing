// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@twin.org/entity";
import type { ExtractionRule } from "./extractionRule.js";

/**
 * Class defining an extraction rule group.
 */
@entity()
export class ExtractionRuleGroup {
	/**
	 * The unique identifier for the rule group.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The human-readable label for the rule group.
	 */
	@property({ type: "string" })
	public label!: string;

	/**
	 * The extraction rules that belong to this group.
	 */
	@property({ type: "array", itemTypeRef: "ExtractionRule", itemType: "object" })
	public rules!: ExtractionRule[];
}
