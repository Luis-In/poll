import { Card, Button, CardMedia, TextField } from '@mui/material';
import useStyles from "./LoginStyle"
import escudo from './club_social_progreso.png'
import { useState } from 'react';
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAO0JE7KwGEAtvJsiB603Lcd9kPVuq95g",
  authDomain: "web-hosting-chimi.firebaseapp.com",
  databaseURL: "https://web-hosting-chimi-default-rtdb.firebaseio.com",
  projectId: "web-hosting-chimi",
  storageBucket: "web-hosting-chimi.appspot.com",
  messagingSenderId: "40648514015",
  appId: "1:40648514015:web:b75949cb87475fe3d78c6a",
  measurementId: "G-RMPX1GXCYW"
}
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Login = ({history}) => {
    const classes = useStyles()
    const [datos, setDatos] = useState({carnet:Number,fechaNacimiento:""})
    const [error, setError] = useState("")

     function handleSubmit(e) {
        e.preventDefault()
        loginVotantes(datos)
    }
    async function loginVotantes(datosLogin) {
        const datosVotantes = await getDocs(collection(db, "Votantes"));
        let votantes = []
        datosVotantes.forEach((votante) => {
            votantes.push(votante.data())
        })
        const socio = votantes.find((votante) => {
            return votante.CarnetIdentidad === datosLogin.carnet 
        })
        if(socio === undefined) {                                       
            return setError("Revise los datos introducidos")
        }
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <form onSubmit={handleSubmit} className={classes.root}>
                <CardMedia 
                    component="img"
                    title="Club Social Progreso" 
                    image={escudo} 
                    height="300"
                    alt="Escudo Club Social Progreso"
                />
                <TextField 
                    required 
                    label="Carnet de Identidad" 
                    autoFocus
                    type="number"
                    onInput={(e)=> {
                        let carnet = parseInt(e.target.value)
                        setDatos({...datos, carnet})
                    }}
                />
                <TextField
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
    );
}
 
export default Login;