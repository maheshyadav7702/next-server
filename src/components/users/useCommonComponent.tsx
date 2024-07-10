import SearchIcon from '@mui/icons-material/Search'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { PROFILE_TYPE } from '@/components/enums/profileType.enum'
import useApiRequest from '@/components/users/useApiRequest'

const useCommonComponent = (
  setRows: any,
  setIsLoading: any,
  setPage: Dispatch<SetStateAction<number>>,
  setTotalRecords: Dispatch<SetStateAction<number>>,
  profileType: string,
  rowsPerPage: number,
  searchValue: string,
  setSearchValue: any,
  roleIds: string,
  sorting: string,
) => {
  const { getMethod } = useApiRequest()

  const searchComp = () => {
    const handleSearch = (e: any) => {
      const specialChars = /[`!#$%^*()+\=\[\]{};:"\\|,<>\/?~\s]/
      if (specialChars.test(e.target.value)) {
        return
      }
      let target = e.target.value.replace(specialChars, '')

      const url =
        profileType === PROFILE_TYPE.USERS
          ? `/user?offset=0&limit=${rowsPerPage}&searchText=${target}&roleids=${roleIds}${sorting}`
          : `/jobseeker/job-seeker/list?offset=0&limit=${rowsPerPage}&searchText=${target}&${roleIds}${sorting}`
      setPage(0)
      getMethod(url, {}, setRows, setIsLoading, setTotalRecords)
    }

    return (
      <>
        <TextField
          sx={{
            mt: 2,

            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                border: '1px solid #D4C4BE',
              },
            },
            input: {
              '&::placeholder': {
                fontSize: profileType !== PROFILE_TYPE.USERS ? '12px' : '16px',
              },
            },
          }}
          id="outlined-search"
          InputProps={{
            [profileType == PROFILE_TYPE.USERS
              ? 'startAdornment'
              : 'endAdornment']: (
              <InputAdornment
                position={profileType == PROFILE_TYPE.USERS ? 'start' : 'end'}
              >
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              border: '1px solid #DADAD9',
              height: 40,
            },
          }}
          placeholder={
            profileType === PROFILE_TYPE.USERS
              ? 'Search'
              : 'Search by Name / Email / SSN'
          }
          type="search"
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleSearch(e)
            }
          }}
          onChange={(e) => setSearchValue(e)}
        />
        <Button
          onClick={() => handleSearch(searchValue)}
          variant="contained"
          sx={{ mt: 2, ml: 1, minWidth: '40px', padding: '6px' }}
        >
          <SearchIcon />
        </Button>
      </>
    )
  }

  return {
    searchComp,
  }
}

export default useCommonComponent
