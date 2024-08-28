import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notifier = ({ open, onClose, severity, message }) => {

    return (
        <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notifier;