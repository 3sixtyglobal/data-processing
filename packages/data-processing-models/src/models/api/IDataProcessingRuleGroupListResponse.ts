// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRuleGroup } from "../IRuleGroup.js";

/**
 * Response for rule group entry list request.
 */
export interface IDataProcessingRuleGroupListResponse {
	/**
	 * The response body containing the list of rule groups and optional pagination cursor.
	 */
	body: {
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IRuleGroup[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
