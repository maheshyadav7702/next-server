import { PROFILE_TYPE } from '@/components/enums/profileType.enum'
import { THEME } from '@/constants'
import { ColumnProps, UsersProps, tableProps } from '@/types/tableTypes'
import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import useApiRequest from './useApiRequest'

export default function useTable(
  records: UsersProps,
  columns: ColumnProps,
  pages: number[],
  page: number,
  setPage: any,
  rowsPerPage: number,
  setRowsPerPage: any,
  setRows: any,
  setIsLoading: any,
  totalRecords: number,
  setTotalRecords: Dispatch<SetStateAction<number>>,
  profileType: string,
  roleIds: string,
  searchValue: string,
  sorting: string,
  setSorting: any,
  tabIndex?: any,
  orgIdNum?: any,
) {
  const [order, setOrder] = useState<any>('')
  const [orderBy, setOrderBy] = useState<any>('')
  const [sortStatus, setSortStatus] = useState(true)
  const { data: session } = useSession()
  const orgId = session?.user?.orgId
  const router = useRouter()
  const { jobseeker_id } = router.query

  const { getMethod } = useApiRequest()

  const timeZoneValue = new Date().getTimezoneOffset()

  const TblContainer = (props: any) => <Table>{props.children}</Table>

  const TblHead = () => {
    const handleClick = (colId: string, status: boolean) => {
      setOrderBy(colId)
      setSortStatus(status)
      const sortOrder = status ? 'desc' : 'asc'
      setOrder(sortOrder)
      const startFrom = Number(page * rowsPerPage)

      const url =
        profileType === PROFILE_TYPE.USERS
          ? `/user?offset=${startFrom}&limit=${rowsPerPage}&${colId}=${sortOrder}&roleids=${roleIds}&searchText=${searchValue}`
          : profileType === PROFILE_TYPE.EMPLOYER
          ? `/employer/employer/list?offset=${startFrom}&limit=${rowsPerPage}&${colId}=${sortOrder}&searchText=${searchValue}`
          : profileType === PROFILE_TYPE.STAFF_USERS
          ? `/organization/staffUsers?orgId=${orgIdNum}&offset=${startFrom}&limit=${rowsPerPage}&${colId}=${sortOrder}&searchText=${searchValue}`
          : profileType === PROFILE_TYPE.MANAGE_JOBS
          ? `/jobs/get-jobs?orgId=${orgIdNum}&formBuilderId=6487ff25da54220c8bb98c76&offset=${startFrom}&limit=${rowsPerPage}&sortField=${
              colId === 'status' ? 'formData.basicInfo.jobExpiryDate' : colId
            }&sortOrder=${sortOrder}&searchText=${searchValue}&timeZoneValue=${timeZoneValue}&jobStatus=in-review,rejected`
          : profileType === PROFILE_TYPE.CASE_MANAGER
          ? tabIndex == 0
            ? `/casemanagement/get-cases?offset=${startFrom}&limit=${rowsPerPage}&caseType=1&${colId}=${sortOrder}&searchText=${searchValue}`
            : `/jobseeker/job-seeker/list?offset=${startFrom}&limit=${rowsPerPage}&caseType=2&${colId}=${sortOrder}&searchText=${searchValue}`
          : `/jobseeker/job-seeker/list?offset=${startFrom}&limit=${rowsPerPage}&${colId}=${sortOrder}&searchText=${searchValue}&${roleIds}`

      getMethod(url, {}, setRows, setIsLoading, setTotalRecords)

      const dataSorting =
        profileType !== PROFILE_TYPE.MANAGE_JOBS
          ? `&${colId}=${sortOrder}`
          : `&sortField=${
              colId === 'status' ? 'formData.basicInfo.jobExpiryDate' : colId
            }&sortOrder=${sortOrder}`
      setSorting(dataSorting)
    }

    return (
      <TableHead>
        <TableRow>
          {columns?.map((column: any) => (
            <TableCell
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: (theme: any) =>
                  theme.palette.mode == THEME.DARK ? 'transparent' : '#F0EADC',
              }}
              key={column.id}
              style={{
                minWidth: column.minWidth,
              }}
              sortDirection={orderBy === column.id ? order : false}
            >
              {column.disableSorting ? (
                column.label !== 'Action' && column.label
              ) : (
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={() => handleClick(column.id, !sortStatus)}
                >
                  {column.label !== 'Action' && column.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const pageFetchData = (newPage: number) => {
    const startFrom = Number(newPage * rowsPerPage)
    const url =
      profileType === PROFILE_TYPE.USERS
        ? `/user?offset=${startFrom}&limit=${rowsPerPage}&roleids=${roleIds}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.EMPLOYER
        ? `/employer/employer/list?offset=${startFrom}&limit=${rowsPerPage}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.STAFF_USERS
        ? `/organization/staffUsers?orgId=${orgIdNum}&offset=${startFrom}&limit=${rowsPerPage}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.MANAGE_JOBS
        ? `jobs/get-jobs?orgId=${orgIdNum}&formBuilderId=6487ff25da54220c8bb98c76&offset=${startFrom}&limit=${rowsPerPage}&searchText=${searchValue}&${roleIds}${sorting}&timeZoneValue=${timeZoneValue}&jobStatus=in-review,rejected`
        : profileType === PROFILE_TYPE.CASE_MANAGER
        ? tabIndex == 0
          ? `/casemanagement/get-cases?offset=${startFrom}&limit=${rowsPerPage}&caseType=1&&searchText=${searchValue}${sorting}`
          : `/jobseeker/job-seeker/list?offset=${startFrom}&limit=${rowsPerPage}&caseType=2&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.PDF_FORMS
        ? `casemanagement/program-form-list?offset=${startFrom}&limit=${rowsPerPage}&formTypeId=64c24d5b3108470ab32de21a&userId=${jobseeker_id}`
        : profileType === PROFILE_TYPE.DOCUMENTS
        ? `/forms/form-list?userId=${router?.query?.data_id}&offset=${startFrom}&limit=${rowsPerPage}`
        : `/jobseeker/job-seeker/list?offset=${startFrom}&limit=${rowsPerPage}&searchText=${searchValue}&${roleIds}${sorting}`
    getMethod(url, {}, setRows, setIsLoading, setTotalRecords)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    pageFetchData(newPage)
  }

  const rowsPerPageFetchData = (recordsPerPage: number) => {
    const url =
      profileType === PROFILE_TYPE.USERS
        ? `/user?offset=0&limit=${recordsPerPage}&roleids=${roleIds}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.EMPLOYER
        ? `/employer/employer/list?offset=0&limit=${recordsPerPage}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.STAFF_USERS
        ? `/organization/staffUsers?orgId=${orgIdNum}&offset=0&limit=${recordsPerPage}&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.MANAGE_JOBS
        ? `jobs/get-jobs?orgId=${orgIdNum}&formBuilderId=6487ff25da54220c8bb98c76&offset=0&limit=${recordsPerPage}&searchText=${searchValue}&${roleIds}${sorting}&timeZoneValue=${timeZoneValue}&jobStatus=in-review,rejected`
        : profileType === PROFILE_TYPE.CASE_MANAGER
        ? tabIndex == 0
          ? `/casemanagement/get-cases?offset=0&limit=${recordsPerPage}&caseType=1&&searchText=${searchValue}${sorting}`
          : `/jobseeker/job-seeker/list?offset=0&limit=${recordsPerPage}&caseType=2&searchText=${searchValue}${sorting}`
        : profileType === PROFILE_TYPE.PDF_FORMS
        ? `casemanagement/program-form-list?offset=0&limit=${recordsPerPage}&formTypeId=64c24d5b3108470ab32de21a&userId=${jobseeker_id}`
        : profileType === PROFILE_TYPE.DOCUMENTS
        ? `/forms/form-list?userId=${router?.query?.data_id}&offset=0&limit=${recordsPerPage}`
        : `/jobseeker/job-seeker/list?offset=0&limit=${recordsPerPage}&searchText=${searchValue}&${roleIds}${sorting}`
    getMethod(url, {}, setRows, setIsLoading, setTotalRecords)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    rowsPerPageFetchData(+event.target.value)
    setPage(0)
  }
  const TblPagination = (props: tableProps) => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={totalRecords ?? props.dataCount} // total records
      rowsPerPage={rowsPerPage} // rows per page
      page={page} // page
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{ opacity: 1 }}
    />
  )

  return {
    TblContainer,
    TblHead,
    TblPagination,
  }
}
