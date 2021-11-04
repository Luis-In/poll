import { Card, Button, CardMedia, TextField } from '@mui/material';
import useStyles from "./LoginStyle"

const Login = () => {
    const classes = useStyles()
    function handleSubmit() {
        console.log("hola")
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className={classes.root}>
                <CardMedia title="" image="" />
                <TextField 
                    required 
                    label="Carnet de Identidad" 
                    autoFocus
                    type="number"
                />
                <TextField
                    required 
                    label="Fecha de Nacimiento"
                    type="date"
                />
                <Button 
                    type="submit" variant="contained">Verificar</Button>
            </form>
        </Card>
    );
}
 
export default Login;