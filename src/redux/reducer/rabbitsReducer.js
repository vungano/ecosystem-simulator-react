//RABBITS REDUCER ie global state for storing and tracking all the plants in the ecosystem

const initialState = {rabbits:[]}

//initialize random 25 rabbits in different positions and add them to initial state
for(let i=0;i<15;i++){
  const random = Math.random()*98
  const random2 = Math.random()*98
  let randomGender = Math.floor(Math.random() * 2);
  let height = (Math.floor(random/2)*2)
  let width = (Math.floor(random2/2)*2)
  
  //generate new Rabbit and add it to initial state
  let newRabit={
    top:height,
    left: width,
    gender: randomGender,
    energy: 100,
    age:0,
    sexDrive:11
  }
  initialState.rabbits.push(newRabit)
}

const rabbitsReducer = (state = initialState.rabbits , action) =>{
    switch(action.type){
        case 'SET_RABBITS':
            return action.payload

        case 'ADD_RABBIT':
            return [...state,action.payload]    

        case 'DELETE_RABBIT':
            let tempState = [...state]
            tempState.splice(action.payload,1)
            return tempState     

        default:
            return state
              
    }
}

export default rabbitsReducer