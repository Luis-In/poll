import { Card, Button, CardMedia, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import useStyles from "./LoginStyle"
import escudo from './club_social_progreso.png'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from '../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Login = () => {
    const classes = useStyles()
    const [datos, setDatos] = useState({carnet:"",fechaNacimiento: new Date() })
    const [error, setError] = useState("")
    let history = useHistory()

    async function loginVotantes(e) {
        e.preventDefault()
        let votantes = []
        const querySnap = await getDocs(collection(db, "Socios"));
        querySnap.forEach((socio) => {
            votantes.push(socio.data())
        })
        let socio = votantes.find((votante) => {
            return votante.CarnetIdentidad === datos.carnet 
                && votante.FechaNacimiento === format(datos.fechaNacimiento, 'yyyy-MM-dd')        
        })
        if(socio === undefined) {
            return setError("Revise los datos introducidos")
        }
        if(socio?.Directiva === true) {
            localStorage.setItem('directiva', socio.CarnetIdentidad)
            history.push("/resultados")
            return
        }
        if(socio?.Habilitado === true) {
            localStorage.setItem('votante', socio.CarnetIdentidad)
            history.push("/votar")
        } else {
            return setError("No esta Habilitado para votar")
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
                            let carnet = e.target.value.toString()
                            setDatos({...datos, carnet})
                        }}
                    />
                    <LocalizationProvider 
                        dateAdapter={AdapterDateFns}
                        locale={esLocale}
                    >
                        <DatePicker
                            required
                            disableFuture
                            label="Fecha de Nacimiento"
                            openTo="day"
                            value={datos.fechaNacimiento}
                            views={['day', 'month', 'year']}
                            onChange={(newVal) => {
                                setDatos({...datos, fechaNacimiento: newVal})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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