import { QUESTIONS } from "./types";

import { firestore } from "../../api/firebase";

export const questionsFetching = () => ({
  type: QUESTIONS.FETCHING,
});

export const questionsFetched = (payload) => ({
  type: QUESTIONS.FETCHED,
  payload,
});

export const questionsCreationFailed = () => ({
  type: QUESTIONS.CREATION_FAILED,
});

export const questionsUpdateFailed = () => ({
  type: QUESTIONS.UPDATE_FAILED,
});

export const questionsSaved = () => ({
  type: QUESTIONS.SAVED,
});

export const getQuestions = () => async (dispatch) => {
  dispatch(questionsFetching());
  firestore()
    .collection("questions")
    // .where("active", "==", true)
    // .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
      let questions = [];
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, doc.data());
        // doc.data() is never undefined for query doc snapshots
        let question = doc.data();
        question["id"] = doc.id;
        questions.push(question);
      });
      console.log(questions);
      dispatch(questionsFetched(questions));
    });
};

export const addQuestion = (question, id) => async (dispatch) => {
  firestore()
    .collection("questions")
    .doc(id)
    .set(question)
    .then(function () {
      dispatch(questionsSaved());
    })
    .catch(function (error) {
      console.log(error);
      let errorQuestion = error.question;
      console.log(errorQuestion);
      dispatch(questionsCreationFailed());
      question.error(errorQuestion);
    });
};

export const updateQuestion = (id, question) => async (dispatch) => {
  firestore()
    .collection("questions")
    .doc(id)
    .update(question)
    .then(function (docRef) {
      dispatch(questionsSaved());
    })
    .catch(function (error) {
      console.log(error);
      let errorQuestion = error.question;
      console.log(errorQuestion);
      dispatch(questionsUpdateFailed());
      question.error(errorQuestion);
    });
};
