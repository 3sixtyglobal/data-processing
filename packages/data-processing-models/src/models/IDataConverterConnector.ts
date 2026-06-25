// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";

/**
 * Interface describing a connector for converting data.
 */
export interface IDataConverterConnector extends IComponent {
	/**
	 * Returns the MIME types that this connector can convert.
	 * @returns The supported MIME type strings.
	 */
	mimeTypes(): string[];

	/**
	 * Converts the data to a structured object.
	 * @param data The binary data to convert.
	 * @returns The parsed structured object.
	 */
	convert(data: Uint8Array): Promise<unknown>;
}
