export const loadFormMeta = () => ({
  type: 'LOAD_FORM_META'
})

export const loadFormMetaSucceeded = formMeta => ({
  type: 'LOAD_FORM_META_SUCCEEDED',
  payload: formMeta,
})

export const sendForm = data => ({
  type: 'SEND_FORM',
  payload: data,
})

export const sendFormSucceeded = resp => ({
  type: 'SEND_FORM_SUCCEEDED',
  payload: resp,
})

export const closePopup = () => ({
  type: 'CLOSE_POPUP',
})