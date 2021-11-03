import { useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext
    
    useEffect(() => {

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
    }, [mensaje])

    if (proyectos.length === 0) {
        return (
            <p>No hay proyectos, comienza creando uno</p>
        )
    } 

    return ( 

        <ul className='listado-proyectos'>

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            {proyectos.map((proyecto) => {
                return(
                    <Proyecto
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                )
            })}

        </ul>

     );
}
 
export default ListadoProyectos;