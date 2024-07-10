import { TextField } from '@mui/material'

export default function Textarea(props: any) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    placeholderText,
    disableMode,
    ...other
  } = props

  return (
    <TextField
      type="text"
      multiline
      variant="outlined"
      id="input-with-icon-textfield"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onCut={onChange}
      onCopy={onChange}
      onPaste={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
      fullWidth
      placeholder={placeholderText}
      rows={4}
      sx={{
        '& .Mui-error': {
          margin: '0px',
        },
      }}
      inputProps={{
        maxLength: 2000,
      }}
      disabled={disableMode}
    />
  )
}
