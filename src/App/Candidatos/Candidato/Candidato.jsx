import { Card, Typography, Button, CardActions, CardContent, CardMedia } from "@mui/material"
import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import useStyles from "./CandidatoStyle"
import { useState } from "react";
import { useHistory } from "react-router-dom"
//firebase
import { initializeApp } from "firebase/app";
import {getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import firebaseConfig from '../../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Candidato = ({datos, voto}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const history = useHistory()
    function handleClose(confirmar) {
        setOpen(false)
        if(confirmar) {
            handleVote()
        }
    }
    async function handleVote () {
        const votoRef = doc(db, "Socios", localStorage.getItem('votante'))
        await updateDoc(votoRef, {
            Voto: datos.Value
        })
        const candiRef = doc(db, "Candidatos", datos.Value)
        await updateDoc(candiRef, {
            Votos: increment(1)
        })
        localStorage.removeItem('votante')
        history.push("/")
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
                    <Typography variant="h5">
                        {`${datos.Puesto} 2021-2023`}
                    </Typography>
                </div>
                <CardActions className={classes.actions}>
                    <Button
                        disabled={(voto>0) ? true : false} 
                        variant="contained" 
                        onClick={()=>{setOpen(true)}}>Votar</Button>
                </CardActions>
            </CardContent>
        </Card>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="Confirmar Voto"
        >
            <DialogTitle>Esta Seguro votar por {datos.Nombre}</DialogTitle>
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