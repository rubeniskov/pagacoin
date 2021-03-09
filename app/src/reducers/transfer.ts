import { Action } from 'redux';
const TYPE_TRANSFER_SET_FROM = 'TYPE_TRANSFER_SET_FROM';
const TYPE_TRANSFER_SET_TO = 'TYPE_TRANSFER_SET_TO';

const transferReducer = (state: Action, { type, payload }: any) => {
  switch(type) {
    case TYPE_TRANSFER_SET_FROM:  {
      return {
        ...state,
        from: payload
      }
    }
    case TYPE_TRANSFER_SET_TO:  {
      return {
        ...state,
        to: payload
      }
    }
  }

  return state;
}

export default transferReducer;
