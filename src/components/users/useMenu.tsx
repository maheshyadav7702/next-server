import { ACTION_TYPE } from '@/components/enums/actionType.enum'
import { PROFILE_TYPE } from '@/components/enums/profileType.enum'
import { MoreOptions } from '@/styles'
import { useLoader } from '@CareerEdgeDevOps/ui-component-library'
import { Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const UseMenu = (props: any) => {
  const {
    menus,
    open,
    anchorEl,
    setAnchorEl,
    setActionType,
    setOpen,
    singleRow,
    handleActions,
    profileType,
    setPageLoading,
    setModalOpen,
    setPasswordModalOpen,
    setEmailModalOpen,
    statusHandlerClick,
    EmpId,
    mangeJobsIndex,
    isStaff = false,
    drawerHandler,
  } = props

  const router = useRouter()
  const { jobseeker_id } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const { showLoader } = useLoader()

  if (!Array.isArray(menus) || !menus.length) {
    return null
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const moreHandleClick = async (menu: any) => {
    handleClose()
    if (menu.name === ACTION_TYPE.VIEW) {
      setIsLoading(true)
      handleClose()
      router.push(`/job-seeker/new-profile/${singleRow?._id}`)
    } else if (menu.name === ACTION_TYPE.VIEW_INDIVIDUAL) {
      setIsLoading(true)
      handleClose()
      setPageLoading(true)
      if (Object.keys(singleRow).includes('caseManager')) {
        router.push(`/job-seeker/new-profile/${singleRow?._id}`)
      } else {
        router.push(`/job-seeker/new-profile/${singleRow?.userId}`)
      }
    } else if (menu.name === ACTION_TYPE.VIEW_EMPLOYER) {
      setIsLoading(true)
      handleClose()
      router.push(`/employers/view-profile/${singleRow?._id}`)
    } else if (menu.name === ACTION_TYPE.EDIT_EMPLOYER) {
      setIsLoading(true)
      router.push(`/employers/edit-profile/${singleRow?._id}`)
    } else if (menu.name === ACTION_TYPE.EDIT_ACCOUNT && !isStaff) {
      setPageLoading(true)
      if (Object.keys(singleRow).includes('caseManager')) {
        router.push(`/job-seeker/edit-profile/${singleRow._id}`)
      } else {
        router.push(`/job-seeker/edit-profile/${singleRow?.userId}`)
      }
    } else if (menu.name === 'View') {
      setIsLoading(true)
      if (profileType === PROFILE_TYPE.DOCUMENTS) {
        if (singleRow?.formSubmitted === ACTION_TYPE.NO) {
          router.push({
            pathname: `/pdf-form/preview/${router?.query?.data_id}/${singleRow?._id}`,
            query: { profileType: PROFILE_TYPE.DOCUMENTS, preview: true },
          })
        } else if (singleRow?.formSubmitted === ACTION_TYPE.YES) {
          router.push({
            pathname: `/pdf-form/edit/${router?.query?.data_id}/${singleRow?._id}`,
            query: { profileType: 'documents', preview: true },
          })
        }
      } else if (profileType === PROFILE_TYPE.PDF_FORMS) {
        if (singleRow.submitted === ACTION_TYPE.NO) {
          router.push({
            pathname: `/pdf-form/preview/${jobseeker_id}/${singleRow?._id}`,
            query: { profileType: 'forms', preview: true },
          })
        } else if (singleRow.submitted === ACTION_TYPE.YES) {
          router.push({
            pathname: `/pdf-form/edit/${jobseeker_id}/${singleRow?._id}`,
            query: { profileType: 'forms', preview: true },
          })
        }
      } else {
        router.push({
          pathname: `/manage-jobs/job-details/${singleRow._id}`,
          query: { activeTab: mangeJobsIndex },
        })
      }
    } else if (menu.name === ACTION_TYPE.EDIT) {
      if (profileType === PROFILE_TYPE.PDF_FORMS) {
        setIsLoading(true)
        if (singleRow.submitted === ACTION_TYPE.NO) {
          router.push({
            pathname: `/pdf-form/preview/${jobseeker_id}/${singleRow?._id}`,
            query: { profileType: 'forms' },
          })
        } else if (singleRow.submitted === ACTION_TYPE.YES) {
          router.push({
            pathname: `/pdf-form/edit/${jobseeker_id}/${singleRow?._id}`,
            query: { profileType: 'forms' },
          })
        }
      } else if (profileType === PROFILE_TYPE.DOCUMENTS) {
        setPageLoading(true)
        if (singleRow?.formSubmitted === ACTION_TYPE.NO) {
          router.push({
            pathname: `/pdf-form/preview/${router?.query?.data_id}/${singleRow?._id}`,
            query: { profileType: PROFILE_TYPE.DOCUMENTS },
          })
        } else if (singleRow?.formSubmitted === ACTION_TYPE.YES) {
          router.push({
            pathname: `/pdf-form/edit/${router?.query?.data_id}/${singleRow?._id}`,
            query: { profileType: 'documents' },
          })
        }
      } else {
        // profileType !== 'pdfForms'
        setIsLoading(true)
        router.push({
          pathname: `/manage-jobs/edit-profile`,
          query: {
            job_id: singleRow._id,
            empId: EmpId,
            activeTab: mangeJobsIndex,
          },
        })
      }
    } else if (menu.name === ACTION_TYPE.APPROVE) {
      if (profileType === PROFILE_TYPE.DOCUMENTS) {
        setOpen(true)
        setActionType(menu.name)
      } else {
        handleActions(menu.name)
        setActionType(menu.name)
      }
    } else if (
      menu.name === ACTION_TYPE.ASSIGN_CASEMANAGER ||
      menu.name === ACTION_TYPE.MANAGE_CASE_MANAGER
    ) {
      setModalOpen(true)
      setActionType(menu.name)
    } else if (menu.name === ACTION_TYPE.VERIFY) {
      //statusHandlerClick(true)
      statusHandlerClick(true)
    } else if (menu.name === ACTION_TYPE.REGENERATE_PASSWORD) {
      setPasswordModalOpen(true)
    } else if (menu.name === ACTION_TYPE.UPDATE_EMAIL) {
      setEmailModalOpen(true)
    } else if (menu.name == 'Download') {
      window.open(
        'https://career-edge-state-system-qa.s3.amazonaws.com/w-9/w9.pdf',
        '_blank',
      )
    } else if (menu.name.toLowerCase() === ACTION_TYPE.UPLOAD) {
      drawerHandler(true, singleRow)
    } else {
      setOpen(true)
      setActionType(menu.name)
    }
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          horizontal: 22,
          vertical: 'bottom',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            border: '1px solid lightgrey',
            boxShadow: '1px 2px lightgrey',
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
        sx={{
          '& .MuiList-padding': {
            padding: '0px',
          },
        }}
      >
        {menus.map((menu: any, index: number) => (
          <MenuItem
            key={`menu-${index}`}
            sx={{
              borderBottom: '1px solid lightgrey',
            }}
            onClick={() => moreHandleClick(menu)}
          >
            <MoreOptions>
              <span style={{ paddingRight: '14px' }}>{menu.icon}</span>
              <span>{menu.name}</span>
            </MoreOptions>
          </MenuItem>
        ))}
      </Menu>
      <>{isLoading && showLoader(isLoading)}</>
    </>
  )
}
export default UseMenu
