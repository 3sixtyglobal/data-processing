// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRuleGroup } from "../IRuleGroup.js";

/**
 * Get a rule group response.
 */
export interface IDataProcessingRuleGroupGetResponse {
	/**
	 * The rule group data.
	 */
	body: IRuleGroup;
}
