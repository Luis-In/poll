import { makeStyles } from '@mui/styles'
import { height } from '@mui/system'

export default makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%"
    },
    link: {
        color: "white",
        textDecoration: "none"
    },
    card: {
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
       gap: "1rem",
       padding: "1rem"
    },
    img: {
        width: "25% !important"
    }
}))