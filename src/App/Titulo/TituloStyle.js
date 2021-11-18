import { makeStyles } from '@mui/styles'
import { height } from '@mui/system'

export default makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        height: "100%",
        textAlign: "center"
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
       padding: "2rem",
    },
    img: {
        width: "300px !important"
    }
}))