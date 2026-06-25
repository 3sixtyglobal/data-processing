// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseRestClient } from "@twin.org/api-core";
import type { IBaseRestClientConfig, INoContentResponse } from "@twin.org/api-models";
import { Coerce, Converter, Guards, ObjectHelper } from "@twin.org/core";
import type {
	IDataProcessingComponent,
	IDataProcessingConvertRequest,
	IDataProcessingConvertResponse,
	IDataProcessingExtractRequest,
	IDataProcessingExtractResponse,
	IDataProcessingRuleGroupGetRequest,
	IDataProcessingRuleGroupGetResponse,
	IDataProcessingRuleGroupListRequest,
	IDataProcessingRuleGroupListResponse,
	IDataProcessingRuleGroupRemoveRequest,
	IDataProcessingRuleGroupSetRequest,
	IRule,
	IRuleGroup
} from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";

/**
 * Client for performing data processing through to REST endpoints.
 */
export class DataProcessingRestClient extends BaseRestClient implements IDataProcessingComponent {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<DataProcessingRestClient>();

	/**
	 * Create a new instance of DataProcessingRestClient.
	 * @param config The configuration for the client.
	 */
	constructor(config: IBaseRestClientConfig) {
		super(DataProcessingRestClient.CLASS_NAME, config, "data-processing");
	}

	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return DataProcessingRestClient.CLASS_NAME;
	}

	/**
	 * Set an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns A promise that resolves when the rule group has been stored.
	 */
	public async ruleGroupSet(ruleGroup: IRuleGroup): Promise<void> {
		Guards.object<IRuleGroup>(DataProcessingRestClient.CLASS_NAME, nameof(ruleGroup), ruleGroup);
		Guards.stringValue(DataProcessingRestClient.CLASS_NAME, nameof(ruleGroup.id), ruleGroup.id);
		Guards.stringValue(
			DataProcessingRestClient.CLASS_NAME,
			nameof(ruleGroup.label),
			ruleGroup.label
		);
		Guards.array<IRule>(
			DataProcessingRestClient.CLASS_NAME,
			nameof(ruleGroup.rules),
			ruleGroup.rules
		);

		await this.fetch<IDataProcessingRuleGroupSetRequest, INoContentResponse>(
			"/rule-group/:id",
			"PUT",
			{
				pathParams: {
					id: ruleGroup.id
				},
				body: {
					label: ruleGroup.label,
					rules: ruleGroup.rules
				}
			}
		);
	}

	/**
	 * Get a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to get.
	 * @returns The rule group.
	 */
	public async ruleGroupGet(ruleGroupId: string): Promise<IRuleGroup> {
		Guards.stringValue(DataProcessingRestClient.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		const response = await this.fetch<
			IDataProcessingRuleGroupGetRequest,
			IDataProcessingRuleGroupGetResponse
		>("/rule-group/:id", "GET", {
			pathParams: {
				id: ruleGroupId
			}
		});

		return response.body;
	}

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns A promise that resolves when the rule group has been removed.
	 */
	public async ruleGroupRemove(ruleGroupId: string): Promise<void> {
		Guards.stringValue(DataProcessingRestClient.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		await this.fetch<IDataProcessingRuleGroupRemoveRequest, INoContentResponse>(
			"/rule-group/:id",
			"DELETE",
			{
				pathParams: {
					id: ruleGroupId
				}
			}
		);
	}

	/**
	 * Extracts data from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @param overrideMimeType An optional override for the mime type for conversion, will auto detect if not provided.
	 * @returns The extracted data.
	 */
	public async extract(
		ruleGroupId: string,
		data: Uint8Array,
		overrideExtractorType?: string,
		overrideMimeType?: string
	): Promise<unknown> {
		Guards.stringValue(DataProcessingRestClient.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);
		Guards.uint8Array(DataProcessingRestClient.CLASS_NAME, nameof(data), data);

		const result = await this.fetch<IDataProcessingExtractRequest, IDataProcessingExtractResponse>(
			"/extract",
			"POST",
			{
				body: {
					ruleGroupId,
					data: Converter.bytesToBase64(data),
					overrideExtractorType,
					overrideMimeType
				}
			}
		);

		return ObjectHelper.fromExtended(result.body);
	}

	/**
	 * Converts data from the provided input to a structured JSON document.
	 * @param data The data to convert.
	 * @param overrideMimeType An optional override for the mime type, will auto detect if empty.
	 * @returns The converted data.
	 */
	public async convert(data: Uint8Array, overrideMimeType?: string): Promise<unknown> {
		Guards.uint8Array(DataProcessingRestClient.CLASS_NAME, nameof(data), data);

		const result = await this.fetch<IDataProcessingConvertRequest, IDataProcessingConvertResponse>(
			"/convert",
			"POST",
			{
				body: {
					data: Converter.bytesToBase64(data),
					overrideMimeType
				}
			}
		);

		return ObjectHelper.fromExtended(result.body);
	}

	/**
	 * Query the rule group entries.
	 * @param cursor The cursor to request the next chunk of entities.
	 * @param limit Limit the number of entities to return.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 */
	public async query(
		cursor?: string,
		limit?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IRuleGroup[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}> {
		const response = await this.fetch<
			IDataProcessingRuleGroupListRequest,
			IDataProcessingRuleGroupListResponse
		>("/rule-group", "GET", {
			query: {
				cursor,
				limit: Coerce.string(limit)
			}
		});

		return response.body;
	}
}
