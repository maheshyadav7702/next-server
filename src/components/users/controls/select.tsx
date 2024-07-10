import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material'

export default function Select(props: any) {
  const { name, label, value, error = null, onChange, options } = props

  return (
    <FormControl variant="outlined" {...(error && { error: true })} fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        sx={{ textAlign: 'left' }}
      >
        {options &&
          options?.map((item: any) => (
            <MenuItem key={item._id} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && <FormHelperText sx={{ margin: '0px' }}>{error}</FormHelperText>}
    </FormControl>
  )
}
