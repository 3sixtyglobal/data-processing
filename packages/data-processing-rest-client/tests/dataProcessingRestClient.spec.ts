// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GuardError } from "@twin.org/core";
import type { IRuleGroup } from "@twin.org/data-processing-models";
import { HttpMethod } from "@twin.org/web";
import { DataProcessingRestClient } from "../src/dataProcessingRestClient.js";
import {
	jsonResponse,
	noContentResponse,
	setupFetchMock,
	teardownFetchMock
} from "./helpers/restClientTestHelpers.js";

// OpenAPI spec: ../../data-processing-service/docs/open-api/spec.json
const ENDPOINT = "http://localhost:8080";
const PREFIX = "data-processing";

const TEST_RULE_GROUP: IRuleGroup = {
	id: "rule-group-1",
	label: "Test Rule Group",
	rules: [
		{
			source: "$.name",
			target: "name"
		}
	]
};

const TEST_RULE_GROUP_LIST = {
	entities: [TEST_RULE_GROUP],
	cursor: undefined
};

const TEST_EXTRACT_RESPONSE = { name: "John Doe", age: 42 };

const TEST_CONVERT_RESPONSE = { title: "Test Document", content: "Hello World" };

const TEST_DATA = new Uint8Array([72, 101, 108, 108, 111]);

const fetchMock = vi.fn();

describe("DataProcessingRestClient", () => {
	let client: DataProcessingRestClient;

	beforeEach(() => {
		setupFetchMock(fetchMock);
		client = new DataProcessingRestClient({ endpoint: ENDPOINT });
	});

	afterEach(() => {
		teardownFetchMock(fetchMock);
	});

	describe("ruleGroupSet", () => {
		test("throws when ruleGroup is undefined", async () => {
			await expect(client.ruleGroupSet(undefined as unknown as IRuleGroup)).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.objectUndefined"
			});
		});

		test("throws when ruleGroup.id is empty", async () => {
			await expect(client.ruleGroupSet({ ...TEST_RULE_GROUP, id: "" })).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.stringEmpty"
			});
		});

		test("throws when ruleGroup.label is empty", async () => {
			await expect(client.ruleGroupSet({ ...TEST_RULE_GROUP, label: "" })).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.stringEmpty"
			});
		});

		test("throws when ruleGroup.rules is empty array or undefined", async () => {
			await expect(
				client.ruleGroupSet({ ...TEST_RULE_GROUP, rules: undefined as never })
			).rejects.toMatchObject({
				name: GuardError.CLASS_NAME
			});
		});

		test("sends PUT to /{prefix}/rule-group/:id", async () => {
			fetchMock.mockResolvedValueOnce(noContentResponse());

			await client.ruleGroupSet(TEST_RULE_GROUP);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/rule-group/${TEST_RULE_GROUP.id}`);
			expect(options.method).toBe(HttpMethod.PUT);
		});

		test("sends label and rules in the request body", async () => {
			fetchMock.mockResolvedValueOnce(noContentResponse());

			await client.ruleGroupSet(TEST_RULE_GROUP);

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.label).toBe(TEST_RULE_GROUP.label);
			expect(body.rules).toEqual(TEST_RULE_GROUP.rules);
		});

		test("resolves without a return value", async () => {
			fetchMock.mockResolvedValueOnce(noContentResponse());

			await expect(client.ruleGroupSet(TEST_RULE_GROUP)).resolves.toBeUndefined();
		});
	});

	describe("ruleGroupGet", () => {
		test("throws when ruleGroupId is empty", async () => {
			await expect(client.ruleGroupGet("")).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.stringEmpty"
			});
		});

		test("sends GET to /{prefix}/rule-group/:id", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP));

			await client.ruleGroupGet(TEST_RULE_GROUP.id);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/rule-group/${TEST_RULE_GROUP.id}`);
			expect(options.method).toBe(HttpMethod.GET);
		});

		test("returns the rule group from the response body", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP));

			const result = await client.ruleGroupGet(TEST_RULE_GROUP.id);

			expect(result).toEqual(TEST_RULE_GROUP);
		});
	});

	describe("ruleGroupRemove", () => {
		test("throws when ruleGroupId is empty", async () => {
			await expect(client.ruleGroupRemove("")).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.stringEmpty"
			});
		});

		test("sends DELETE to /{prefix}/rule-group/:id", async () => {
			fetchMock.mockResolvedValueOnce(noContentResponse());

			await client.ruleGroupRemove(TEST_RULE_GROUP.id);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/rule-group/${TEST_RULE_GROUP.id}`);
			expect(options.method).toBe(HttpMethod.DELETE);
		});

		test("resolves without a return value", async () => {
			fetchMock.mockResolvedValueOnce(noContentResponse());

			await expect(client.ruleGroupRemove(TEST_RULE_GROUP.id)).resolves.toBeUndefined();
		});
	});

	describe("extract", () => {
		test("throws when ruleGroupId is empty", async () => {
			await expect(client.extract("", TEST_DATA)).rejects.toMatchObject({
				name: GuardError.CLASS_NAME,
				message: "guard.stringEmpty"
			});
		});

		test("throws when data is not a Uint8Array", async () => {
			await expect(
				client.extract(TEST_RULE_GROUP.id, undefined as unknown as Uint8Array)
			).rejects.toMatchObject({
				name: GuardError.CLASS_NAME
			});
		});

		test("sends POST to /{prefix}/extract", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_EXTRACT_RESPONSE));

			await client.extract(TEST_RULE_GROUP.id, TEST_DATA);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/extract`);
			expect(options.method).toBe(HttpMethod.POST);
		});

		test("sends ruleGroupId and base64-encoded data in the request body", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_EXTRACT_RESPONSE));

			await client.extract(TEST_RULE_GROUP.id, TEST_DATA);

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.ruleGroupId).toBe(TEST_RULE_GROUP.id);
			expect(body.data).toBe(Converter.bytesToBase64(TEST_DATA));
		});

		test("includes overrideExtractorType in the request body when provided", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_EXTRACT_RESPONSE));

			await client.extract(TEST_RULE_GROUP.id, TEST_DATA, "csv");

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.overrideExtractorType).toBe("csv");
		});

		test("includes overrideMimeType in the request body when provided", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_EXTRACT_RESPONSE));

			await client.extract(TEST_RULE_GROUP.id, TEST_DATA, undefined, "text/csv");

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.overrideMimeType).toBe("text/csv");
		});

		test("returns the extracted data from the response", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_EXTRACT_RESPONSE));

			const result = await client.extract(TEST_RULE_GROUP.id, TEST_DATA);

			expect(result).toEqual(TEST_EXTRACT_RESPONSE);
		});
	});

	describe("convert", () => {
		test("throws when data is not a Uint8Array", async () => {
			await expect(client.convert(undefined as unknown as Uint8Array)).rejects.toMatchObject({
				name: GuardError.CLASS_NAME
			});
		});

		test("sends POST to /{prefix}/convert", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_CONVERT_RESPONSE));

			await client.convert(TEST_DATA);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/convert`);
			expect(options.method).toBe(HttpMethod.POST);
		});

		test("sends base64-encoded data in the request body", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_CONVERT_RESPONSE));

			await client.convert(TEST_DATA);

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.data).toBe(Converter.bytesToBase64(TEST_DATA));
		});

		test("includes overrideMimeType in the request body when provided", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_CONVERT_RESPONSE));

			await client.convert(TEST_DATA, "application/pdf");

			const [, options] = fetchMock.mock.calls[0];
			const body = JSON.parse(options.body);
			expect(body.overrideMimeType).toBe("application/pdf");
		});

		test("returns the converted data from the response", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_CONVERT_RESPONSE));

			const result = await client.convert(TEST_DATA);

			expect(result).toEqual(TEST_CONVERT_RESPONSE);
		});
	});

	describe("query", () => {
		test("sends GET to /{prefix}/rule-group", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP_LIST));

			await client.query();

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe(`${ENDPOINT}/${PREFIX}/rule-group`);
			expect(options.method).toBe(HttpMethod.GET);
		});

		test("returns entities from the response body", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP_LIST));

			const result = await client.query();

			expect(result.entities).toEqual(TEST_RULE_GROUP_LIST.entities);
		});

		test("returns undefined cursor when no cursor in response", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP_LIST));

			const result = await client.query();

			expect(result.cursor).toBeUndefined();
		});

		test("returns cursor from response body when present", async () => {
			const responseWithCursor = { entities: [TEST_RULE_GROUP], cursor: "page2" };
			fetchMock.mockResolvedValueOnce(jsonResponse(responseWithCursor));

			const result = await client.query();

			expect(result.cursor).toBe("page2");
		});

		test("includes cursor as a query parameter when provided", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP_LIST));

			await client.query("page1");

			const [url] = fetchMock.mock.calls[0];
			expect(url).toContain("cursor=page1");
		});

		test("includes limit as a query parameter when provided", async () => {
			fetchMock.mockResolvedValueOnce(jsonResponse(TEST_RULE_GROUP_LIST));

			await client.query(undefined, 10);

			const [url] = fetchMock.mock.calls[0];
			expect(url).toContain("limit=10");
		});
	});
});
