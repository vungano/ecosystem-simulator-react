const initialState = {
    foxes:[
        {
            top: 90,
            left: 14,
            gender: 0,
            energy: 100,
            age:0,
            sexDrive:10
            },
            { top: 8,
                left: 30,
                gender: 1,
                energy: 95,
                age:1,
                sexDrive:10
              },            {
                top: 28,
                left: 80,
                gender: 0,
                energy: 94,
                age:1,
                sexDrive:10
              },
              {
                top: 34,
                left: 62,
                gender: 1,
                energy: 100,
                age:1,
                sexDrive:10
              },
              {
                top: 58,
                left: 16,
                gender: 0,
                energy: 93,
                age:1,
                sexDrive:10
              }        
    ]
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