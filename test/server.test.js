/** @jest-environment node */
import withReduxSaga from '..'

import AsyncGetInitialProps from './components/async-get-initial-props'
import ClassComponent from './components/class-component'
import FunctionalComponent from './components/functional-component'
import SyncGetInitialProps from './components/sync-get-initial-props'

import wrapper from './store/store-wrapper'
import createSnapshot from './utils/create-snapshot'
import getInitialProps from './utils/get-initial-props'

import {ASYNC_REDUX_SAGA_PROP_TEXT, STATIC_PROP_TEXT, SYNC_REDUX_PROP_TEXT} from './constants'

test('Wrapped component passes along React props', () => {
  const WrappedComponent = wrapper.withRedux(
    withReduxSaga(FunctionalComponent),
  )

  createSnapshot(WrappedComponent)
})

test('Wrapped component skips getInitialProps when it does not exist', async () => {
  const WrappedComponent = wrapper.withRedux(
    withReduxSaga(ClassComponent),
  )

  const props = await getInitialProps(WrappedComponent)

  createSnapshot(WrappedComponent, props)
})

test('Wrapped component awaits synchronous getInitialProps', async () => {
  const WrappedComponent = wrapper.withRedux(
    withReduxSaga(SyncGetInitialProps),
  )

  const props = await getInitialProps(WrappedComponent)

  expect(props.initialState).toEqual({syncReduxProp: SYNC_REDUX_PROP_TEXT})
  expect(props.initialProps).toEqual({staticProp: STATIC_PROP_TEXT})

  createSnapshot(WrappedComponent, props)
})

test('Wrapped component awaits asynchronous getInitialProps', async () => {
  const WrappedComponent = wrapper.withRedux(
    withReduxSaga(AsyncGetInitialProps),
  )

  const props = await getInitialProps(WrappedComponent)

  console.log('props: ', props)

  expect(props.initialState).toEqual({
    syncReduxProp: SYNC_REDUX_PROP_TEXT,
    asyncReduxSagaProp: ASYNC_REDUX_SAGA_PROP_TEXT,
  })
  expect(props.initialProps).toEqual({staticProp: STATIC_PROP_TEXT})

  createSnapshot(WrappedComponent, props)
})
