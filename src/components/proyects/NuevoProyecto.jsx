import { useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProycto = () => {

    const proyectosContext = useContext(proyectoContext)
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext

    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    const onChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre} = proyecto

    const onSubmitProyecto = (e) => {
        e.preventDefault()
        
        if (nombre === '') {
            mostrarError()
            return
        }

        agregarProyecto(proyecto)

        setProyecto({
            nombre: ''
        })
    }

    return ( 

        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario()}
                >
                Nuevo Proyecto
            </button>
            {
                formulario
                ?
                    (
                        <form
                            className='formulario-nuevo-proyecto'
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className='input-text'
                                placeholder='Nombre Proyecto'
                                name='nombre'
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit"
                                className='btn btn-primario btn-block'
                                value='Agregar Proyecto'
                            />

                        </form>
                    )
                : null
            }
            { errorformulario ? <p className='mensaje error'>El nombre del Proyecto es requerido</p> : null}
        </>


    );
}
 
export default NuevoProycto;