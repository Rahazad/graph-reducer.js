/**
 * Created on 1399/9/12 (2020/12/2).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const debugEnv = process.env.DEBUG?.split(',') ?? []
const debugMode =
	debugEnv.indexOf('graph-reducer') !== -1 ||
	debugEnv.indexOf('*') !== -1 && debugEnv.indexOf('-graph-reducer') === -1

const isObject = variable => Object.prototype.toString.call(variable) === '[object Object]'

let maxExploreDepth = 64

export const setMaxExploreDepth = value => maxExploreDepth = value

export const graphReducer = (srcState, ...payloads) => {
	const newState = {...srcState}

	let noTransform = true

	const reducer = new Reducer(srcState, maxExploreDepth)

	for (const [i, payload] of payloads.entries()) {
		if (!isObject(payload))
			throw new Error(`payload ${i} (payloads[${i}]) is not an Object:\n${payload}`)

		if (!reducer.reduce(newState, payload) && noTransform /* !== null */)
			noTransform = false
	}

	return {
		newState,
		noTransform,
	}
}

// noinspection JSUnfilteredForInLoop
class Reducer {
	noTransform = true

	constructor(srcState, maxExploreDepth) {
		this.srcState = srcState
		this.maxExploreDepth = maxExploreDepth
	}

	reduce(state, payload) {
		this.exploringDepth = 0
		this.reduceR(state, payload, 'state')
		return this.noTransform
	}

	/**
	 * @param state    Must be object (`{}`) or Array (`[]`)
	 * @param payload
	 * @param key
	 */
	reduceR(state, payload, key) {
		if (debugMode) {
			console.group(this.exploringDepth)
			console.log({[key]: state, payload})
		}

		if (++this.exploringDepth > this.maxExploreDepth) {
			console.groupEnd()
			console.error('exploringDepth (%d) exceeds maxExploreDepth (%d)', this.exploringDepth, this.maxExploreDepth)
			this.noTransform = null
			return
		}

		for (const [key, subState] of Object.entries(state)) {
			const subPayload = payload?.[key]

			if (isObject(subState)) {
				this.reduceR(state[key] = {...subState}, subPayload, key)
				continue
			}

			if (subState instanceof Array) {
				this.reduceR(state[key] = [...subState], subPayload, key)
				continue
			}

			if (subPayload !== undefined) {
				state[key] = typeof subPayload === 'function' ? subPayload(subState, this.srcState) : subPayload
				if (state[key] !== subState && this.noTransform /* !== null */) this.noTransform = false
			}
		}

		for (const key in payload) if (!(key in state)) {
			console.warn(`Existed key (${key}) in payload, is not present in srcState!`)
			if (this.noTransform /* !== null */) this.noTransform = false
			state[key] = payload[key]
		}

		this.exploringDepth--
		if (debugMode) {
			console.log({[key]: state})
			console.groupEnd()
		}
	}
}

export default graphReducer
