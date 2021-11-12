import { Card, Typography, Button, CardActions, CardContent, CardMedia } from "@mui/material"
import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import useStyles from "./CandidatoStyle"
import { useState, useEffect } from "react";
//firebase
import { initializeApp } from "firebase/app";
import {getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import firebaseConfig from '../../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Candidato = ({datos}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [votoSocio, setVotoSocio] = useState()
    useEffect(() => {
        async function haVotado() {
            const votoRef = doc(db, "Votantes", localStorage.getItem('votante'));
            const votoSnap = await getDoc(votoRef);
            let datos = votoSnap.data()
            setVotoSocio(datos.voto)
        }
        haVotado()
    }, [])
    async function handleVote () {
        setOpen(true)
        if(handleClose) {
            const VoteRef = doc(db, "Votantes", localStorage.getItem('votante'));
            await updateDoc(VoteRef, {
                voto: datos.value
            })
        }
    }
    function handleClose(confirmar) {
        setOpen(false)
        return confirmar
    }

    return (
        <>
        <Card className={classes.root}>
            <CardMedia title="Escudo Club" image={datos.img} />
            <CardContent>
                <div className={classes.content}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        {datos.Nombre}
                    </Typography>
                    <Typography variant="h6">
                        Presidente Club Social Progreso 2022-2024
                    </Typography>
                </div>
                <CardActions className={classes.actions}>
                    <Button
                        disabled={votoSocio>0 ? true : false} 
                        variant="contained" 
                        onClick={handleVote}>Votar</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="Confirmar Voto"
        >
            <DialogTitle>Esta Seguro votar por {datos.nombre}</DialogTitle>
            <DialogActions className={classes.dialogActions}>
                <Button
                    onClick={() => {handleClose(false)}}>Cancelar</Button>
                <Button
                    onClick={() => {handleClose(true)}}>Confirmar</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
 
export default Candidato;