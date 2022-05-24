# Shipwright Documentation

[![Netlify Status](https://api.netlify.com/api/v1/badges/f92d5739-363b-446b-b56e-dfd47a96a1fd/deploy-status)](https://app.netlify.com/sites/shipwright-io/deploys)

This repository contains the assets needed to build the Shipwright website and documentation.

## Using this repository

You can run the website locally using the Hugo static site generator.

### Getting Started

To use this repository, you need the following installed locally:

* npm - this can be obtained by installing [Node.js](https://nodejs.org/en/download/) on your system
* [Hugo](https://gohugo.io/getting-started/installing/) - be sure to install the **extended version**.
* [Ruby](https://www.ruby-lang.org/en/)

Once installed, clone the repository and navigate to the directory:

```bash
$ git clone --recurse-submodules --depth 1 https://github.com/shipwright-io/website.git
$ cd website
```

Then install any additional dependencies by running `make install`

### Running the website locally

To run the website locally, use Hugo's `server` command:

```bash
$ hugo server
```

## Contributing

We are happy to have you join us and contribute to the Shipwright website!
Please review the [Contributing Guide](CONTRIBUTING.md) for more information.

## License

Licensed under [CC BY 4.0](LICENSE).
