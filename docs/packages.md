# Data Processing Packages

## data-processing-models

The package serves as a foundational component within the repository. Its primary purpose is to provide shared data models and schema definitions for processing pipelines. By doing so, it enables other packages to build upon a consistent and reliable base. This package is integral to ensuring that common functionality is centralised and reusable across the ecosystem.

- [README](../packages/data-processing-models/README.md)
- [Examples](../packages/data-processing-models/docs/examples.md)
- [Changelog](../packages/data-processing-models/docs/changelog.md)

## data-processing-converters

This package is designed to convert source data into canonical processing formats through reusable connectors. It plays a crucial role in ensuring that inputs and outputs across the repository conform to expected standards, thereby reducing integration errors and improving maintainability. Its implementation reflects a focus on semantic clarity and interoperability.

- [README](../packages/data-processing-converters/README.md)
- [Examples](../packages/data-processing-converters/docs/examples.md)
- [Changelog](../packages/data-processing-converters/docs/changelog.md)

## data-processing-extractors

The package addresses data acquisition from external systems through extractor connectors that align with repository contracts. It is intended to streamline workflows and provide developers with a consistent set of resources that align with the repository's overall objectives. By encapsulating this functionality, the package contributes to both productivity and long-term sustainability of the codebase.

- [README](../packages/data-processing-extractors/README.md)
- [Examples](../packages/data-processing-extractors/docs/examples.md)
- [Changelog](../packages/data-processing-extractors/docs/changelog.md)

## data-processing-service

This package focuses on service routes and orchestration for extraction and conversion workflows. Its role is to ensure that processing capabilities can be exposed and maintained reliably across different environments. The package embodies best practices for operational consistency and reproducibility, making it a cornerstone of service-level stability.

- [README](../packages/data-processing-service/README.md)
- [Examples](../packages/data-processing-service/docs/examples.md)
- [Changelog](../packages/data-processing-service/docs/changelog.md)

## data-processing-rest-client

The package provides a REST client for calling data processing service endpoints from applications. It is intended to simplify integration for consumers by offering a consistent interface over network operations and contract handling. This supports reliable interoperability between client applications and processing services.

- [README](../packages/data-processing-rest-client/README.md)
- [Examples](../packages/data-processing-rest-client/docs/examples.md)
- [Changelog](../packages/data-processing-rest-client/docs/changelog.md)
