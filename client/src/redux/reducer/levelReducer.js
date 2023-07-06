
import {
    GET_LEVEL,
    
} from '../type';


const initialState ={
    levels:[]

}

const levelReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case GET_LEVEL:
           
            return   {...state,levels:payload.level} 

        default:

            return state

    };

};

export default levelReducer;
