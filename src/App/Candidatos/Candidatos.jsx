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
            const datosCandidatos = await getDocs(collection(db, "CandidatoPresidente"));
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
            const socioRef = doc(db, "Votantes", localStorage.getItem('votante'))
            const socioSnap = await getDoc(socioRef)
            let datos = socioSnap.data()
            setSocio({nombre: datos.Nombre, voto: datos.voto })
        }
        socioVotante()
    }, [])
    
    return (
        <section className={classes.root}>
            <div  style={{textAlign:"center", marginTop: "1rem"}}>
                <Typography variant="h3">
                    {`Bienvenido ${socio?.nombre}`}
                </Typography>
                <Typography variant="h4">
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
        </section>
    );
}
 
export default Candidatos;