
import {
    LOGIN_USERS,
    REGISTER_USERS,
    GET_ADMIN,
    UPDATE_ADMIN,
} from '../type';


const initialState ={
    user:null,

}

const AdminReducer = (state = initialState, action) => {
           const {payload}=action
          
    switch (action.type) {
            
        case LOGIN_USERS:
           localStorage.setItem("token",payload.token)
            return   {...state,user:payload.user} 

        case REGISTER_USERS:
           localStorage.setItem("token",payload.token)
            return   {...state,user:payload.user} 

            case GET_ADMIN:
                 return   {...state,user:payload.user} 
                 case UPDATE_ADMIN:
                 return   {...state,user:payload.user}
                  
                 case "LOGOUT":
                    localStorage.removeItem('token')
                 return   {...state,user:null}
        default:

            return state

    };

};

export default AdminReducer;
