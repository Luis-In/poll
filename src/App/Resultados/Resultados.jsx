import { useEffect, useState } from "react";
import { Card, Typography, CardContent, Grid, Button } from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useHistory } from "react-router-dom";
//firebase
import {getFirestore, collection, onSnapshot, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseCon'
import useStyles from './ResultadosStyle'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Resultados = () => {
    const history = useHistory()
    let classes = useStyles()
    const [elecciones, setElecciones] = useState()
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState({id:0, txt:""})
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
    function handleClose(confirmar, query) {
        setOpen(false)
        if(confirmar) {
            if(query === 1) {
                handleReset()
            }
            if(query === 2) {
                handleDisable()
            }
        }
    }
    async function handleReset() {
        const q = query(collection(db, "Socios"), where("Voto", ">", 0))
        const qsnap = await getDocs(q);
        qsnap.forEach( async (socio) => {
            let docRef = doc(db, "Socios", socio.id)
            await updateDoc(docRef, {
                Voto: 0
            })
        })
        const q2 = query(collection(db, "Candidatos"), where("Votos", ">", 0))
        const qsnap2 = await getDocs(q2);
        qsnap2.forEach( async (candidato) => {
            let docRef = doc(db, "Candidatos", candidato.id)
            await updateDoc(docRef, {
                Votos: 0
            })
        })
    }
    async function handleDisable() {
        const q = query(collection(db, "Socios"), where("Habilitado", "==", true))
        const qsnap = await getDocs(q);
        qsnap.forEach( async (socio) => {
            let docRef = doc(db, "Socios", socio.id)
            await updateDoc(docRef, {
                Habilitado: false
            })
        })
    }
    return (
        <>
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
                            <Card key={candidato.Value} className={classes.card}>
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
            <div className={(localStorage.getItem('directiva') === "1716508") ? classes.botones : classes.dnode }>
                <Button 
                    variant="contained"
                    onClick={
                        () => {
                            setOpen(true)
                            setMsg({id: 1, txt: "¿Esta Seguro de reiniciar los datos de votación?"})
                        }
                    }
                >
                    Reiniciar Datos
                </Button>
                <Button 
                    variant="contained"
                    onClick={
                        () => {
                            setOpen(true)
                            setMsg({id: 2, txt: "¿Esta Seguro de Deshabilitar a todos los votantes?"})
                        }
                    }
                >
                    Deshabilitar Votantes
                </Button>
            </div>
        </section>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="Reiniciar Datos"
        >
            <DialogTitle>{msg.txt}</DialogTitle>
            <DialogActions className={``}>
                <Button
                    onClick={() => {handleClose(false, msg.id)}}>Cancelar</Button>
                <Button
                    onClick={() => {handleClose(true, msg.id)}}>Confirmar</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
 
export default Resultados;