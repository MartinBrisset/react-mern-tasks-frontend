import { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";


const ListadoTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext

    if (!proyecto) {
        return (
            <h2>Selecciona un proyecto de la lista</h2>
        )
    }

    const [proyectoActual] = proyecto

    const tareas = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir Plataforma de pago', estado: false},
        {nombre: 'Elegir Hosting', estado: true},
    ]

    return ( 
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareas.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : tareas.map((tarea) => {
                        return (
                            <Tarea
                                tarea={tarea}
                            />
                        )
                    })
                }
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => eliminarProyecto(proyectoActual.id)}
            >
                Eliminar Proyecto &times;
            </button>
        </>

     );
}
 
export default ListadoTarea;