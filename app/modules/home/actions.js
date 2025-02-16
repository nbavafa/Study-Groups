import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function updatePosts(time1, time2, uid, successCB, errorCB) {
  return (dispatch) => {
      api.updatePosts(time1, time2, uid, function (success, data, error) {
          if (success) successCB();
          else if (error) errorCB(error)
      });
  };
}

// Add Quote - CREATE (C)
export function addQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.addQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Quotes - READ (R)
export function getQuotes(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.getQuotes(function (success, data, error) {
            if (success) dispatch({type: t.QUOTES_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update Quote - UPDATE (U)
export function updateQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.updateQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Quote - DELETE (D)
export function deleteQuote(quote, errorCB) {
    return (dispatch) => {
        api.deleteQuote(quote, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Like/Unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}
