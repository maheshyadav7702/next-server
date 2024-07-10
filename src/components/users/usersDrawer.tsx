import JobSeekerFilter from '@/components/job-seeker/jobSeekerFilter'
import { UserDrawerProps } from '@/types'
import { Drawer } from '@mui/material'
import InviteStaffUser from './staff-user/inviteStaffUser'

const UsersDrawer = (props: UserDrawerProps) => {
  const {
    drawerOpen,
    drawerCloseHandle,
    name,
    rolesList,
    setRoles,
    orgId,
    source,
    editState,
    setEditState,
    editDrawerOpen,
    editDrawerCloseHandle,
    singleRow,
  } = props
  return (
    <Drawer anchor="right" open={drawerOpen || editDrawerOpen}>
      {name === 'staffUser' ? (
        <InviteStaffUser
          drawerCloseHandle={drawerCloseHandle}
          setRoleIds={props.setRoleIds}
          setPage={props.setPage}
          searchValue={props.searchValue}
          setRows={props.setRows}
          setIsLoading={props.setIsLoading}
          setTotalRecords={props.setTotalRecords}
          setRoles={setRoles}
          setUserObject={props.setUserObject}
          alertOpenHandle={props.alertOpenHandle}
          setActionType={props.setActionType}
          setSearchValue={props.setSearchValue}
          clearFilter={props.clearFilter}
          orgId={orgId}
          source={source}
          editState={editState}
          setEditState={setEditState}
          editDrawerCloseHandle={editDrawerCloseHandle}
          singleRow={singleRow}
        />
      ) : (
        <JobSeekerFilter
          drawerCloseHandle={drawerCloseHandle}
          rolesList={rolesList}
          setRoleIds={props.setRoleIds}
          setPage={props.setPage}
          rowsPerPage={props.rowsPerPage}
          searchValue={props.searchValue}
          setRows={props.setRows}
          setIsLoading={props.setIsLoading}
          setTotalRecords={props.setTotalRecords}
          roles={props.roles}
          setRoles={setRoles}
        />
      )}
    </Drawer>
  )
}

export default UsersDrawer
