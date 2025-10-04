# Contributing to Fontsource

Thanks for supporting Fontsource!

> Please note that this project is released with a [Contributor Code of Conduct](https://github.com/fontsource/fontsource/blob/main/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Submitting a new font

This repository hosts the font files for the [Fontsource](https://github.com/fontsource/fontsource) project. If you would like to submit a new font, please follow these steps:

1. Before you submit a PR, please search the repository for an open or closed PR that relates to your submission.
2. Fork the fontsource/font-files repository (click the <kbd>Fork</kbd> button at the top right of this page).
3. Clone the repository locally before creating your own branch.

**Use `--depth 1` to shallow clone the latest commit as this is an extremely large repository.**

```shell
git clone https://github.com/fontsource/font-files.git --depth 1
git checkout -b my-font-branch main
```

1. Create your font submission using the Fontsource CLI.

   - Run `bun install` in this repository to install the necessary dependencies or install the [Fontsource CLI](https://github.com/fontsource/fontsource) (`@fontsource-utils/cli`) globally with the package manager of your choice.
   - Run `bunx fontsource create` in the root of this repository and follow the necessary prompts. Ensure your submission matches the [Fontsource Submission Guidelines](#fontsource-submission-guidelines).
   - Add the font files to the generated directory following the guidelines given in the CLI prompts.
   - Move the package into the `fonts/other` directory.
   - Run `bun test` to check if your package has all the required files.

2. On GitHub, send a pull request to fontsource/font-files:main.
3. After your pull request is merged, you can safely delete your branch and pull changes from the main repository.

## Fontsource Submission Guidelines

### Licensing

Fontsource only accepts fonts that have a public official source (preferably Github) and is licensed under the following licenses:

- SIL Open Font License (OFL-1.1)
- Apache License 2.0 (Apache-2.0)
- Ubuntu Font License (UFL-1.0)
- MIT License

If you are unsure about the licensing of a font, please contact the font author.
