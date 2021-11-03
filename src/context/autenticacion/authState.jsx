import { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import tokenAuth from "../../config/token";

import {  
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";
import clienteAxios from "../../config/axios";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Funciones para el CRUD
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos, {headers: {'Content-Type': 'application/json'}});

            console.log(respuesta.data);

            // const respuestaJson = await respuesta.json();

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
                
            });
            
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });

        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/usuarios');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
            
    }
    

    const obtenerUsuario = async () => {
        const token = localStorage.getItem('token');

        if(token){
            dispatch({
                type: OBTENER_USUARIO
            });

            try {
                const respuesta = await clienteAxios.get('/api/usuarios');

                dispatch({
                    type: OBTENER_USUARIO,
                    payload: respuesta.data
                });

            } catch (error) {
                console.log(error);

                dispatch({
                    type: LOGIN_ERROR,
                    payload: 'Hubo un error'
                });
            }
        }
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios/login', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                obtenerUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}


export default AuthState;

