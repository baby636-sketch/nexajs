import decodeBase58AddressFormat from './decodeBase58AddressFormat.js'

export default (
    address,
    sha256
) => {
    const decoded = decodeBase58AddressFormat(address, sha256)

    if (typeof decoded === 'string') return decoded

    if (
        ![
            Base58AddressFormatVersion.p2pkh,
            Base58AddressFormatVersion.p2pkt,
            Base58AddressFormatVersion.p2sh20,
            Base58AddressFormatVersion.p2pkhTestnet,
            Base58AddressFormatVersion.p2sh20Testnet,
            Base58AddressFormatVersion.p2pkhCopayBCH,
            Base58AddressFormatVersion.p2sh20CopayBCH,
        ].includes(decoded.version)
    ) {
        return Base58AddressError.unknownAddressVersion
    }

    const hash160Length = 20

    if (decoded.payload.length !== hash160Length) {
        return Base58AddressError.incorrectLength
    }

    return decoded
}
