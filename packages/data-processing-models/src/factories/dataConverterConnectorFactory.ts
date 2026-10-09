// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@3sixty/core";
import type { IDataConverterConnector } from "../models/IDataConverterConnector.js";

/**
 * Factory for creating data converter connectors.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataConverterConnectorFactory = Factory.createFactory<IDataConverterConnector>(
	"data-converter",
	true
);
