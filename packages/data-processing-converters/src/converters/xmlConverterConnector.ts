// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, GeneralError, Guards } from "@twin.org/core";
import type { IDataConverterConnector } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";
import xml2js from "xml2js";

/**
 * Class for converting data to XML from bytes.
 */
export class XmlConverterConnector implements IDataConverterConnector {
	/**
	 * The namespace supported by the data converter connector.
	 */
	public static readonly NAMESPACE: string = "xml";

	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<XmlConverterConnector>();

	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return XmlConverterConnector.CLASS_NAME;
	}

	/**
	 * Returns the MIME types that this connector can convert.
	 * @returns The supported MIME type strings.
	 */
	public mimeTypes(): string[] {
		return [MimeTypes.Xml];
	}

	/**
	 * Converts the binary data to a structured object by parsing it as XML.
	 * @param data The binary data to convert.
	 * @returns The parsed object representation of the XML.
	 * @throws GeneralError if the data cannot be parsed as valid XML.
	 */
	public async convert(data: Uint8Array): Promise<unknown> {
		Guards.uint8Array(XmlConverterConnector.CLASS_NAME, nameof(data), data);

		let converted = {};

		if (data.length > 0) {
			try {
				const xmlParser = new xml2js.Parser({
					explicitArray: false,
					explicitRoot: true
				});

				const result = await xmlParser.parseStringPromise(Buffer.from(data));

				converted = result ?? {};
			} catch (error) {
				throw new GeneralError(XmlConverterConnector.CLASS_NAME, "invalidFormat", {
					failure: BaseError.fromError(error).message.split("\n").join(" ")
				});
			}
		}

		return converted;
	}
}
