// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataProcessingRestClient } from "../src/dataProcessingRestClient.js";

describe("DataProcessingRestClient", () => {
	test("Can create an instance", async () => {
		const client = new DataProcessingRestClient({ endpoint: "http://localhost:8080" });
		expect(client).toBeDefined();
	});
});
