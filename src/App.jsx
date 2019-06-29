import React from 'react'
import 'tachyons'
import './index.css'
import useGetSet from 'react-use/lib/useGetSetState'

export function App() {
  const [get, set] = useGetSet({ ipTxt: '' })
  const { ipTxt } = get()
  return (
    <div className="measure-wide center">
      <div>Header</div>
      <div className="">
        <input
          className="w-100 lh-copy"
          autoFocus
          type="text"
          value={ipTxt}
          onChange={e => set({ ipTxt: e.target.value })}
        />
      </div>
    </div>
  )
}
