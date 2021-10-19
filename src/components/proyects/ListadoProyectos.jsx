import { useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext)
    const { proyectos, obtenerProyectos } = proyectosContext
    
    useEffect(() => {
        obtenerProyectos()
    }, [])

    if (proyectos.length === 0) {
        return (
            <p>No hay proyectos, comienza creando uno</p>
        )
    }

    return ( 

        <ul className='listado-proyectos'>
            {proyectos.map((proyecto) => {
                return(
                    <Proyecto
                        key={proyecto.id}
                        proyecto={proyecto}
                    />
                )
            })}

        </ul>

     );
}
 
export default ListadoProyectos;