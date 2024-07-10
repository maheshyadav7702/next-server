import { Alert, AlertTitle, Box, Fade } from "@mui/material";

const SuccessAlertMessage = (props: any) => {
  const { isAlert, alertCloseHandle } = props;
  return (
    <Box borderLeft="6px solid #76B900" borderRadius="6px">
      <Fade
        in={isAlert}
        timeout={{ enter: 1000, exit: 1000 }}
        addEndListener={() => {
          setTimeout(() => {
            alertCloseHandle(false);
          }, 3500);
        }}
      >
        <Alert
          severity="success"
          variant="standard"
          className="alert"
          onClose={() => alertCloseHandle(false)}
        >
          <AlertTitle>
            <strong>Success</strong>
          </AlertTitle>
          Successfully done
        </Alert>
      </Fade>
    </Box>
  );
};

export default SuccessAlertMessage;
