/* Import (test) modules. */
import { expect } from 'chai'

/* Import class. */
import { Rostrum } from '../index.js'

/* Import (individual) modules. */
import { addressDecode } from '../index.js'

const NEXA_TEST_ADDRESS = 'nexa:tqjdvl627lz78s5sr37u65d0rqskla20cpcjytl3n2mxwgsv55qqq09265twm'

describe( 'Rostrum (LIVE) Test Suite', () => {
    before( () => {
        console.info( `  ↳ targeting all JavaScript methods provided by the 'Rostrum' class.` )
    } )

    describe( 'Blockchain -> Address -> Decoding', () => {
        it( 'should receive an object from the REMOTE server', async () => {
            /* Request decoding. */
            const result = await addressDecode(NEXA_TEST_ADDRESS)

            expect(result).to.be.an('object')
        } )

        it( 'should receive a "token aware" address', async () => {
            /* Request decoding. */
            const result = await addressDecode(NEXA_TEST_ADDRESS)

            expect(result.is_token_aware).to.be.true
        } )

        it( 'should receive a matching payload', async () => {
            /* Request decoding. */
            const result = await addressDecode(NEXA_TEST_ADDRESS)

            expect(result.payload).to.equal('24d67f4af7c5e3c2901c7dcd51af18216ff54fc071222ff19ab667220ca50000')
        } )

        it( 'should receive a matching address type', async () => {
            /* Request decoding. */
            const result = await addressDecode(NEXA_TEST_ADDRESS)

            expect(result.type).to.equal('group')
        } )
    } )

    describe( 'errors', () => {
        // TBD
    } )

} )