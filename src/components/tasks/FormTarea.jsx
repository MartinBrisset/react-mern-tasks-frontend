import { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContetx";


const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext

    useEffect(() => {
        if (tareaseleccionada !== null) {
            setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    const [tarea, setTarea] = useState({
        nombre: ''
    })

    const {nombre} = tarea

    if (!proyecto) {
        return (
            null
        )
    }

    const [proyectoActual] = proyecto

    const HandleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (nombre.trim() === '') {
            validarTarea() 
            return
        }

        if (tareaseleccionada === null) {
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            agregarTarea(tarea)
        } else {
            actualizarTarea(tarea)
        }   

        obtenerTareas(proyectoActual.id)

        setTarea({
            nombre: ''
        })

    }

    return ( 

        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea'
                        name='nombre'
                        value={nombre}
                        onChange={HandleChange}
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type="submit"
                        className='btn btn-primario btn-block'
                        value={ tareaseleccionada ? 'Editar Tarea' : 'Agregar Tareas'}
                    />
                </div>
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea es requerido</p> : null}
        </div>

     );
}
 
export default FormTarea;