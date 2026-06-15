// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Response to extracting data.
 */
export interface IDataProcessingExtractResponse {
	/**
	 * The extracted data in extended JSON format, preserving types such as bigint, dates, and Uint8Array.
	 */
	body: unknown;
}
