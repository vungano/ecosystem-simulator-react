import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useInterval from '../../hooks/useInterval'
import '../../styles/rabbit-entity.css'
import { setRabbits, addPlants } from '../../redux/action'
import { useSelector, useDispatch } from 'react-redux'

function Rabbit(props) {
  //State in redux
  const rabbitObject = useSelector(state=> state.rabbits)
  const foxObject = useSelector(state=> state.foxes)
  const plantsObject = useSelector(state=> state.plants)
  const dispatch = useDispatch()
  
  //Function to move the rabbits
  function moveRabbit(){
    //Move in any random direction
      let tempState = [...rabbitObject]
      for(let i=0; i<tempState.length; i++){
          const rand = Math.floor(Math.random() * 4); 
          let y = tempState[i]
          
          switch(rand){
                case 0:
                  (y.top+4<98) ? y.top+=2 : y.top-=2
                  break;
                case 1:
                  (y.top-4>0)?y.top-=2 : y.top = y.top+=2
                  break;
                case 2:
                  (y.left+4<98)? y.left+=2 : y.left-=2
                  break;
                case 3:
                  (y.left-4>0)? y.left-=2 : y.left+=2 
                  break;       
              }           
            }    

    //Reduce energy and increase age and sex drive 
      for(let i =0 ; i<tempState.length; i++){
          tempState[i].energy-=1;
          tempState[i].sexDrive+=1
          tempState[i].age+=1
        }    
        dispatch(setRabbits(tempState)) 
    }
   
  //Function to check if there's been a collision between the rabbits
  function checkCollisions(){
    for(let i=0; i<rabbitObject.length-1;i++){
      for(let j=1; j<rabbitObject.length;j++){
          if(rabbitObject[i].top == rabbitObject[j].top && rabbitObject[i].left == rabbitObject[j].left &&i!=j){
              let temp = [...rabbitObject]
       
              //Check if 2 different sexes have met if so produce a kid and check if they have sufficient sex drive
              if(rabbitObject[i].gender != rabbitObject[j].gender && (rabbitObject[i].sexDrive>25 && rabbitObject[j].sexDrive>25)){
                const random = Math.random()*98
                const random2 = Math.random()*98
                let randomGender = Math.floor(Math.random() * 2);
                let height = (Math.floor(random/2)*2)
                let width = (Math.floor(random2/2)*2)
                
                //baby rabbit creation and add it to rabbits state
                let babyRabit={
                  top:height,
                  left: width,
                  gender: randomGender,
                  energy: 30,
                  age:0,
                  sexDrive:0
                }
                temp.push(babyRabit) 
                //set both rabbits sex drives back to zero
                temp[i].sexDrive = 0
                temp[j].sexDrive = 0
                //console.log("Baby born")
                dispatch(setRabbits(temp))
                

              }
              
              //Check if 2 males have collided if so the weaker one must go
              else if((rabbitObject[i].gender == rabbitObject[j].gender) && (rabbitObject[i].gender == 1)){
                  let tempState = [...rabbitObject]
                  if(rabbitObject[i].energy<rabbitObject[j].energy){
                      //console.log("Death by battle")
                      tempState.splice(i,1)
                      dispatch(setRabbits(tempState))
                      
                  }
                  
                  else if(rabbitObject[i].energy>rabbitObject[j].energy){
                    //console.log("Death by battle")
                    tempState.splice(j,1)
                    dispatch(setRabbits(tempState))
                   
                  }
                }              
          }
      }
    }    
  }  

  //console.log("<!------------------!>")
  //console.log(rabbitObject[0].top ," vs ", rabbitObject[1].top )
  //console.log(rabbitObject[0].left ," vs ", rabbitObject[1].left )
  //rabbitObject.length>0 ? console.log(rabbitObject[rabbitObject.length-1].energy , " vs ", rabbitObject[0].energy) : console.log('0')
 
  //function to check if there are any rabbits nearby for mating and if they have enough sex drive to mate
  function checkRadar(){
    for(let i=0; i<rabbitObject.length-1;i++){
       for(let j=1; j<rabbitObject.length;j++){
          if(((rabbitObject[i].top -rabbitObject[j].top)<=6 && (rabbitObject[i].top -rabbitObject[j].top)>=-6) && ((rabbitObject[i].left-rabbitObject[j].left)<=6 && (rabbitObject[i].left-rabbitObject[j].left)>=-6)){
              //rabbit i is male and j is female
              if((rabbitObject[i].gender>rabbitObject[j].gender) && (rabbitObject[i].sexDrive>25 && rabbitObject[j].sexDrive>25)){
                let tempState = [...rabbitObject]
                tempState[i].top = tempState[j].top
                tempState[i].left = tempState[j].left                
                dispatch(setRabbits(tempState))
              }

              //rabbit i is female and j is male
              else if((rabbitObject[i].gender<rabbitObject[j].gender) && (rabbitObject[i].sexDrive>25 && rabbitObject[j].sexDrive>25)){
                let tempState = [...rabbitObject]
                tempState[j].top = tempState[i].top
                tempState[j].left = tempState[i].left                
                dispatch(setRabbits(tempState))
              }
            }
        }
      }
  }

  //remove rabbits
  function checkDeleteRabbits(){
    for(let i=0; i<rabbitObject.length;i++){
      if(rabbitObject[i].energy<=0){
        //console.log("Death by expiry")
        let tempState = [...rabbitObject]
        tempState.splice(i,1)
        dispatch(setRabbits(tempState))
       
      }
    }
  }

  //if a rabbit is in a fox's radar then it gets eaten
  function checkFoodInRadar(){
    for(let i=0; i<rabbitObject.length; i++){
      for(let j=0; j<plantsObject.length; j++){
        if((rabbitObject[i].left - plantsObject[j].left)<=8 && (rabbitObject[i].left - plantsObject[j].left)>=-8 && (rabbitObject[i].top - plantsObject[j].top)<=8 && (rabbitObject[i].top - plantsObject[j].top)>=-8){
          let temp = [...plantsObject]
          let tempRabbits = [...rabbitObject]
          temp.splice(j,1)
          tempRabbits[i].energy = 50
          dispatch(addPlants(temp))
          dispatch(setRabbits(tempRabbits))
        }
      }
    }
  }

  
  function updateInterval(){
    checkFoodInRadar()
    moveRabbit()
    checkRadar()
    checkCollisions()
    checkDeleteRabbits()
  }

  useInterval(updateInterval,props.speed)

  //---->Mapping all rabbits available in state
   const rabbitItem = rabbitObject.map((item,id)=>{
    const rabbitStyle = {
        top: `${item.top}%`,
        left: `${item.left}%`,
        
        
    }
    const radarStyle = {
        top: `${item.top-4}%`,
        left: `${item.left-4}%`     
        
    }
    return(
        <div key={id}>
            <div className='rabit-radar' style={radarStyle}></div>
            <div className="rabbit" style={rabbitStyle}></div>
        </div>
    )
   })
 

  return (
    <div className='rabbit-container'>
        {rabbitItem}
      
    </div>
  )
}


export default Rabbit