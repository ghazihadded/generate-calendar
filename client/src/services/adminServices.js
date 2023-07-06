import http, { refreshToken } from "./axios";

import {
  LOGIN_USERS,
  REGISTER_USERS,
  GET_USERS,
  GET_ALL_PROF,
  GET_ADMIN,
  GET_USER,
  UPDATE_USER,
  UPDATE_ADMIN,
  CREATE_CLASSES,
  GET_CLASSES,
  DELETE_CLASSES,
  DELETE_GROUPE,
  CREATE_GROUPE,
  GET_GROUPES,
  GET_LEVEL,
  POST_STUDENT,
  POST_PROF,
  DELETE_GROUPE_CLASS,
  GET_GROUE_CLASS,
  ALL_CLASSES
} from "../redux/type";

import jwt_decode from "jwt-decode";

export const getAdmin = (token) => async (dispatch) => {
  try {
    if (token) {
      const jwt_Token_decoded = jwt_decode(token);
      dispatch({
        type: GET_ADMIN,
        payload: { user: jwt_Token_decoded },
      });
    } else {
      let http = refreshToken();
      let { data } = await http.get("/admin");
      dispatch({
        type: GET_ADMIN,
        payload: data,
      });

      console.log(data)
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (form) => async (dispatch) => {
  try {
    let { data } = await http.post("/admin/login", form);
    if (data.status === true) {
      dispatch({
        type: LOGIN_USERS,
        payload: data,
      });
    }
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const register = (form) => async (dispatch) => {
  try {
    let { data } = await http.post("/admin", form);
    if (data?.status === true) {
      dispatch({
        type: REGISTER_USERS,
        payload: data,
      });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAdmin = (form) => async (dispatch) => {
    let http = refreshToken();
  try {
    let { data } = await http.put("/admin", form);
    if (data?.status === true) {
      dispatch({
        type: UPDATE_ADMIN,
        payload: data,
      });
    }
    
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStudent = (form) => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/etudiant", form);

    dispatch({
      type: GET_USERS,
      payload: data.users,
    });

    //    return data
  } catch (error) {
    console.log(error);
  }
};

export const getAllProf = (form) => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/prof", form);

    dispatch({
      type: GET_ALL_PROF,
      payload: data.users,
    });

    //    return data
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (location, params) => async (dispatch) => {
  let http = refreshToken();
  try {
    if (location === "professeur") {
      const { data } = await http.get(`/prof/${params}`);
      dispatch({
        type: GET_USER,
        payload: data,
      });
    } else {
      let { data } = await http.get(`/etudiant/${params}`);
      dispatch({
        type: GET_USER,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (location, params, form) => async (dispatch) => {
  let http = refreshToken();
  try {
    if (location === "professeur") {
      const { data } = await http.put(`/prof/update/${params}`, form);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });

      return data;
    } else {
      let { data } = await http.put(`/etudiant/update/${params}`, form);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const createClasses = (title) => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.post("/classRoom", title);
    if (data?.status === true) {
      dispatch({
        type: CREATE_CLASSES,
        payload: data,
      });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getAllClass = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/classRoom");
   
      dispatch({
        type: GET_CLASSES,
        payload: data,
      });
   
  } catch (error) {
    console.log(error);
  }
};


export const deleteClass = (id) => async (dispatch) => {
 
  let http = refreshToken();
  try {
    let { data } = await http.delete(`/classRoom/delete/${id}`);
   
      dispatch({
        type: DELETE_CLASSES,
        payload: data,
      });

  } catch (error) {
    console.log(error);
  }
};


export const addToGroupe = (id) => async (dispatch) => {
 

  
  let http = refreshToken();
  try {
    let { data } = await http.post(`/groupe/create/${id}`);
   
    console.log(data)
      return data

  } catch (error) {
    console.log(error);
  }
};




export const createGroupe = (level) => async (dispatch) => {
 
  let http = refreshToken();
  try {
    let { data } = await http.post("/groupe", level);
    if (data?.status === true) {
      dispatch({
        type: CREATE_GROUPE,
        payload: data,
      });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getAllGroupe = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/groupe");
   
      dispatch({
        type: GET_GROUPES,
        payload: data,
      });

    
   
  } catch (error) {
    console.log(error);
  }
};


export const deleteGroupe = (id) => async (dispatch) => {
 
  let http = refreshToken();
  try {
    let { data } = await http.delete(`/groupe/delete/${id}`);
   
      dispatch({
        type: DELETE_GROUPE,
        payload: data,
      });

  } catch (error) {
    console.log(error);
  }
};


export const getAllLevel = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/level");
   
      dispatch({
        type: GET_LEVEL,
        payload: data,
      });


   
  } catch (error) {
    console.log(error);
  }
};


export const createStudent = (form) => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.post("/etudiant",form);
    
    if (data?.status === true) {
      dispatch({
        type: POST_STUDENT,
        payload: data,
      });
    }
     
      
    return data
   
  } catch (error) {
    console.log(error);
  }
};



export const createProf = (form) => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.post("/prof",form);
    if (data?.status === true) {
      dispatch({
        type: POST_PROF,
        payload: data,
      });
    }
    
  return data
   } catch (error) {
    console.log(error);
  }
};



export const createAllGroueClass = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.post("/groupeClass");
    
    if(data.status===true){
      dispatch({
        type: GET_GROUE_CLASS,
        payload: data,
      });
    }
     
 return data

   
  } catch (error) {
    console.log(error);
  }
};



export const deleteAllGroueClass = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.delete("/groupeClass");
   
    if(data.status===true){
      dispatch({
        type: DELETE_GROUPE_CLASS,
        payload: data,
      });
      return true
    }else{
      return false
    }


  
     


   
  } catch (error) {
    console.log(error);
  }
};



export const getAllGroueClass = () => async (dispatch) => {
  let http = refreshToken();
  try {
    let { data } = await http.get("/groupeClass");
   
      dispatch({
        type: ALL_CLASSES,
        payload: data,
      });

      console.log(data)


   
  } catch (error) {
    console.log(error);
  }
};


export const logOUt = () => async (dispatch) => {
  dispatch({
    type:"LOGOUT"
  })
};