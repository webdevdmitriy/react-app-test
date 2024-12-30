export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true
  },

  values: {
    post: '',
    title: '',
    date: '',
    tag: ''
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'RESET_VALIDITY': {
      return {
        ...state,
        isValid: INITIAL_STATE.isValid
      }
    }
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length
      const postValidity = state.values.post?.trim().length
      const dateValidity = state.values.date?.trim().length
      return {
        ...state,
        isValid: {
          title: titleValidity,
          post: postValidity,
          date: dateValidity
        },
        isFormReadyToSubmit: titleValidity && postValidity && dateValidity
      }
    }
    case 'CLEAR': {
      return {
        ...state,
        values: INITIAL_STATE.values
      }
    }
    case 'SET_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value
        }
      }
    }
  }
}
