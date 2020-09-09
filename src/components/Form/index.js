import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Form from 'arui-feather/form'
import Heading from 'arui-feather/heading'
import FormField from 'arui-feather/form-field'
import Input from 'arui-feather/input'
import Select from 'arui-feather/select'
import Label from 'arui-feather/label'
import Button from 'arui-feather/button'

import { sendForm } from '../../actions'
import './style.scss'

const fieldTypesMap = {
  'TEXT': 'text',
  'NUMERIC': 'number',
}

const FormPage = ({ title, fields }) => {
  const defaultData = fields.reduce((acc, field) => ({ 
    ...acc,
    [field.name]: '',
  }), {})
  const [formData, setFormData] = useState(defaultData)
  console.log(formData)
  const changeHandler = (value, name, evt) => {
    evt.persist()
    setFormData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const formFields = fields.map(({ title, type, name, values }) => (
    <FormField key={name} className="form-wrap__field">
      <Label>
        <label htmlFor={name}>
          {title}
        </label>
      </Label>
      {fieldTypesMap[type] ? (
        <Input
          type={fieldTypesMap[type]}
          id={name}
          name={name}
          onChange={(value, evt) => changeHandler(value, name, evt)}
          value={formData[name]}
        />
      ) : (
          <Select
            name={name}
            onChange={(value, evt) => changeHandler(value.pop(), name, evt)}
            options={Object.keys(values).map(key => ({ value: key, text: values[key] }))}
            value={formData[name]}
          />
        )}

    </FormField>
  ))

  const dispatch = useDispatch()

  const submitHandler = (evt) => {
    evt.preventDefault()
    dispatch(sendForm(formData))
  }

  return (
    <div className="form-wrap">
      <Heading size="l">{title}</Heading>
      <Form
        className="form-wrap__form"
        onSubmit={submitHandler}
      >
        {formFields}
        <Button type="submit">Отправить</Button>
      </Form>
    </div>
  )
}

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object)
}

export default FormPage
