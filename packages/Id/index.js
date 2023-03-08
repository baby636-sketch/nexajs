/* Import modules. */
import { EventEmitter } from 'events'
import { v4 as uuidv4 } from 'uuid'

/* Setup (non-ESM) debugger. */
import debugFactory from 'debug'
const debug = debugFactory('nexa:id')


export const login = () => {
    return 'Welcome!'
}

/**
 * ID Class
 *
 * Manage Nexa Identity Protocol
 */
export class ID extends EventEmitter {
    constructor(_params) {
        /* Initialize ID class. */
        debug('Initializing ID...')
        debug(JSON.stringify(_params, null, 2))
        super()

        // TBD
    }
}
