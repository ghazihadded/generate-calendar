
import {
    GET_GROUPES,
    CREATE_GROUPE,
    DELETE_GROUPE,
} from '../type';


const initialState ={
    groupes:[]

}

const groupesReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case CREATE_GROUPE:
           
            return   {...state,groupes:[...state.groupes,payload.groupe]}
            case GET_GROUPES:
           
            return   {...state,groupes:payload.groupe}  
            case DELETE_GROUPE:
           
            return   {...state,groupes:state.groupes.filter(el=>el._id.toString() !==payload?.groupe?._id.toString())}  

        default:

            return state

    };

};

export default groupesReducer;
