import React from 'react'
import { render } from 'react-dom'
import 'tachyons'
import './index.css'
import { App } from './App'

const root = document.createElement('div')
root.id = 'root'
document.body.append(root)

render(<App />, root)
