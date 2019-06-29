import React from 'react'
import 'tachyons'
import './index.css'
import useGetSet from 'react-use/lib/useGetSetState'
import equals from 'ramda/es/equals'
import { taggedSum } from 'daggy'
import assoc from 'ramda/es/assoc'

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
})

const update = msg => state => {
  return msg.cata({
    OnIpChanged: txt => assoc('ipTxt')(txt)(state),
  })
}

export function App() {
  const [state, send] = useStateUpdate({ ipTxt: '' })(update)
  const { ipTxt } = state
  return (
    <div className="pv2 measure-wide center">
      <div>Header</div>
      <div className="pa1" />
      <div className="">
        <input
          className="ph1 w-100 lh-copy"
          autoFocus
          type="text"
          value={ipTxt}
          onChange={e => send(Msg.OnIpChanged(e.target.value))}
        />
      </div>
    </div>
  )
}
