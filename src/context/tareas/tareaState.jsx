import { useReducer } from "react"
import tareaContext from "./tareaContetx"
import TareaReducer from "./tareaReducer"
import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA, 
    ELIMINAR_TAREA, 
    TAREAS_PROYECTO, 
    TAREA_ACTUAL, 
    VALIDAR_TAREA 
} from "../../types"
import clienteAxios from "../../config/axios"

const TareaState = (props) => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState)

    const obtenerTareas = async (proyectoId) => {
        try {
            const resultado = await clienteAxios.get(`/api/tareas/${proyectoId}` )
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarTarea = async (tarea) => {

        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
            
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyectoId) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto: proyectoId } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState