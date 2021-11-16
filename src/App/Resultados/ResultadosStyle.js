import { makeStyles } from "@mui/styles"

export default makeStyles(() => ({
    root: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        textAlign: "center",
        flexDirection: "column"
    },
    card: {
        padding: "1rem"
    },
    cards: {
        display: "flex",
        gap: "2rem"
    }
}))