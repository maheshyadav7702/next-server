import { useState } from 'react'

export function useForm(
  initialFValues: any,
  validateOnChange = false,
  validate: any,
) {
  const [values, setValues] = useState<any>(initialFValues)
  const [errors, setErrors] = useState<any>(null)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    const specialChars = /[`!#$%^*()+\=\[\]{};:"\\|,<>\/?~\s]/
    if (name === 'email') {
      if (specialChars.test(e.target.value)) {
        return
      }
    }

    setValues({
      ...values,
      [name]:
        name === 'phonenumber'
          ? value.replace(/[^0-9]+/gi, '')
          : name === 'zipcode'
          ? value.replace(/[^0-9, -]+/gi, '').replace(/(-)\1/g, '')
          : name === 'firstName' || name === 'lastName'
          ? value.replace(/[^a-z']/gi, '')
          : name === 'city'
          ? value.replace(/[^a-z, '']/gi, '')
          : name === 'address1' || name === 'address2'
          ? value.replace(/[^A-Z0-9, .,_,:,#,/,-]+/i, '')
          : name === 'email'
          ? value.replace(specialChars, '')
          : value,
    })
    if (validateOnChange) validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues)
    setErrors(null)
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  }
}

export function Form(props: any) {
  const { children, ...other } = props
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
