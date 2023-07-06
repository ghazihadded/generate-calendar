
import {
    GET_GROUE_CLASS,
    DELETE_GROUPE_CLASS,
    ALL_CLASSES,
} from '../type';


const initialState ={
    groupeClasse:[]

}

const groupeClassReducer = (state = initialState, action) => {
           const {payload}=action
    switch (action.type) {
            
        case GET_GROUE_CLASS:
           
            return   {...state,groupeClasse:payload.groupeClasses} 
            case ALL_CLASSES:
           
            return   {...state,groupeClasse:payload.groupeClasses}

            case DELETE_GROUPE_CLASS:
           
            return   {...state,groupeClasse:[]}
        default:

            return state

    };

};

export default groupeClassReducer;
