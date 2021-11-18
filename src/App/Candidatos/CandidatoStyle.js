import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "start",
        alignItems: "center",
        gap: "4rem",
        textAlign:"center"
    },
    voto: {
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: ".5rem"
    },
    hide: {
        display: "none"
    }
}))