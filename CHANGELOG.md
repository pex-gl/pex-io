# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

# [3.3.0](https://github.com/pex-gl/pex-io/compare/v3.2.0...v3.3.0) (2026-09-30)

### Bug Fixes

* check for statusText in ok() ([69eea31](https://github.com/pex-gl/pex-io/commit/69eea312ad56c8b7168f169b6d1b680c4678a932))
* correctly check promise status in load() ([9f58691](https://github.com/pex-gl/pex-io/commit/9f58691e88a05d5cc01c58a1b73551ba3e10921e))
* keep video blob URL until the element is emptied ([a9b029c](https://github.com/pex-gl/pex-io/commit/a9b029caf93f2e8acf64bfeadcbb23e850f742cc))

### Features

* add readyEvent option to loadVideo ([c7cb512](https://github.com/pex-gl/pex-io/commit/c7cb5121ffa6b6ac1791130f554f43b58cd2fdef))
* add request method and response cause to fetch errors ([10057d1](https://github.com/pex-gl/pex-io/commit/10057d1ab31a450b9fab01f600776a371c83f6fe))
* reject media loading with Errors ([5c50b0e](https://github.com/pex-gl/pex-io/commit/5c50b0ee3b7ab55ea0adc69ce00e5ad2e0913fb1)), closes [#7](https://github.com/pex-gl/pex-io/issues/7)

# [3.2.0](https://github.com/pex-gl/pex-io/compare/v3.1.0...v3.2.0) (2026-01-23)


### Features

* add loadVideo ([75f0ec8](https://github.com/pex-gl/pex-io/commit/75f0ec863c50aea377abd121a5cd9735eff0eae4))



# [3.1.0](https://github.com/pex-gl/pex-io/compare/v3.0.2...v3.1.0) (2025-10-13)


### Features

* add loadBytes ([8e96299](https://github.com/pex-gl/pex-io/commit/8e9629944d53891284f0dc80687bb3616b3b7750)), closes [#6](https://github.com/pex-gl/pex-io/issues/6)
* loadImage as blob only when fetch options are specified + revoke url once ([4968413](https://github.com/pex-gl/pex-io/commit/49684138251245b84e60c2451c1724f9bc4e9133))



## [3.0.2](https://github.com/pex-gl/pex-io/compare/v3.0.1...v3.0.2) (2024-07-09)



## [3.0.1](https://github.com/pex-gl/pex-io/compare/v3.0.0...v3.0.1) (2023-08-14)



# [3.0.0](https://github.com/pex-gl/pex-io/compare/v3.0.0-alpha.0...v3.0.0) (2023-05-11)



# [3.0.0-alpha.0](https://github.com/pex-gl/pex-io/compare/v2.1.0...v3.0.0-alpha.0) (2022-08-19)


### Code Refactoring

* use ES modules ([ff670ef](https://github.com/pex-gl/pex-io/commit/ff670efcdbcfde3bb97a809fa38cc8747ca31196))


### Features

* add abstracted xhrGet ([a2874d6](https://github.com/pex-gl/pex-io/commit/a2874d6406731ccee8372449b5cc00bc4662e40a))
* add fetch support ([d1d47cb](https://github.com/pex-gl/pex-io/commit/d1d47cb11b45fb1d52f200cf5651806c7351b66f))
* aggregate load methods in index.js ([ce1995f](https://github.com/pex-gl/pex-io/commit/ce1995fee74ff367a092828b08e973d9325a4deb))
* handle all image options ([799b210](https://github.com/pex-gl/pex-io/commit/799b210a208265793f532558e558aca128143eba))
* remove support for xhr ([7714398](https://github.com/pex-gl/pex-io/commit/7714398bbfb8c8e9698f2aa84e505ff376b0fe3a))
* use Promise.allSettled in load ([973fe5a](https://github.com/pex-gl/pex-io/commit/973fe5a3d39862116ba6f2cb147fe4a89530265c))


### BREAKING CHANGES

* switch to type module
