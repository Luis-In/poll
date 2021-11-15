import {makeStyles} from "@mui/styles"

export default makeStyles(() => ({
    root: {
        maxWidth: "100%"
    },
    media: {
        height: 0,
        paddingTop: "56.25%"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
    },
    actions: {
        display: "flex",
        justifyContent: "center"
    },
    dialogActions: {
        display: "flex",
        justifyContent: "center",
        margin: "auto"
    }
}))

