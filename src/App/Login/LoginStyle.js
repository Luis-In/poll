import { makeStyles } from "@mui/styles"

export default makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "90%",
        margin: "auto",
        padding: "1.5rem",
        textAlign: "center"
    },
    root: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))