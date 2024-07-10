import { PROFILE_TYPE } from '@/components/enums/profileType.enum'
import useApiRequest from '@/components/users/useApiRequest'
import SearchIcon from '@mui/icons-material/Search'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useRef } from 'react'

const useTableSearch = (
  setRows: any,
  setIsLoading: any,
  setPage: Dispatch<SetStateAction<number>>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setTotalRecords: Dispatch<SetStateAction<number>>,
  profileType: string,
  rowsPerPage: number,
  searchValue: string,
  setSearchValue: any,
  roleIds: string,
  sorting: string,
  tabIndex?: any,
  orgID?: string,
) => {
  const { getMethod } = useApiRequest()
  const { data: session } = useSession()
  const inputText = useRef()
  const orgId = orgID ? orgID : session?.user?.orgId

  const timeZoneValue = new Date().getTimezoneOffset()

  const searchComp = () => {
    const handleSearch = (e: any, buttonSearch: boolean) => {
      const specialChars = /[`!#$%^*()+\=\[\]{};:"\\|,<>\/?~]/
      const targetValue = buttonSearch ? e?.current?.value : e?.target?.value
      if (specialChars.test(targetValue)) {
        return
      }
      let target = targetValue?.replace(specialChars, '')

      const url =
        profileType === PROFILE_TYPE.USERS
          ? `/user?offset=0&limit=${rowsPerPage}&searchText=${target}&roleids=${roleIds}${sorting}`
          : profileType === PROFILE_TYPE.EMPLOYER
          ? `/employer/employer/list?offset=0&limit=${rowsPerPage}&searchText=${target}${sorting}`
          : profileType === PROFILE_TYPE.STAFF_USERS
          ? `/organization/staffUsers?orgId=64801b2de0cb793485f09fcf&offset=0&limit=${rowsPerPage}&searchText=${target}${sorting}`
          : profileType === PROFILE_TYPE.MANAGE_JOBS
          ? `jobs/get-jobs?orgId=${orgId}&formBuilderId=6487ff25da54220c8bb98c76&offset=0&limit=${rowsPerPage}&searchText=${target}&${sorting}&timeZoneValue=${timeZoneValue}&jobStatus=in-review,rejected`
          : profileType === PROFILE_TYPE.CASE_MANAGER
          ? tabIndex == 0
            ? `/casemanagement/get-cases?offset=0&limit=${rowsPerPage}&caseType=1&searchText=${target}${sorting}`
            : `/jobseeker/job-seeker/list?offset=0&limit=${rowsPerPage}&caseType=2&searchText=${target}${sorting}`
          : `/jobseeker/job-seeker/list?offset=0&limit=${rowsPerPage}&searchText=${target}&${roleIds}${sorting}`

      setSearchValue(target)
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
                border: 'none',
              },
            },
          }}
          id="outlined-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              border: '1px solid #DADAD9',
              height: 40,
            },
          }}
          inputRef={inputText}
          placeholder="Search"
          type="search"
          //onChange={(e) => setSearchValue(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e, false)
            }
          }}
        />
        <Button
          onClick={() => handleSearch(inputText, true)}
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

export default useTableSearch
