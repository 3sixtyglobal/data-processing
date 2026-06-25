// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, Coerce, GeneralError, Guards, Is, ObjectHelper } from "@twin.org/core";
import { JsonPathHelper } from "@twin.org/data-json-path";
import type { IDataExtractorConnector, IRule } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";

/**
 * Class for extracting data from a JSON source.
 */
export class JsonPathExtractorConnector implements IDataExtractorConnector {
	/**
	 * The namespace supported by the data extractor connector.
	 */
	public static readonly NAMESPACE: string = "json-path";

	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<JsonPathExtractorConnector>();

	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return JsonPathExtractorConnector.CLASS_NAME;
	}

	/**
	 * Extracts data from the provided input.
	 * @param data The object to extract from.
	 * @param rules The rules to use to extract the data.
	 * @returns The extracted data.
	 */
	public async extract(data: unknown, rules: IRule[]): Promise<unknown> {
		Guards.object(JsonPathExtractorConnector.CLASS_NAME, nameof(data), data);
		Guards.array(JsonPathExtractorConnector.CLASS_NAME, nameof(rules), rules);

		const outputObject: unknown = {};

		for (const extractRule of rules) {
			this.extractValue(data, extractRule, outputObject);
		}

		return outputObject;
	}

	/**
	 * Extracts the value from the JSON object.
	 * @param jsonObject The JSON object to extract from.
	 * @param rule The rule to use to extract the data.
	 * @param outputObject The object to output the extracted data to.
	 * @throws GeneralError if the rule is invalid or extraction fails.
	 * @internal
	 */
	private extractValue(jsonObject: unknown, rule: IRule, outputObject: unknown): void {
		try {
			const jsonNodes = JsonPathHelper.query(rule.source, jsonObject);

			const ruleParts = rule.source.split(".");

			// Group values by their target path to handle multiple results correctly
			const pathToValues: { [id: string]: unknown } = {};

			for (const jsonNode of jsonNodes) {
				const retainPathDepth = rule.retainPathDepth ?? 0;
				const fullTargetPath = `${rule.target}${retainPathDepth > 0 ? `.${jsonNode.location.slice(-retainPathDepth).join(".")}` : ""}`;
				const coercedValue = Coerce.byType(jsonNode.value, rule.coerce);

				const nodeLocation = jsonNode.location;

				// If the last part of the location before the target property is an integer
				// and the corresponding rule part ends with [*], we are dealing with an array
				const isArray =
					nodeLocation.length > 1 &&
					ruleParts.length > 1 &&
					Is.integer(nodeLocation[nodeLocation.length - 2]) &&
					ruleParts[nodeLocation.length - 2].endsWith("[*]");

				if (isArray) {
					// If the value is set and not currently an array, convert it to one
					if (!Is.empty(pathToValues[fullTargetPath]) && !Is.array(pathToValues[fullTargetPath])) {
						pathToValues[fullTargetPath] = [pathToValues[fullTargetPath]];
					}

					// Make sure the array exists
					pathToValues[fullTargetPath] ??= [];
					// And add the new value
					if (Is.array(pathToValues[fullTargetPath])) {
						pathToValues[fullTargetPath].push(coercedValue);
					}
				} else {
					// For single values, just set the value directly
					pathToValues[fullTargetPath] = coercedValue;
				}
			}

			// Set the values in the output object
			for (const [path, values] of Object.entries(pathToValues)) {
				ObjectHelper.propertySet(outputObject, path, values);
			}
		} catch (err) {
			throw new GeneralError(
				JsonPathExtractorConnector.CLASS_NAME,
				"invalidRule",
				{
					rule: rule.source
				},
				BaseError.fromError(err)
			);
		}
	}
}
