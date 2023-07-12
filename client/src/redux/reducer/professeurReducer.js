
import {
    GET_ALL_PROF,
    POST_PROF,
    GET_ALL_PROF_LEVEL
} from '../type';


const initialState ={
    professeurs:[]

}

const professeurReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case GET_ALL_PROF:
           
            return   {...state,professeurs:payload} 
            case POST_PROF:
           
            return   {...state,professeurs:[...state.professeurs,payload.user]} 
            case GET_ALL_PROF_LEVEL:
           
            return   {...state,professeurs:payload.user} 
        default:

            return state

    };

};

export default professeurReducer;
