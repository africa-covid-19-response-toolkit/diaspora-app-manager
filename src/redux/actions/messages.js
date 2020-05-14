import { MESSAGES } from "./types";

import { firestore } from "../../api/firebase";

export const messagesFetching = () => ({
  type: MESSAGES.FETCHING,
});

export const messagesFetched = (payload) => ({
  type: MESSAGES.FETCHED,
  payload,
});

export const messagesCreationFailed = () => ({
  type: MESSAGES.CREATION_FAILED,
});

export const messagesUpdateFailed = () => ({
  type: MESSAGES.UPDATE_FAILED,
});

export const messagesSaved = () => ({
  type: MESSAGES.SAVED,
});

export const getMessages = () => async (dispatch) => {
  dispatch(messagesFetching());
  firestore()
    .collection("messages")
    // .where("active", "==", true)
    // .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
      let messages = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let message = doc.data();
        message["id"] = doc.id;
        messages.push(message);
      });
      dispatch(messagesFetched(messages));
    });
};

export const addMessage = (message) => async (dispatch) => {
  firestore()
    .collection("messages")
    .add(message)
    .then(function (docRef) {
      if (docRef.id) dispatch(messagesSaved());
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(messagesCreationFailed());
      message.error(errorMessage);
    });
};

export const updateMessage = (id, message) => async (dispatch) => {
  firestore()
    .collection("messages")
    .doc(id)
    .update(message)
    .then(function (docRef) {
      dispatch(messagesSaved());
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage = error.message;
      console.log(errorMessage);
      dispatch(messagesUpdateFailed());
      message.error(errorMessage);
    });
};
