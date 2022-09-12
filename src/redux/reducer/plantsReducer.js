const initialState = {
    plants:[
        {
            top:20,
            left:20
          },
          {
            top:46,
            left:74
          }
    ]
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