import ActionType from '../actions/ActionType';

const globalState = {
  isLoading: false,
  isSave: false,
  isRefresh: false,
  isEdit: false,
  isSuccess: false,
  contactDetail: {
    age: null,
    firstName: null,
    id: null,
    lastName: null,
    photo: null,
  },
};

const contactReducer = (state = globalState, action) => {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionType.SET_REFRESH:
      return {
        ...state,
        isRefresh: action.payload,
      };
    case ActionType.SET_SAVE:
      return {
        ...state,
        isSave: action.payload,
      };
    case ActionType.SET_CONTACT_DETAIL:
      return {
        ...state,
        contactDetail: action.payload,
      };
    case ActionType.SET_EDIT:
      return {
        ...state,
        isEdit: action.payload,
      };
    case ActionType.SET_FIRST_NAME:
      return {
        ...state,
        contactDetail: {
          ...state.contactDetail,
          firstName: action.payload,
        },
      };
    case ActionType.SET_LAST_NAME:
      return {
        ...state,
        contactDetail: {
          ...state.contactDetail,
          lastName: action.payload,
        },
      };
    case ActionType.SET_AGE:
      return {
        ...state,
        contactDetail: {
          ...state.contactDetail,
          age: action.payload,
        },
      };
    case ActionType.SET_MODAL:
        return {
            ...state,
            isSuccess: action.payload
        }
    default:
      return state;
  }
};

export default contactReducer;
