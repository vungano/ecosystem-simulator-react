import rabbitsReducer from "./rabbitsReducer";
import foxesReducer from "./foxReducer";
import plantsReducer from "./plantsReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
        rabbits:rabbitsReducer,
        foxes: foxesReducer,
        plants: plantsReducer
})

export default rootReducers