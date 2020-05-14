import { message } from "antd";
import { USER } from "./types";

import { firestore, auth, functions, storage } from "../../api/firebase";
import {} from "react-router-dom";

export const userAuthenticating = () => ({
  type: USER.AUTHENTICATING,
});

export const userAuthenticated = (payload) => ({
  type: USER.AUTHENTICATED,
  payload,
});

export const userAuthenticationFailed = () => ({
  type: USER.AUTHENTICATION_FAILED,
});

export const userDataFetched = (payload) => ({
  type: USER.DATA_FETCHED,
  payload,
});

export const usersListFetched = (payload) => ({
  type: USER.LIST_FETCHED,
  payload,
});

export const userCreating = () => ({
  type: USER.CREATING,
});

export const userCreated = () => ({
  type: USER.CREATED,
});

export const userCreationFailed = () => ({
  type: USER.CREATION_FAILED,
});

export const userUpdating = () => ({
  type: USER.UPDATING,
});

export const userUpdated = () => ({
  type: USER.UPDATED,
});

export const userUpdateFailed = () => ({
  type: USER.UPDATE_FAILED,
});

export const userWorkSaved = () => ({
  type: USER.USER_WORK_SAVED,
});

export const userWorkUpdated = () => ({
  type: USER.USER_WORK_UPDATED,
});

export const userWorkFetched = (payload) => ({
  type: USER.USER_WORK_DATA_FETCHED,
  payload,
});

export const selectedUserWorkFetched = (payload) => ({
  type: USER.SELECTED_USER_WORK_DATA_FETCHED,
  payload,
});

export const selectedUserDataFetched = (payload) => ({
  type: USER.SELECTED_USER_DATA_FETCHED,
  payload,
});

export const userWorkSelected = (payload) => ({
  type: USER.USER_WORK_SELECTED_FETCHED,
  payload,
});

export const userActionSuccessful = () => ({
  type: USER.ACTION_SUCCESSFUL,
});

export const userStartAction = () => ({
  type: USER.START_ACTION,
});

export const userSignedOut = () => ({
  type: USER.SIGN_OUT,
});

export const signIn = (email, password) => async (dispatch) => {
  dispatch(userAuthenticating());
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (user) {
        dispatch(userAuthenticated(user));
        dispatch(fetchUserData(user.user.uid));
        dispatch(fetchUserWorks(user.user.uid));
      }
    })
    .catch((error) => {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(userAuthenticationFailed());
      message.error(errorMessage);
    });
};

export const signOut = () => (dispatch) => {
  try {
    auth()
      .signOut()
      .then(function () {
        dispatch(userSignedOut());
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });
  } catch (error) {
    throw new Error(message);
  }
};

export const fetchUserData = (uid) => async (dispatch) => {
  firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((doc) => {
      // querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc);
      let data = doc.data();
      if (data && doc.id) data["id"] = doc.id;
      dispatch(userDataFetched(data));
      dispatch(fetchUserWorks(doc.id));
      // });
    });
};

export const createUser = (data) => async (dispatch) => {
  const adminCreateUser = functions().httpsCallable("createUser");
  dispatch(userCreating());
  adminCreateUser(data).then((result) => {
    // Read result of the Cloud Function.
    let { error, userRecord } = result.data;
    if (error) {
      let { codePrefix, errorInfo } = error;
      message.error(errorInfo.message);
      dispatch(userCreationFailed());
    } else if (userRecord) {
      // firebase.auth().sendPasswordResetEmail(data.email, {
      //   url: `https://mucybersecurity.firebaseapp.com/login?email=${data.email}`
      // });

      // Add a new document in collection "cities"
      firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set(data)
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      dispatch(userCreated());
    }
    // ...
  });
};

export const fetchUsers = (userType = null) => async (dispatch) => {
  if (userType === "students")
    firestore()
      .collection("users")
      .where("userType", "in", ["graduate", "undergraduate", "doctoral"])
      .where("active", "==", true)
      .onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.data());
          let user = doc.data();
          user["id"] = doc.id;
          users.push(user);
        });
        dispatch(usersListFetched(users));
      });
  else if (userType)
    firestore()
      .collection("users")
      .where("userType", "==", userType)
      .where("active", "==", true)
      .onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.data());
          let user = doc.data();
          user["id"] = doc.id;
          users.push(user);
        });
        dispatch(usersListFetched(users));
      });
  else
    firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.data());
          let user = doc.data();
          user["id"] = doc.id;
          users.push(user);
        });
        dispatch(usersListFetched(users));
      });
};

export const updateUser = (id, user) => async (dispatch) => {
  console.log("here");
  dispatch(userUpdating());
  firestore()
    .collection("users")
    .doc(id)
    .update(user)
    .then(function (docRef) {
      dispatch(userUpdated());
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(userUpdateFailed());
      message.error(errorMessage);
    });
};

export const updateUserWork = (id, userWork) => async (dispatch) => {
  dispatch(userUpdating());
  firestore()
    .collection("userWorks")
    .doc(id)
    .update(userWork)
    .then(function (docRef) {
      dispatch(userWorkUpdated());
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(userUpdateFailed());
      message.error(errorMessage);
    });
};

export const addUserWork = (userWork) => async (dispatch) => {
  firestore()
    .collection("userWorks")
    .add(userWork)
    .then(function (docRef) {
      if (docRef.id) dispatch(userWorkSaved());
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(userCreationFailed());
      message.error(errorMessage);
    });
};

export const fetchUserWorks = (id) => async (dispatch) => {
  // dispatch(userWorksFetching());
  firestore()
    .collection("userWorks")
    .where("user", "==", id)
    .orderBy("year", "desc")
    .onSnapshot((querySnapshot) => {
      let userWorks = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let userWork = doc.data();
        userWork["id"] = doc.id;
        userWorks.push(userWork);
      });
      dispatch(userWorkFetched(userWorks));
    });
};

export const fetchUserWork = (id) => async (dispatch) => {
  firestore()
    .collection("userWorks")
    .doc(id)
    .onSnapshot(function (doc) {
      dispatch(userWorkSelected(doc.data()));
    });
};

export const fetchSelectedUserData = (uid) => async (dispatch) => {
  firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((doc) => {
      // querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc);
      let data = doc.data();
      data["id"] = doc.id;
      dispatch(selectedUserDataFetched(data));
      dispatch(fetchSelectedUserWorks(doc.id));
      // });
    });
};

export const fetchSelectedUserWorks = (id) => async (dispatch) => {
  // dispatch(userWorksFetching());
  firestore()
    .collection("userWorks")
    .where("user", "==", id)
    .orderBy("year", "desc")
    .onSnapshot((querySnapshot) => {
      let userWorks = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let userWork = doc.data();
        userWork["id"] = doc.id;
        userWorks.push(userWork);
      });
      dispatch(selectedUserWorkFetched(userWorks));
    });
};

export const uploadProfileImage = (uid, fileName, file) => async (dispatch) => {
  var storageRef = storage().ref();
  // dispatch(userWorksFetching());
  // firestore()
  //   .collection("userWorks")
  //   .where("user", "==", id)
  //   .orderBy("year", "desc")
  //   .onSnapshot(querySnapshot => {
  //     let userWorks = [];
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       let userWork = doc.data();
  //       userWork["id"] = doc.id;
  //       userWorks.push(userWork);
  //     });
  //     dispatch(selectedUserWorkFetched(userWorks));
  //   });
  const profileImage = storageRef.child(`${uid}/images/${fileName}`);
  profileImage.put(file).then((snapshot) => {
    profileImage.getDownloadURL().then((url) => {
      if (url) {
        firestore()
          .collection("users")
          .doc(uid)
          .update({ profileImage: url })
          .then(function (docRef) {
            dispatch(userUpdated());
          })
          .catch(function (error) {
            console.log(error);
            let errorMessage = error.message;
            console.log(errorMessage);
            dispatch(userUpdateFailed());
            message.error(errorMessage);
          });
      }
    });
  });
};

export const deleteUserWork = (id) => async (dispatch) => {
  dispatch(userStartAction());
  firestore()
    .collection("userWorks")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
      dispatch(userActionSuccessful());
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
