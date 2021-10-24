import { Grid } from "@mui/material"
import Candidato from './Candidato/Candidato'

const Candidatos = () => {
    const elecciones = [
        {
            key: "1A",
            nombre: "Luis Inchauste Rivera",
            img: "./",
            value: 1
        },
        {
            key: "1B",
            nombre: "Luis Tomás Inchauste Pórcel",
            img: "./",
            value: 2
        }
    ]
    return (
        <Grid justifyContent="center" alignItems="center" container spacing={2} gap="1rem" height="100vh">
            {
                elecciones.map(candi => (
                    <Candidato datos={candi} key={candi.key} />
                ))
            }       
        </Grid>
    );
}
 
export default Candidatos;