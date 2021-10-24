import { Card, Typography, Button, CardActions, CardContent, CardMedia } from "@mui/material"
import useStyles from "./CandidatoStyle"

const Candidato = ({datos}) => {
    const classes = useStyles()
    const votar = (e) => {
        console.log(datos.value)
    }
    return (
        <Card className={classes.root}>
            <CardMedia title="" image={datos.img} />
            <CardContent>
                <div className={classes.content}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        {datos.nombre}
                    </Typography>
                    <Typography variant="h6">
                        Presidente Club Social Progreso 2022-2024
                    </Typography>
                </div>
                <CardActions className={classes.actions}>
                    <Button variant="contained" onClick={votar}>Votar</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
 
export default Candidato;