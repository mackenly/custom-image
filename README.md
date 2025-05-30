# custom-image Managed Component

## Documentation

Managed Components docs are published at **https://managedcomponents.dev** .

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

[![Released under the Apache license.](https://img.shields.io/badge/license-apache-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🚀 Quickstart local dev environment

1. Make sure you're running node version >=18.
2. Install dependencies with `npm i`
3. Run unit test watcher with `npm run test:dev`

## ⚙️ Tool Settings

> Settings are used to configure the tool in a Component Manager config file

This tool require no settings.

## 🧱 Fields Description

> Fields are properties that can/must be sent with certain events

### Image Source `string` _required_

`imgSrc` holds a web address (a URL) that indicates the location of an image on the web.

### Use Image Tag `string` _optional_

`useImgTag` indicates whether to use an `<img>` tag for the image rather than `fetch`. To enable this, set the value to `true`. Default is disabled if not set to `true` or omitted.

## 📝 License

Licensed under the [Apache License](./LICENSE).
