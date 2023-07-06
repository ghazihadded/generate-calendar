
import {
    GET_USER,
    UPDATE_USER,
} from '../type';


const initialState ={
    user:null

}

const professeurReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case GET_USER:
           
            return   {...state,user:payload.user} 

        case UPDATE_USER:
           
            return   {...state,user:payload.user}
        default:

            return state

    };

};

export default professeurReducer;
