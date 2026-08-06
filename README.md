# Shipwright Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/f92d5739-363b-446b-b56e-dfd47a96a1fd/deploy-status)](https://app.netlify.com/sites/shipwright-io/deploys)

This repository contains the assets needed to build the Shipwright website and documentation.

## Using this repository

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
yarn
```

### Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Versioning

Docs for released versions of Shipwright components are managed with
[Docusaurus's versioning](https://docusaurus.io/docs/versioning). The `docs/`
directory always tracks unreleased work and is served at `/docs/next/`. The
unprefixed `/docs/` path serves the latest released version.

To cut a new version (typically alongside a new minor Build release):

```bash
yarn docusaurus docs:version <x.y>
```

This snapshots the current contents of `docs/` into `versioned_docs/version-<x.y>/`
and `versioned_sidebars/version-<x.y>-sidebars.json`, and adds `<x.y>` to
`versions.json`. Commit all of these generated files together. Older versions
are never edited retroactively; only `docs/` (the next/unreleased version)
should receive ongoing changes.

## Contributing

We are happy to have you join us and contribute to the Shipwright website!
Please review the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

Licensed under [CC BY 4.0](LICENSE).
