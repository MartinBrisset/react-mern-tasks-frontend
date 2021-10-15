import { useState } from "react";
import { Link } from "react-router-dom";

const NuevaCuenta = () => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    }) 

    const { nombre, email, password, confirmar } = usuario

    //Cada vez que cambia el input, se guarda la info en state
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Al tocar el boton de inciar sesion... 
    const onSubmit = (e) => {
        e.preventDefault()
        
    }

    return ( 
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='nombre'>
                            Nombre
                        </label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Tu nombre'
                            value={nombre}
                            onChange={onChange}
                            required
                            />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='email'>
                            Correo
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='lala@lalala.com'
                            value={email}
                            onChange={onChange}
                            required
                            />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>
                            Clave
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Clave supermegasegura123'
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='confirmar'>
                            Confirmar Clave
                        </label>
                        <input
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Clave supermegasegura123'
                            value={confirmar}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Iniciar sesion'
                        />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>
                    Iniciar sesion
                </Link>
            </div>
        </div>

    );
}
 
export default NuevaCuenta;