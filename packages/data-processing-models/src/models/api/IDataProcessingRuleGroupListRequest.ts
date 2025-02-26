// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get the a list of the rule group entries.
 */
export interface IDataProcessingRuleGroupListRequest {
	/**
	 * The query parameters.
	 */
	query?: {
		/**
		 * The optional cursor to get next chunk.
		 */
		cursor?: string;

		/**
		 * The maximum number of entities in a page.
		 */
		pageSize?: number;
	};
}
