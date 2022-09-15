const initialState = {plants:[]}

for(let i=0;i<30;i++){
  const random = Math.random()*98
  const random2 = Math.random()*98
  let height = (Math.floor(random/2)*2)
  let width = (Math.floor(random2/2)*2)
  
  //Generate new plant and add it to initial state
  let newPlant={
    top:height,
    left: width,
    }
  initialState.plants.push(newPlant)
}

const plantsReducer = (state=initialState.plants, action)=>{
    switch(action.type){
        case 'ADD_PLANTS':
            return action.payload
        
         default:
            return state   
    }
}

export default plantsReducer