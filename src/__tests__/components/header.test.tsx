import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from 'components/header'

import withContext from 'helper/utils/with-context'

describe('Header', () => {
    const Element = withContext({
        children: <Header />,
    })

    afterEach(cleanup)

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(Element, div)
    })

    /* it('renders correctly', () => {
		const { getByTestId } = render()
	}) */

    it('matches snapshot', () => {
        const run = false

        expect(run).toBeTruthy()

        if (run) {
            const tree = renderer.create(Element).toJSON()
            expect(tree).toMatchSnapshot()
        }
    })
})
