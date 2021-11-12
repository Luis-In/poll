import { ClassNames } from '@emotion/react';
import { Typography, Button, Card, CardActions, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import useStyles from './TituloStyle'
import EscudoClub from "../Login/club_social_progreso.png"

const Titulo = () => {
    const classes = useStyles()
    return (
        <section className={classes.root}>
            <Card className={classes.card}>
                <CardMedia 
                    title="Escudo Club" 
                    image={EscudoClub}
                    component="img"
                    alt="Escudo Club Social Progreso"
                    className={classes.img}
                />
                <Typography
                    variant="h4">
                    Elecciones 2021-2023
                </Typography>
                <CardActions>
                    <Button variant="contained">
                        <Link className={classes.link} to="/login">Iniciar Sesión</Link>
                    </Button>
                </CardActions>
            </Card>
        </section>
    );
}
 
export default Titulo;