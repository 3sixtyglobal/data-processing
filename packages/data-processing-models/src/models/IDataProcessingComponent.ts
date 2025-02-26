// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IRuleGroup } from "./IRuleGroup";

/**
 * Interface describing a component for processing data.
 */
export interface IDataProcessingComponent extends IComponent {
	/**
	 * Set an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns Nothing.
	 */
	ruleGroupSet(ruleGroup: IRuleGroup): Promise<void>;

	/**
	 * Get a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to get.
	 * @returns The rule group.
	 */
	ruleGroupGet(ruleGroupId: string): Promise<IRuleGroup>;

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns Nothing.
	 */
	ruleGroupRemove(ruleGroupId: string): Promise<void>;

	/**
	 * Extracts data from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @returns The extracted data.
	 */
	extract(ruleGroupId: string, data: Uint8Array, overrideExtractorType?: string): Promise<unknown>;

	/**
	 * Converts data from the provided input to a structured JSON document.
	 * @param data The data to convert.
	 * @param overrideMimeType An optional override for the mime type, will auto detect if empty.
	 * @returns The converted data.
	 */
	convert(data: Uint8Array, overrideMimeType?: string): Promise<unknown>;

	/**
	 * Query the rule group entries.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 */
	query(
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IRuleGroup[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;
}
