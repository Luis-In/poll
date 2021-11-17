import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Button} from "@mui/material";
import { useHistory } from "react-router-dom";
//firebase
import {getFirestore, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseCon'
import useStyles from './ResultadosStyle'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Resultados = () => {
    const history = useHistory()
    let classes = useStyles()
    const [elecciones, setElecciones] = useState()
    const [socio, setSocio] = useState()
    useEffect(() => {
        if(!localStorage.getItem('directiva')) {
            return history.push("/login")
        }
    }, [])
    useEffect(() => {
        onSnapshot(collection(db, "CandidatoPresidente"), (snapshot) => {
            let candidatos = snapshot.docs.map(doc => {
                return doc.data()
            })
            setElecciones(candidatos)
        })
    }, [])
    function returnHome() {
        localStorage.removeItem('directiva')
        history.push("/")
    }
    return (
        <section className={classes.root}>
            <Typography variant="h2">
                Resultados
            </Typography>
            <div className={classes.cards}>
                {
                elecciones?.map(candidato => {
                    return(
                            <Card key={candidato.value} className={classes.card}>
                                <Typography variant="h4">
                                    {candidato.Nombre}
                                </Typography>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        Votos
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {candidato.Votos}
                                    </Typography>
                                </CardContent>
                            </Card>
                    )
                })
                }
            </div>
            <div className="">
                <Button variant="contained" onClick={returnHome}>
                    Regresar al inicio
                </Button>
            </div>
        </section>
    );
}
 
export default Resultados;