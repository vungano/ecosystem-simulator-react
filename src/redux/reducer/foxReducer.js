const initialState = {foxes:[]}

for(let i=0; i<5;i++){
    const random = Math.random()*98
    const random2 = Math.random()*98
    let randomGender = Math.floor(Math.random() * 2);
    let height = (Math.floor(random/2)*2)
    let width = (Math.floor(random2/2)*2)

    //generate new Fox and add it to initial state
    let newFox={
      top:height,
      left: width,
      gender: randomGender,
      energy: 100,
      age:0,
      sexDrive:16
    }
   initialState.foxes.push(newFox)
}


const foxesReducer = (state = initialState.foxes , action) =>{
    switch(action.type){
        case 'SET_FOXES':
            return action.payload

        case 'ADD_FOX':
            return [...state,action.payload]    

        case 'DELETE_FOX':
            let tempState = [...state]
            tempState.splice(action.payload,1)
            return tempState     

        default:
            return state
              
    }
}

export default foxesReducer