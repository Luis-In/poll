import { useEffect, useState } from "react";
import { Card, Typography, CardContent } from "@mui/material";
//firebase
import {getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseCon'
import useStyles from './ResultadosStyle'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Resultados = () => {
    let classes = useStyles()
    const [elecciones, setElecciones] = useState()
    useEffect(() => {
        onSnapshot(collection(db, "CandidatoPresidente"), (snapshot) => {
            let candidatos = snapshot.docs.map(doc => {
                return doc.data()
            })
            setElecciones(candidatos)
        })
    }, [])

    return (
        <section className={classes.root}>
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
        </section>
    );
}
 
export default Resultados;