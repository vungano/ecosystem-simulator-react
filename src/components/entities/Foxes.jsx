import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useInterval from '../../hooks/useInterval'
import '../../styles/fox-entity.css'
import { setFoxes, setRabbits} from '../../redux/action'
import { useSelector, useDispatch } from 'react-redux'

function Foxes(props) {
  //State in redux
  const foxObject = useSelector(state=> state.foxes)
  const rabbitObjects = useSelector(state=> state.rabbits)
  const dispatch = useDispatch()

  //Function to move the rabbits
  function moveFoxes(){
    //Move in any random direction
      let tempState = [...foxObject]
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
        dispatch(setFoxes(tempState)) 
    }
   
  //Function to check if there's been a collision between the rabbits
  function checkCollisions(){
    for(let i=0; i<foxObject.length-1;i++){
      for(let j=1; j<foxObject.length;j++){
          if(foxObject[i].top == foxObject[j].top && foxObject[i].left == foxObject[j].left &&i!=j){
              let temp = [...foxObject]
       
              //Check if 2 different sexes have met if so produce a kid and check if they have sufficient sex drive
              if(foxObject[i].gender != foxObject[j].gender && (foxObject[i].sexDrive>10 && foxObject[j].sexDrive>10)){
                const random = Math.random()*98
                const random2 = Math.random()*98
                let randomGender = Math.floor(Math.random() * 2);
                let height = (Math.floor(random/2)*2)
                let width = (Math.floor(random2/2)*2)
      
                //baby fox creation and add it to rabbits state
                let babyFox={
                  top:height,
                  left: width,
                  gender: randomGender,
                  energy: 100,
                  age:0,
                  sexDrive:0
                }
                temp.push(babyFox) 
                //set both foxes sex drives back to zero
                temp[i].sexDrive = 0
                temp[j].sexDrive = 0
                //console.log("Baby born")
                dispatch(setFoxes(temp))
                

              }
              
              //Check if 2 males have collided if so the weaker one must go
              else if((foxObject[i].gender == foxObject[j].gender) && (foxObject[i].gender == 1)){
                  let tempState = [...foxObject]
                  if(foxObject[i].energy<foxObject[j].energy){
                      //console.log("Death by battle")
                      tempState.splice(i,1)
                      dispatch(setFoxes(tempState))
                      
                  }
                  
                  else if(foxObject[i].energy>foxObject[j].energy){
                    //console.log("Death by battle")
                    tempState.splice(j,1)
                    dispatch(setFoxes(tempState))
                   
                  }
              }              
          }
      }
    }    
  }  

  //console.log("<!------------------!>")
  //console.log(foxObject[0].top ," vs ", foxObject[1].top )
  //console.log(foxObject[0].left ," vs ", foxObject[1].left )
  //foxObject.length>0 ? console.log(foxObject[foxObject.length-1].energy , " vs ", foxObject[0].energy) : console.log('0')
  

  //function to check if there are any rabbits nearby for mating and if they have enough sex drive to mate
  function checkRadar(){
    for(let i=0; i<foxObject.length-1;i++){
       for(let j=1; j<foxObject.length;j++){
          if(((foxObject[i].top -foxObject[j].top)<=6 && (foxObject[i].top -foxObject[j].top)>=-6) && ((foxObject[i].left-foxObject[j].left)<=6 && (foxObject[i].left-foxObject[j].left)>=-6)){
              //rabbit i is male and j is female
              if((foxObject[i].gender>foxObject[j].gender) && (foxObject[i].sexDrive>10 && foxObject[j].sexDrive>10)){
                let tempState = [...foxObject]
                tempState[i].top = tempState[j].top
                tempState[i].left = tempState[j].left                
                dispatch(setFoxes(tempState))
              }

              //rabbit i is female and j is male
              else if((foxObject[i].gender<foxObject[j].gender) && (foxObject[i].sexDrive>10 && foxObject[j].sexDrive>10)){
                let tempState = [...foxObject]
                tempState[j].top = tempState[i].top
                tempState[j].left = tempState[i].left                
                dispatch(setFoxes(tempState))
              }
            }
        }
      }
  }

  //remove rabbits
  function checkDeleteFoxes(){
    for(let i=0; i<foxObject.length;i++){
      if(foxObject[i].energy<=0){
        //console.log("Death by expiry")
        let tempState = [...foxObject]
        tempState.splice(i,1)
        dispatch(setFoxes(tempState))
       
      }
    }
  }

  //if a rabbit is in a fox's radar then it gets eaten
  function checkFoodInRadar(){
    for(let i=0; i<foxObject.length; i++){
      for(let j=0; j<rabbitObjects.length; j++){
        if((foxObject[i].left - rabbitObjects[j].left)<=4 && (foxObject[i].left - rabbitObjects[j].left)>=-4 && (foxObject[i].top - rabbitObjects[j].top)<=4 && (foxObject[i].top - rabbitObjects[j].top)>=-4){
          let temp = [...rabbitObjects]
          let tempFox = [...foxObject]
          tempFox[i].energy =100
          temp.splice(j,1)
          dispatch(setRabbits(temp))
          dispatch(setFoxes(tempFox))
        }
      }
    }
  }

  function updateInterval(){
    moveFoxes()
    checkRadar()
    checkCollisions()
    checkFoodInRadar()
    checkDeleteFoxes()
  }

  useInterval(updateInterval,props.speed)

  //---->Mapping all rabbits available in state
   const foxItem = foxObject.map((item,id)=>{
    const foxStyle = {
        top: `${item.top}%`,
        left: `${item.left}%`,
        
        
    }
    const radarStyle = {
        top: `${item.top-4}%`,
        left: `${item.left-4}%`     
        
    }
    return(
        <div key={id}>
            <div className='fox-radar' style={radarStyle}></div>
            <div className='fox' style={foxStyle}></div>
        </div>
    )
   })
 

  return (
    <div className='fox-container'>
        {foxItem}
      
    </div>
  )
}


export default Foxes