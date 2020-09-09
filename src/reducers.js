const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'LOAD_FORM_META':
    case 'SEND_FORM': {
      return { ...state, loading: true }
    }
    case 'LOAD_FORM_META_SUCCEEDED': {
      return { ...state, formData: action.payload, loading: false }
    }
    case 'SEND_FORM_SUCCEEDED': {
      return { ...state, loading: false, popupText: action.payload }
    }
    case 'CLOSE_POPUP': {
      return { ...state, popupText: '' }
    }
    default:
      return state
  }
}

export default reducer
