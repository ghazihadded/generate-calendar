
import {
    GET_CLASSES,
   CREATE_CLASSES,
   DELETE_CLASSES,
} from '../type';


const initialState ={
    classes:[]

}

const classesReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case CREATE_CLASSES:
           
            return   {...state,classes:[...state.classes,payload.class]}
            case GET_CLASSES:
           
            return   {...state,classes:payload.class}  
            case DELETE_CLASSES:
           
            return   {...state,classes:state.classes.filter(el=>el._id.toString() !==payload?.classe?._id.toString())}  

        default:

            return state

    };

};

export default classesReducer;
