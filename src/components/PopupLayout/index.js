import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Popup from 'arui-feather/popup';
import Button from 'arui-feather/button';
import { closePopup } from '../../actions'

const PopupLayout = () => {
  const popupText = useSelector(({ popupText }) => popupText)
  const dispatch = useDispatch()
  const closeHandler = () => dispatch(closePopup())

  return (
    <Popup
      size="xl"
      visible={!!popupText}
      target="screen"
    >
      <Button
        type="button"
        onClick={closeHandler}
      >
        Закрыть
      </Button>
      {popupText}
    </Popup>
  )
}

export default PopupLayout
