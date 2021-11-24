import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Grid } from "@mui/material";
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
    useEffect(() => {
        if(!localStorage.getItem('directiva')) {
            return history.push("/login")
        }
    })
    useEffect(() => {
        onSnapshot(collection(db, "Candidatos"), (snapshot) => {
            let candidatos = snapshot.docs.map(doc => {
                return doc.data()
            })
            setElecciones(candidatos)
        })
    }, [])
    return (
        <section className={classes.root}>
            <Typography variant="h2">
                Resultados
            </Typography>
            <Grid 
                justifyContent="center"
                alignItems="center"
                container
                spacing={2}
                gap="1rem"
            >
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
            </Grid>
        </section>
    );
}
 
export default Resultados;