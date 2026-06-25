// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRule } from "../IRule.js";

/**
 * Set a rule group.
 */
export interface IDataProcessingRuleGroupSetRequest {
	/**
	 * The path parameters for the request.
	 */
	pathParams: {
		/**
		 * The id of the rule group to set.
		 */
		id: string;
	};

	/**
	 * The rule group data to store.
	 */
	body: {
		/**
		 * The label for the rule group.
		 */
		label: string;

		/**
		 * The rules.
		 */
		rules: IRule[];
	};
}
