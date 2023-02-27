/* Import modules. */
import {
    binToHex,
    // encodeTransaction,
} from '@bitauth/libauth'

import { encodeTransaction } from './_encodeTransaction.js'

import createUnsignedInput from './createUnsignedInput'
import parseWIF from './parseWIF'
import unlockP2PKTInput from './unlockP2PKTInput'

/**
 * Create a transaction.
 *
 * @function
 *
 * @param privateKeyWIF  {string}                     Private Key in WIF format.
 * @param unspentOutputs {AddressListUnspentResponse} Prefix (in hex) to precede data.
 * @param outputs        {Array<Output>}              Array of outputs to include in transaction.
 *
 * @returns {Promise<Output>}	The OP_RETURN output script.
 */
const createTransaction = async (privateKeyWIF, unspentOutputs, outputs) => {
    console.error('CREATE TRANSACTION')
    // Parse the private key wif into the keypair and address.
    const [
        privateKey,
        publicKey,
        returnAddress
    ] = await parseWIF(privateKeyWIF)

    // Convert all coins to the Libauth Input format (unsigned)
    const inputs = [ ...unspentOutputs ].map(createUnsignedInput)

    // Assemble the unsigned transaction.
    const transaction = {
        version: 0,
        inputs,
        outputs,
        locktime: 0,
    }
    console.log('UNSIGNED TRANSACTION', JSON.parse(JSON.stringify(transaction)))
    // console.log('UNSIGNED TRANSACTION (encoded):', encodeTransaction(transaction))
    console.log('UNSIGNED TRANSACTION (encoded) (hex):', binToHex(encodeTransaction(transaction)))

    // Sign all inputs and add the generated unlocking scripts to the transaction.
    // eslint-disable-next-line require-atomic-updates
    transaction.inputs = await Promise.all(
        transaction.inputs.map(
            (input, inputIndex) => unlockP2PKTInput(
                transaction,
                input,
                inputIndex,
                privateKey,
                publicKey,
                returnAddress,
            )
        )
    )
    console.log('SIGNED TRANSACTION', transaction)
    console.log('SIGNED TRANSACTION (inputs):', transaction.inputs)

    // Hex encode the built transaction.
    const encodedTransaction = encodeTransaction(transaction) // FIXME Prepend (0) version.

    // Return the encoded transaction.
    return encodedTransaction
}

/* Export module. */
export default createTransaction
