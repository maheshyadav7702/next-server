import { FilterDivider, FilterTitle, SubmitButton } from '@/styles'
import { FilterDrawerProps } from '@/types'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import useApiRequest from './useApiRequest'

const UsersFilterComponent = (props: FilterDrawerProps) => {
  const {
    drawerCloseHandle,
    roles,
    setRoles,
    setIsLoading,
    setRows,
    rolesList,
    setPage,
    setTotalRecords,
    setRoleIds,
    searchValue,
    rowsPerPage,
    sorting,
  } = props
  const [error, setError] = useState(false)

  const { getMethod } = useApiRequest()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (roles.length > 0) {
      const roleIds = roles.toString()

      const url = `/user?offset=0&limit=${rowsPerPage}&roleids=${roleIds}&searchText=${searchValue}${sorting}`
      getMethod(url, {}, setRows, setIsLoading, setTotalRecords)

      closeDrawer()
      setError(false)
      setRoles([...roles])
      setPage(0)
      setRoleIds(roleIds)
    } else {
      setError(true)
      setPage(0)
    }
  }

  const handleRolesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = roles?.indexOf(event?.target?.value)
    if (index === -1) {
      setRoles([...roles, event?.target?.value])
    } else {
      setRoles(roles?.filter((role) => role !== event?.target?.value))
    }
  }

  const closeDrawer = () => {
    drawerCloseHandle(false)
  }

  return (
    <Box
      p={4}
      textAlign="center"
      role="presentation"
      sx={{ width: { xs: '350px', md: '456px' } }}
    >
      <Grid display="flex" justifyContent="space-between">
        <Grid>
          <FilterTitle variant="h6" component="div">
            Filter by
          </FilterTitle>
        </Grid>
        <Grid>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={closeDrawer} />
        </Grid>
      </Grid>
      <FilterDivider />
      <Grid display="flex" justifyContent="flex-start">
        <Typography>Role</Typography>
      </Grid>

      <Grid>
        <form onSubmit={handleSubmit}>
          <Grid sx={{ mt: 2, ml: 4, display: 'flex' }}>
            <FormControl error>
              <FormGroup>
                {rolesList &&
                  rolesList.length > 0 &&
                  rolesList.map((list: any, i: number) => {
                    return (
                      <>
                        <FormControlLabel
                          label={list?.roleName}
                          value={list?._id}
                          sx={{ margin: '0' }}
                          control={
                            <Checkbox
                              sx={{ marginRight: '10px' }}
                              checked={roles?.includes(list._id)}
                              onChange={handleRolesChange}
                            />
                          }
                        />
                      </>
                    )
                  })}
              </FormGroup>
              {error && roles?.length === 0 && (
                <FormHelperText sx={{ margin: '0px', padding: '0' }}>
                  Please select atleast one option
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <FilterDivider />

          <Grid display="flex" justifyContent="flex-start">
            <SubmitButton
              type="submit"
              variant="contained"
              data-testid="filterButton"
            >
              Apply
            </SubmitButton>
          </Grid>
        </form>
      </Grid>
    </Box>
  )
}

export default UsersFilterComponent
