// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, Converter, GeneralError, Guards } from "@3sixty/core";
import type { IDataConverterConnector } from "@3sixty/data-processing-models";
import { nameof } from "@3sixty/nameof";
import { MimeTypes } from "@3sixty/web";

/**
 * Class for converting data to JSON from bytes.
 */
export class JsonConverterConnector implements IDataConverterConnector {
	/**
	 * The namespace supported by the data converter connector.
	 */
	public static readonly NAMESPACE: string = "json";

	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<JsonConverterConnector>();

	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return JsonConverterConnector.CLASS_NAME;
	}

	/**
	 * Returns the MIME types that this connector can convert.
	 * @returns The supported MIME type strings.
	 */
	public mimeTypes(): string[] {
		return [MimeTypes.Json, MimeTypes.JsonLd];
	}

	/**
	 * Converts the binary data to a structured object by parsing it as JSON.
	 * @param data The binary data to convert.
	 * @returns The parsed JSON object.
	 * @throws GeneralError if the data cannot be parsed as valid JSON.
	 */
	public async convert(data: Uint8Array): Promise<unknown> {
		Guards.uint8Array(JsonConverterConnector.CLASS_NAME, nameof(data), data);

		let converted = {};

		if (data.length > 0) {
			try {
				const jsonString = Converter.bytesToUtf8(data);
				converted = JSON.parse(jsonString);
			} catch (error) {
				throw new GeneralError(JsonConverterConnector.CLASS_NAME, "invalidFormat", {
					failure: BaseError.fromError(error).message
				});
			}
		}

		return converted;
	}
}
