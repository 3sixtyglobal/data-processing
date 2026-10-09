// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntitySchemaFactory, EntitySchemaHelper } from "@3sixty/entity";
import { nameof } from "@3sixty/nameof";
import { ExtractionRule } from "./entities/extractionRule.js";
import { ExtractionRuleGroup } from "./entities/extractionRuleGroup.js";

/**
 * Registers entity schemas for the data extraction connector entity storage.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<ExtractionRuleGroup>(), () =>
		EntitySchemaHelper.getSchema(ExtractionRuleGroup)
	);
	EntitySchemaFactory.register(nameof<ExtractionRule>(), () =>
		EntitySchemaHelper.getSchema(ExtractionRule)
	);
}
