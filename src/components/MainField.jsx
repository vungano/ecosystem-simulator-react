import React from 'react'
import styled, { keyframes } from 'styled-components'
import '../styles/main-field.css'
import Rabbit from './entities/Rabbit'
import Foxes from './entities/Foxes'
import Plants from './entities/Plants'

function MainField(props) {
  return (
    <div className='main-field'>
        <Rabbit speed={props.speed}/>
        <Foxes speed={props.speed}/>
        <Plants speed={props.speed}/>
    </div>
  )
}

export default MainField



