import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadFormMeta } from './actions'
import SpinnerLayout from './components/SpinnerLayout'
import PopupLayout from './components/PopupLayout'
import FormPage from './components/Form';


const App = () => {
  const {
    formData,
  } = useSelector(
    ({ formData }) => ({ formData })
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadFormMeta())
  }, [])

  return (
    <div>
      <SpinnerLayout />
      <PopupLayout />
      {formData && <FormPage  { ...formData } />}
    </div>
  )
}

export default App