const initialState = {
    rabbits:[
        {
            top: 84,
            left: 84,
            gender: 0,
            energy: 100,
            age:0,
            sexDrive:10
            },
            {
              top: 72,
              left: 42,
              gender: 1,
              energy: 99,
              age:1,
              sexDrive:10
            },
            {
                top: 22,
                left: 92,
                gender: 0,
                energy: 98,
                age:1,
                sexDrive:10
              },
              {
                top: 28,
                left: 58,
                gender: 1,
                energy: 97,
                age:1,
                sexDrive:10
              },
              {
                top: 6,
                left: 92,
                gender: 0,
                energy: 96,
                age:1,
                sexDrive:10
              },            {
                top: 92,
                left: 30,
                gender: 1,
                energy: 95,
                age:1,
                sexDrive:10
              },            {
                top: 20,
                left: 20,
                gender: 0,
                energy: 94,
                age:1,
                sexDrive:10
              },
              {
                top: 72,
                left: 42,
                gender: 1,
                energy: 100,
                age:1,
                sexDrive:10
              },
              {
                top: 78,
                left: 42,
                gender: 0,
                energy: 93,
                age:1,
                sexDrive:10
              }        
    ]
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