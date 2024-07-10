import { InputAdornment, TextField } from '@mui/material'

export default function Input(props: any) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    placeholderText,
    ...other
  } = props

  return (
    <TextField
      variant="outlined"
      id="input-with-icon-textfield"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={{
        '& .Mui-error': {
          margin: '0px',
        },
      }}
      {...other}
      {...(error && { error: true, helperText: error })}
      fullWidth
      placeholder={placeholderText}
      InputProps={{
        startAdornment: name === 'phonenumber' && (
          <InputAdornment position="start">
            <span>+1</span>
          </InputAdornment>
        ),
      }}
      inputProps={{
        minLength: name === 'zipcode' && 5,
        maxLength: name === 'phonenumber' ? 10 : name === 'zipcode' ? 10 : 50,
      }}
    />
  )
}
