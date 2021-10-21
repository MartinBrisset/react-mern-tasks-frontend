import { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContetx";



const ListadoTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext

    const tareasContext = useContext(tareaContext)
    const {tareasproyecto} = tareasContext

    if (!proyecto) {
        return (
            <h2>Selecciona un proyecto de la lista</h2>
        )
    }

    const [proyectoActual] = proyecto

    return ( 
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : tareasproyecto.map((tarea) => {
                        return (
                            <Tarea
                                key={tarea.id}
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