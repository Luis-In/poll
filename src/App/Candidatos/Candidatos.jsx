import { useEffect, useState } from "react"
import { Grid, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"
import Candidato from './Candidato/Candidato'
import useStyles from "./CandidatoStyle"
//firebase
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import firebaseConfig from '../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Candidatos = ({}) => {
    const classes = useStyles()
    const [elecciones, setElecciones] = useState()
    const history = useHistory()
    const [socio, setSocio] = useState({})

    useEffect(() => {
        if(!localStorage.getItem('votante')) {
            return history.push("/login")
        }
    }, [])
    useEffect(() => {
        async function candidatos() {
            const datosCandidatos = await getDocs(collection(db, "Candidatos"));
            let candidatosPresidente = []
            datosCandidatos.forEach((candidato) => {
                candidatosPresidente.push(candidato.data())
            })
            setElecciones({candidatosPresidente})
        }
        candidatos()
    }, [])
    useEffect(() => {
        async function socioVotante() {
            const socioRef = doc(db, "Socios", localStorage.getItem('votante'))
            const socioSnap = await getDoc(socioRef)
            let datos = socioSnap.data()
            setSocio({nombre: datos.Nombre, voto: datos.Voto, apellido: datos.Apellido })
        }
        socioVotante()
    }, [])
    return (
        <section className={classes.root}>
            <div  style={{textAlign:"center", marginTop: "1rem"}}>
                <Typography variant="h4">
                    {`Bienvenido`}
                </Typography>
                <Typography variant="h6">
                    {`${socio?.nombre} ${socio.apellido}`}
                </Typography>
                <Typography variant="subtitle1">
                    Elecciones Club Social Progreso
                </Typography>
            </div>
            <Grid justifyContent="center" alignItems="center" container spacing={2} gap="1rem">
                {
                    elecciones?.candidatosPresidente.map(candidato => {
                        return(
                            <Candidato 
                                datos={candidato} 
                                voto={socio.voto} key={candidato.value}
                            />
                        )
                    })
                }       
            </Grid>
            <div className={(socio.voto>0) ? classes.voto : classes.hide}>
                <Typography variant="h6">
                    Gracias por haber emitido su voto
                </Typography>
            </div>
        </section>
    );
}
 
export default Candidatos;