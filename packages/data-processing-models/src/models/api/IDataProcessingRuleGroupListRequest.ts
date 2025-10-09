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
		 * Limit the number of entities to return.
		 */
		limit?: string;
	};
}
