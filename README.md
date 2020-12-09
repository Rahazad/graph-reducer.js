# Graph-Reducer

> **Something like [lodash.merge()](https://lodash.com/docs/4.17.15#merge) *(a recursive version of [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign))* that specially designed for [roudex](https://github.com/Rahazad/roudex).**
>
> It additionally supports functions (in `payload(s)` argument(s)) to make it possible to transform properties based on their previous states/values.
>
> It also *deeply* compares the source state (source object) with the primary result (`newState`), during its original process and returns an additional value (`noTransform`) that shows the result of this comparison.

<p dir="auto">
	<a href="https://npmjs.com/package/@rahazad/graph-reducer">
		<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@rahazad/graph-reducer.svg">
	</a>
	<a href="https://packagephobia.now.sh/result?p=@rahazad/graph-reducer">
		<img src="https://packagephobia.now.sh/badge?p=@rahazad/graph-reducer" alt="install size">
	</a>
	<a href="https://npmjs.com/package/@rahazad/graph-reducer">
		<img alt="npm" src="https://img.shields.io/npm/dt/@rahazad/graph-reducer.svg">
	</a>
	<br>
	<a href="https://david-dm.org/Rahazad/graph-reducer.js">
		<img src="https://david-dm.org/Rahazad/graph-reducer.js.svg" alt="Dependencies Status">
	</a>
	<a href="https://david-dm.org/Rahazad/graph-reducer.js?type=dev">
		<img src="https://david-dm.org/Rahazad/graph-reducer.js/dev-status.svg" alt="devDependencies Status">
	</a>
	<br>
	<a href="https://github.com/Rahazad/graph-reducer.js/blob/master/LICENSE">
		<img alt="GitHub" src="https://img.shields.io/github/license/Rahazad/graph-reducer.js.svg">
	</a>
	<a href="https://github.com/Rahazad/graph-reducer.js/fork">
		<img src="https://img.shields.io/github/forks/Rahazad/graph-reducer.js.svg?style=social" alt="GitHub forks">
	</a>
	<a href="https://github.com/Rahazad/graph-reducer.js">
		<img src="https://img.shields.io/github/stars/Rahazad/graph-reducer.js.svg?style=social" alt="GitHub stars">
	</a>
</p>

## Installation

```bash
npm i @rahazad/graph-reducer
```

or using `yarn`:

```bash
yarn add @rahazad/graph-reducer
```

## Usage

```javascript
import graphReducer from '@rahazad/graph-reducer'

const srcState = {
    a: 'a',
    n: 10,
    v: {c: 'c'}
}

const payloads = [
    {
        a: 'A',
        v: {c: 'C'}
    },
    {
        n: n => n * 2
    },
]

const {newState} = graphReducer(srcState, ...payloads)

assert.deepStrictEqual(newState, {  // import assert from 'assert' // https://nodejs.org/api/assert.html
    a: 'A',
    n: 20,
    v: {c: 'C'}
})
```

## License

MIT © [Mir-Ismaili](https://github.com/mirismaili)
