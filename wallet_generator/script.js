const bitcoin = require('bitcoinjs-lib');

const hash = bitcoin.crypto.sha256(Buffer.from('correct horse battery staple'));

const keys = bitcoin.ECPair.fromPrivateKey(hash);

const { address } = bitcoin.payments.p2pkh({ pubkey: keys.publicKey })

const wif = keys.toWIF()