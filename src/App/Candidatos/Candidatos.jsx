import { useEffect, useState } from "react"
import { Grid } from "@mui/material"
import { useHistory } from "react-router-dom"
import Candidato from './Candidato/Candidato'
//firebase
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from '../firebaseCon'

const app = initializeApp(firebaseConfig);
const db = getFirestore() 

const Candidatos = () => {
    useEffect(() => {
        if(!localStorage.getItem('votante')) {
            return history.push("/login")
        }
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
    const [elecciones, setElecciones] = useState()
    const history = useHistory()

    return (
        <Grid justifyContent="center" alignItems="center" container spacing={2} gap="1rem" height="100vh">
            {
                elecciones.candidatosPresidente.map(candidato => {
                    let i = 0
                    i++
                    return(
                        <Candidato datos={candidato} key={i} />
                    )
                })
            }       
        </Grid>
    );
}
 
export default Candidatos;