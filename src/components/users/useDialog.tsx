import { ACTION_TYPE } from '@/components/enums/actionType.enum'
import { PROFILE_TYPE } from '@/components/enums/profileType.enum'
import DocumentReasonRejectDialog from '@/components/job-seeker/documents/documentReasonRejectDialog'
import { SubmitButton } from '@/styles'
import DoneIcon from '@mui/icons-material/Done'
import { Dialog, Divider, Grid, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const UseDialog = (props: any) => {
  const {
    open,
    setOpen,
    actionType,
    singleRow,
    actionsHandleCall,
    setAnchorEl,
    profileType,
    setUserObject,
  } = props

  const router = useRouter()

  const handleClick = () => {
    signOut({ callbackUrl: '/user/login' })
  }

  const handleClickNo = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const handleClickYes = () => {
    setAnchorEl(null)
    setOpen(false)
    if (actionType === ACTION_TYPE.RESET_PASSWORD) {
      router.push('/user/set-password')
    } else {
      actionsHandleCall()
    }
  }

  const handleProfileType = () => {
    switch (profileType) {
      case PROFILE_TYPE.MANAGE_JOBS:
        return `Are you sure you want to ${actionType?.toLowerCase()}`
      case PROFILE_TYPE.CASE_MANAGER:
        return `Are you sure you want to ${
          actionType === ACTION_TYPE.DELETE
            ? 'delete this account'
            : `assign ${singleRow?.firstName} ${singleRow?.lastName} to you`
        } `
      case PROFILE_TYPE.DOCUMENTS:
        return `Are you sure you want to ${actionType?.toLowerCase()} this ${
          singleRow?.name
        }`
      default:
        return `Are you sure you want to ${actionType?.toLowerCase()} for ${
          singleRow?.firstName
        } ${singleRow?.lastName} ?`
    }
  }

  const handleAction = () => {
    switch (actionType) {
      case ACTION_TYPE.REGISTRATION:
        return (
          <Grid
            direction="column"
            display="flex"
            justifyContent="center"
            textAlign="center"
          >
            <Grid padding=" 24px 28px 12px">
              <DoneIcon
                sx={{
                  backgroundColor: '#76B900',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  fontWeight: 'bold',
                  padding: '5px',
                  fontSize: '32px',
                }}
              />
              <Typography mt={3} component="div">
                Your registration is completed successfully!
              </Typography>
            </Grid>
            <Divider sx={{ margin: '12px 0', boder: '1px solid #D4C4BE' }} />
            <Grid padding="12px 28px 42px">
              <Typography mb={3} component="div" fontSize="14px">
                You can sign in with your account
              </Typography>
              <SubmitButton
                type="submit"
                variant="contained"
                data-testid="completeUserFlow"
                onClick={handleClick}
              >
                Go to your account
              </SubmitButton>
            </Grid>
          </Grid>
        )
      case ACTION_TYPE.VIEW_REASON:
      case ACTION_TYPE.REJECT:
        return (
          <DocumentReasonRejectDialog
            handleClickNo={handleClickNo}
            singleRow={singleRow}
            actionsHandleCall={actionsHandleCall}
            setUserObject={setUserObject}
            actionType={actionType}
          />
        )
      default:
        return (
          <Grid
            direction="column"
            display="flex"
            justifyContent="center"
            textAlign="center"
            padding="34px 41px"
          >
            <Typography
              component="div"
              fontWeight="bold"
              fontSize="16px"
              mb={2}
            >
              {actionType}
            </Typography>
            <Grid mb={3}>
              <Typography fontSize="14px">{handleProfileType()}</Typography>
            </Grid>
            <Grid>
              <SubmitButton
                type="submit"
                variant="outlined"
                data-testid="completeUserFlow"
                onClick={handleClickNo}
                style={{ marginRight: '8px' }}
              >
                No
              </SubmitButton>
              <SubmitButton
                type="submit"
                variant="contained"
                data-testid="completeUserFlow"
                onClick={handleClickYes}
              >
                Yes
              </SubmitButton>
            </Grid>
          </Grid>
        )
    }
  }

  return <Dialog open={open}>{handleAction()}</Dialog>
}

export default UseDialog
