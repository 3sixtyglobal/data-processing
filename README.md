# TWIN Data Processing

This repository provides a modular data processing stack for defining data shapes, extracting records from source systems, converting those records into consistent internal models, exposing processing workflows through service endpoints, and integrating with those endpoints through a client library.

Together, these packages are designed to reduce repeated implementation effort across projects by centralising core processing concerns behind clear contracts and reusable components.

## Packages

- [data-processing-models](packages/data-processing-models/README.md) - Shared data models and schema definitions for processing pipelines.
- [data-processing-converters](packages/data-processing-converters/README.md) - Connector implementations that convert source data into canonical processing formats.
- [data-processing-extractors](packages/data-processing-extractors/README.md) - Connector implementations that extract data from external systems for processing.
- [data-processing-service](packages/data-processing-service/README.md) - Service routes and orchestration logic for extraction and conversion workflows.
- [data-processing-rest-client](packages/data-processing-rest-client/README.md) - REST client for calling data processing service endpoints from applications.

## Contributing

To contribute to this package see the guidelines for building and publishing in [CONTRIBUTING](./CONTRIBUTING.md)
