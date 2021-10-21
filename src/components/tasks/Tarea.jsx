import { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContetx";

const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext

    const tareasContext = useContext(tareaContext)
    const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual} = tareasContext

    const [proyectoActual] = proyecto

    const tareaElminar = (id) => {
        eliminarTarea(id)
        obtenerTareas(proyectoActual.id)
    }

    const cambiarEstado = (tarea) => {
        if (tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }

        cambiarEstadoTarea(tarea)
    }

    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea)
    }

    return ( 

        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>
            <div className='estado'>
                {tarea.estado
                ?
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                    >
                    Editar
                </button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => tareaElminar(tarea.id)}
                >
                    Eliminar
                </button>
            </div>
        </li>

     );
}
 
export default Tarea;