const Tx = require('ethereumjs-tx').Transaction;
require('dotenv').config({path: '.env'})
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/3c2e6fcec30a4270b7b2f2d5b23a63bb');

const account2 = '0x8a4E1d95f8679edD896Eda1101D4908d30b113a5';
const account1 = '0x8D85A8eE31aF8c90E0E2d167a25736b4c549A7Ae';

const pkey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');

web3.eth.getTransactionCount(account1, (err,txCount) => {
    const txObject = {
        from: account1,
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.4', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx(txObject, {'chain':'ropsten'});
    tx.sign(pkey1);

    const serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

})


