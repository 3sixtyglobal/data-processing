// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get a rule group.
 */
export interface IDataProcessingRuleGroupGetRequest {
	/**
	 * The path parameters for the request.
	 */
	pathParams: {
		/**
		 * The id of the rule group to retrieve.
		 */
		id: string;
	};
}
