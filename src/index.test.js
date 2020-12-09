import {it} from '@jest/globals'
import merge from 'lodash.merge'
import graphReducer from './index'

/**
 * Created on 1399/9/12 (2020/12/2).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const srcState = {
	a: 'b',
	b: 10,
	v: {
		c: 'x',
		d: {
			f: {
				h: 'hello',
				m: 'world',
				x: [1, 24, 12],
			},
			l: 'fake',
		},
		'hello world': 'OK',
	},
	g: {},
	e: 2.718,
	n: {
		y: {u: 'u'},
		y2: 'yx',
	},
}

it('merge', () => {
	const payloads = [
		{
			e: 9,
			n: {y2: 'water'},
		},
	]
	const {newState} = graphReducer(srcState, ...payloads)

	const dstState2 = merge({}, srcState, ...payloads)
	expect(newState).toEqual(dstState2)
})

it('function', () => {
	const func = e => e * 2
	const payload = {
		e: func,
	}

	const {newState} = graphReducer(srcState, payload)

	expect(newState).toEqual({
		...srcState,
		e: func(srcState.e),
	})
})
