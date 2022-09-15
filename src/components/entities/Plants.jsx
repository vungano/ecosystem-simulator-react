import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInterval from '../../hooks/useInterval'
import { addPlants } from '../../redux/action'
import '../../styles/plants-entity.css'

function Plants(props) {

  const plantsObject = useSelector(state=> state.plants)
  const dispatch = useDispatch()
  

  function generatePlants(){
    let temp = [...plantsObject]
    for(let i=0; i<7; i++){
      const random = Math.random()*98
      const random_2 = Math.random()*98
      let height = (Math.floor(random/2)*2)
      let width = (Math.floor(random_2/2)*2)
    
      temp.push({
        top:height,
        left:width
      })
    }
    dispatch(addPlants(temp))
    //console.log("Pushed plants")
  }

  //console.log(plantsObject.length)
  useInterval(generatePlants,props.speed*25)
  
  const plantItem = plantsObject.map((item,id)=>{
    const plantsStyle ={
      top: `${item.top}%`,
      left: `${item.left}%`
    }
    return(
      <div key={id} className='plant' style={plantsStyle}></div>
    )
  })

  return (
    <div>
      {plantItem}
    </div>
  )
}

export default Plants