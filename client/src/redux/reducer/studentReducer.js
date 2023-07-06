
import {
    GET_USERS,
    POST_STUDENT
} from '../type';


const initialState ={
    students:[]

}

const studentReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case GET_USERS:
           
            return   {...state,students:payload} 
           
            case POST_STUDENT:
           return   {...state,students:[...state.students,payload.user]} 

        default:

            return state

    };

};

export default studentReducer;
