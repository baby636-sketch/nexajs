# NexaJS

### https://nexajs.org

![NexaJS Banner](https://nexajs.org/banner.jpg)

A JavaScript NEXA library for Node.js and browsers. Written in Pure JavaScript.

Released under the terms of the [MIT LICENSE](LICENSE).


## Should I use this in production?

If you are thinking of using the *master* branch of this library in production, __stop__. Master is not stable; it is our development branch, and [only tagged releases may be classified as stable](https://gitlab.com/modenero/nitojs/tags).


## Can I trust this code?
> Don't trust. Verify.

We recommend every user of this library and the [nexajs](https://gitlab.com/nexajs) ecosystem audit and verify any underlying code for its validity and suitability,  including reviewing any and all of your project's dependencies.

Mistakes and bugs happen, but with your help in resolving and reporting [issues](https://gitlab.com/modenero/nitojs/issues), together we can produce open source software that is:

- Easy to audit and verify,
- Tested, with test coverage >95%,
- Advanced and feature rich,
- Standardized, using [prettier](https://github.com/prettier/prettier) and Node `Buffer`'s throughout, and
- Friendly, with a strong and helpful community, ready to answer questions.


## Documentation

Our docs are updated regularly.

### https://docs.nexajs.org

## Installation
``` bash
npm install nexajs-lib
# optionally, install a key derivation library as well
npm install ecpair bip32
# ecpair is the ECPair class for single keys
# bip32 is for generating HD keys
```

__WARNING__: We presently don't provide any tooling to verify that the release on `npm` matches GitHub.  As such, you should verify anything downloaded by `npm` against your own verified copy.


## Usage
Crypto is hard.

When working with private keys, the random number generator is fundamentally one of the most important parts of any software you write.
For random number generation, we *default* to the [`randombytes`](https://github.com/crypto-browserify/randombytes) module, which uses [`window.crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues) in the browser, or Node js' [`crypto.randomBytes`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback), depending on your build system.
Although this default is ~OK, there is no simple way to detect if the underlying RNG provided is good enough, or if it is __catastrophically bad__.
You should always verify this yourself to your own standards.

Finally, __adhere to best practice__.
We are not an authorative source of best practice, but, at the very least:

* [Don't re-use addresses](https://en.bitcoin.it/wiki/Address_reuse).
* Don't share BIP32 extended public keys ('xpubs'). [They are a liability](https://bitcoin.stackexchange.com/questions/56916/derivation-of-parent-private-key-from-non-hardened-child), and it only takes 1 misplaced private key (or a buggy implementation!) and you are vulnerable to __catastrophic fund loss__.
* [Don't use `Math.random`](https://security.stackexchange.com/questions/181580/why-is-math-random-not-designed-to-be-cryptographically-secure) - in any way - don't.
* Enforce that users always verify (manually) a freshly-decoded human-readable version of their intended transaction before broadcast.
* [Don't *ask* users to generate mnemonics](https://en.bitcoin.it/wiki/Brainwallet#cite_note-1), or 'brain wallets',  humans are terrible random number generators.


### Browser
The recommended method of using `nexajs-lib` in your browser is through [Browserify](https://github.com/substack/node-browserify).
If you're familiar with how to use browserify, ignore this and carry on, otherwise, it is recommended to read the tutorial at https://browserify.org/.

__NOTE__: We use Node Maintenance LTS features, if you need strict ES5, use [`--transform babelify`](https://github.com/babel/babelify) in conjunction with your `browserify` step (using an [`es2015`](https://babeljs.io/docs/plugins/preset-es2015/) preset).

__WARNING__: iOS devices have [problems](https://github.com/feross/buffer/issues/136), use at least [buffer@5.0.5](https://github.com/feross/buffer/pull/155) or greater,  and enforce the test suites (for `Buffer`, and any other dependency) pass before use.

## Examples
The below examples are implemented as integration tests, they should be very easy to understand.
Otherwise, pull requests are appreciated.
Some examples interact (via HTTPS) with a 3rd Party Blockchain Provider (3PBP).

- [Generate a random address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/addresses.spec.ts)
- [Import an address via WIF](https://gitlab.com/modenero/nitojs/blob/master/test/integration/addresses.spec.ts)
- [Generate a 2-of-3 P2SH multisig address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/addresses.spec.ts)
- [Generate a Testnet address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/addresses.spec.ts)
- [Create a 1-to-1 Transaction](https://gitlab.com/modenero/nitojs/blob/master/test/integration/transactions.spec.ts)
- [Import a BIP32 testnet xpriv and export to WIF](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Export a BIP32 xpriv, then import it](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Export a BIP32 xpub](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP32, bitcoin, account 0, external address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP44, bitcoin, account 0, external address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP49, bitcoin testnet, account 0, external address](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)
- [Use BIP39 to generate BIP32 addresses](https://gitlab.com/modenero/nitojs/blob/master/test/integration/bip32.spec.ts)

If you have a use case that you feel could be listed here, please [ask for it](https://gitlab.com/modenero/nitojs/issues/new)!


## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).


### Running the test suite

``` bash
npm test
npm run-script coverage
```

## Complementing Libraries
- [BIP39](https://gitlab.com/nexajs/bip39) - Mnemonic generation for deterministic keys
- [BIP32-Utils](https://gitlab.com/nexajs/bip32-utils) - A set of utilities for working with BIP32
- [Base58](https://github.com/cryptocoinjs/bs58) - Base58 encoding/decoding
- [Base58 Check](https://gitlab.com/nexajs/bs58check) - Base58 check encoding/decoding
- [Bech32](https://gitlab.com/nexajs/bech32) - A BIP173/BIP350 compliant Bech32/Bech32m encoding library


## LICENSE [MIT](LICENSE)
