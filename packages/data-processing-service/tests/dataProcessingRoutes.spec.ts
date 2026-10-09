// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { HttpBodyLimit } from "@3sixty/api-models";
import { generateRestRoutesDataProcessing } from "../src/dataProcessingRoutes.js";

describe("dataProcessingRoutes", () => {
	test("The extract route has a large body limit", async () => {
		const routes = generateRestRoutesDataProcessing("/data-processing", "data-processing");
		const extractRoute = routes.find(route => route.operationId === "dataProcessingExtract");
		expect(extractRoute?.bodyLimit).toEqual(HttpBodyLimit.Large);
	});

	test("The convert route has a large body limit", async () => {
		const routes = generateRestRoutesDataProcessing("/data-processing", "data-processing");
		const convertRoute = routes.find(route => route.operationId === "dataProcessingConvert");
		expect(convertRoute?.bodyLimit).toEqual(HttpBodyLimit.Large);
	});

	test("The rule group routes have no body limit", async () => {
		const routes = generateRestRoutesDataProcessing("/data-processing", "data-processing");
		const ruleGroupRoutes = routes.filter(
			route =>
				route.operationId !== "dataProcessingExtract" &&
				route.operationId !== "dataProcessingConvert"
		);
		expect(ruleGroupRoutes.length).toEqual(4);
		for (const route of ruleGroupRoutes) {
			expect(route.bodyLimit).toBeUndefined();
		}
	});
});
