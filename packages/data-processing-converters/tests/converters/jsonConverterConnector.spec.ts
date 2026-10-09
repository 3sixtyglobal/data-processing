// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile } from "node:fs/promises";
import { Converter } from "@3sixty/core";
import { JsonConverterConnector } from "../../src/converters/jsonConverterConnector.js";

describe("JsonConverterConnector", () => {
	test("Can fail when input is invalid JSON", async () => {
		const converter = new JsonConverterConnector();
		await expect(converter.convert(Converter.utf8ToBytes("!"))).rejects.toMatchObject({
			name: "GeneralError",
			message: "jsonConverterConnector.invalidFormat",
			properties: { failure: "Unexpected token '!', \"!\" is not valid JSON" }
		});
	});

	test("Can output empty object when the input is empty", async () => {
		const converter = new JsonConverterConnector();

		const output = await converter.convert(new Uint8Array());

		expect(output).toEqual({});
	});

	test("Can output object when the input is JSON", async () => {
		const converter = new JsonConverterConnector();

		const json = await readFile("./tests/converters/samples/test.json");
		const output = await converter.convert(json);

		expect(output).toEqual({
			menu: {
				food: [
					{
						name: "Belgian Waffles",
						price: "$5.95",
						description: "Two of our famous Belgian Waffles with plenty of real maple syrup",
						calories: "650"
					},
					{
						name: "Strawberry Belgian Waffles",
						price: "$7.95",
						description: "Light Belgian waffles covered with strawberries and whipped cream",
						calories: "900"
					},
					{
						name: "Berry-Berry Belgian Waffles",
						price: "$8.95",
						description:
							"Light Belgian waffles covered with an assortment of fresh berries and whipped cream",
						calories: "900"
					},
					{
						name: "French Toast",
						price: "$4.50",
						description: "Thick slices made from our homemade sourdough bread",
						calories: "600"
					},
					{
						name: "Homestyle Breakfast",
						price: "$6.95",
						description: "Two eggs, bacon or sausage, toast, and our ever-popular hash browns",
						calories: "950"
					}
				]
			}
		});
	});
});
