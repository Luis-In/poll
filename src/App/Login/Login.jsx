import { Card, Button, CardMedia, TextField } from '@mui/material';
import useStyles from "./LoginStyle"
import escudo from './club_social_progreso.png'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from '../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Login = () => {
    const classes = useStyles()
    const [datos, setDatos] = useState({carnet:Number,fechaNacimiento:""})
    const [error, setError] = useState("")
    let history = useHistory()

    async function loginVotantes(e) {
        e.preventDefault()
        let votantes = []
        const querySnap = await getDocs(collection(db, "Votantes"));
        querySnap.forEach((socio) => {
            votantes.push(socio.data())
        })
        let socio = votantes.find((votante) => {
            return votante.CarnetIdentidad === datos.carnet 
                && votante.FechaNacimiento === datos.fechaNacimiento        
        })
        if(socio == undefined) {
            return setError("Revise los datos introducidos")
        }
        if(socio?.Directiva === true) {
            localStorage.setItem('directiva', socio.CarnetIdentidad)
            history.push("/resultados")
        } else {
            localStorage.setItem('votante', socio.CarnetIdentidad)
            history.push("/votar")
        }
    }
    return (
        <section className={classes.root}>
            <Card sx={{ maxWidth: 345 }}>
                <form onSubmit={loginVotantes} className={classes.form}>
                    <CardMedia 
                        component="img"
                        title="Club Social Progreso" 
                        image={escudo} 
                        height="300"
                        alt="Escudo Club Social Progreso"
                    />
                    <span>{error}</span>
                    <TextField 
                        required 
                        label="Carnet de Identidad" 
                        type="number"
                        onInput={(e)=> {
                            let carnet = parseInt(e.target.value)
                            setDatos({...datos, carnet})
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        label="Fecha de Nacimiento"
                        type="date"
                        onInput={(e)=> {
                            let fecha = e.target.value
                            setDatos({...datos, fechaNacimiento: fecha})
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained">
                        Verificar
                    </Button>
                </form>
            </Card>
        </section>
    );
}
 
export default Login;