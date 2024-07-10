import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'

export default function Checkbox1(props: any) {
  const { rolesList, setRoles, roles, type, setState } = props
  const [filterList, setFilterList] = useState<any>(roles)

  const handleRolesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = filterList?.indexOf(event?.target?.value)
    if (index === -1) {
      setFilterList([...filterList, event?.target?.value])
      setState([...filterList, event?.target?.value])
    } else {
      setFilterList(
        filterList?.filter((role: any) => role !== event?.target?.value),
      )
      setState(filterList?.filter((role: any) => role !== event?.target?.value))
    }
  }

  return (
    <FormControl sx={{ m: 2 }}>
      <FormGroup>
        {rolesList &&
          rolesList.length > 0 &&
          rolesList.map((list: any, i: number) => {
            return (
              <>
                <FormControlLabel
                  label={list?.value}
                  value={list?.id.toString()}
                  sx={{ margin: '10px 0' }}
                  control={
                    <Checkbox
                      sx={{ marginRight: '10px' }}
                      checked={filterList?.includes(list.id.toString())}
                      onChange={handleRolesChange}
                    />
                  }
                />
              </>
            )
          })}
      </FormGroup>
    </FormControl>
  )
}
