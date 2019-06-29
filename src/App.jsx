import React from 'react'
import 'tachyons'
import './index.css'
import useGetSet from 'react-use/lib/useGetSetState'
import equals from 'ramda/es/equals'
import { taggedSum } from 'daggy'
import mergeRight from 'ramda/es/mergeRight'
import pipe from 'ramda/es/pipe'
import trim from 'ramda/es/trim'
import isEmpty from 'ramda/es/isEmpty'

const useStateUpdate = initialState => updateFn => {
  const [get, set] = useGetSet(initialState)

  const send = msg => {
    const prev = get()
    const next = updateFn(msg)(prev)
    if (!equals(prev, next)) {
      set(next)
    }
  }

  return [get(), send]
}

const Msg = taggedSum('Msg', {
  OnIpChanged: ['value'],
  OnIpSubmit: [],
})

const update = msg => state => {
  const isBlank = pipe(
    trim,
    isEmpty,
  )
  return msg.cata({
    OnIpChanged: txt => mergeRight(state)({ ipTxt: txt }),
    OnIpSubmit: () => {
      if (isBlank(state.ipTxt)) {
        return state
      } else {
        return mergeRight(state)({ ipTxt: '' })
      }
    },
  })
}

export function App() {
  const [state, send] = useStateUpdate({ ipTxt: '' })(update)
  const { ipTxt } = state
  return (
    <div className="pv2 measure-wide center">
      <div>Header</div>
      <div className="pa1" />
      <form
        className=""
        onSubmit={e => {
          e.preventDefault()
          send(Msg.OnIpSubmit)
        }}
      >
        <input
          className="ph1 w-100 lh-copy"
          autoFocus
          type="text"
          value={ipTxt}
          onChange={e => send(Msg.OnIpChanged(e.target.value))}
        />
      </form>
    </div>
  )
}
