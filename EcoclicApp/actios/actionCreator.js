import axios from "axios";
import ACTION_TYPES from "./acctionTypes";
export const login = (values) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOGIN_START });
    console.log("loggin start");
    console.log(values);

    axios
      .post("http://localhost:3000/auth/login", {
        username: values.username,
        password: values.password,
      })
      .then((responce) => {
        dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, payload: responce });
        console.log("succes");
      })
      .catch((error) => {
        // Alert.alert(respance.response.data);
        console.log("loggin failde on actioncreator");
        console.log(error);

        dispatch({ type: ACTION_TYPES.LOGIN_FAILURE, payload: error });
      });
  };
};
export const getArticlesForThatUser = (token) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_ARTICLE_START });
    axios
      .get("http://localhost:3000/article/my_article", {
        headers: { auth: token },
      })
      .then((responce) => {
        console.log("article get succefully in action creator");
        dispatch({
          type: ACTION_TYPES.GET_ARTICLE_SUCCESS,
          payload: responce,
        });
      })
      .catch(
        (error = (error) => {
          console.log("article error action creator");
          console.log(error);

          dispatch({ type: ACTION_TYPES.GET_ARTICLE_FAILURE, payload: error });
        })
      );
  };
};

/***************************actions for admin************** */
export const getAllClients = (token) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_CLIENT_START });
    axios
      .get("http://localhost:3000/user/", { headers: { auth: token } })
      .then((responce) => {
        dispatch({
          type: ACTION_TYPES.GET_CLIENT_SUCCESS,
          payload: responce,
        });
        console.log("client succed in action creator");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.GET_CLIENT_FAILURE,
          payload: error,
        });
        console.log("cleints faliure in action creator");
      });
  };
};
/********************************************************get companies from database action creator */
export const getCompanies = (token) => {
  return (dispatch, getState) => {
    axios
      .get("http://localhost:3000/company/", { headers: { auth: token } })
      .then((responce) => {
        dispatch({
          type: ACTION_TYPES.GET_COMPANY_SUCCESS,
          payload: responce,
        });
        console.log("companies succed in action creator");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.GET_COMPANY_FAILURE,
          payload: error,
        });
        console.log("companies faliure in action creator");
      });
  };
};
/*************************************************************get role from database********************** */
export const getRoles = (token) => {
  return (dispatch, getState) => {
    axios
      .get("http://localhost:3000/user/roles", { headers: { auth: token } })
      .then((responce) => {
        dispatch({
          type: ACTION_TYPES.GET_ROLES_SUCCESS,
          payload: responce,
        });
        console.log("roles succed in action creator");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.GET_ROLES_FAILURE,
          payload: error,
        });
        console.log("roles faliure in action creator");
      });
  };
};
/********************************************************add client to database action creator */

export const addClient = (token, client) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.ADD_CLIENT_START });
    axios
      .post(
        "http://localhost:3000/user/creat",
        {
          username: client.username,
          password: client.password,
          userFirstName: client.userFirstName,
          userLastName: client.userLastName,
          societe: client.company,
          role: client.role,
        },
        { headers: { auth: token } }
      )
      .then((responce) => {
        dispatch({
          type: ACTION_TYPES.ADD_CLIENT_SUCCESS,
          payload: { responce, client },
        });
        console.log("client added in action creator");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.ADD_CLIENT_FAILURE,
          payload: error,
        });
        console.log("cleint add faliure in action creator");
        console.log(error);
      });
  };
};
