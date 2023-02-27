import {
    flattenBinArray,
    numberToBinUintLE,
    numberToBinUint32LE,
} from '@bitauth/libauth'

import { encodeTransactionInputs } from './_encodeTransactionInputs.js'
import { encodeTransactionOutputs } from './_encodeTransactionOutputs.js'

export const encodeTransaction = (tx) =>
  tx.version === 0 ?
  new Uint8Array([tx.version,
    ...flattenBinArray([
    encodeTransactionInputs(tx.inputs),
    encodeTransactionOutputs(tx.outputs),
    numberToBinUint32LE(tx.locktime),
  ])])
  : flattenBinArray([
    numberToBinUintLE(tx.version), // FIXME This will not support (0) value.
    encodeTransactionInputs(tx.inputs),
    encodeTransactionOutputs(tx.outputs),
    numberToBinUint32LE(tx.locktime),
  ])
