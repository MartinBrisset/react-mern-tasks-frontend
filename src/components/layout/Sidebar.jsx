import ListadoProyectos from "../proyects/ListadoProyectos";
import NuevoProycto from "../proyects/NuevoProyecto";

const Sidebar = () => {
    return ( 

        <aside>
            <h1>
                MERN <span>Task</span>
            </h1>
            <NuevoProycto />
            <div className="proyectos">
                <h2>Tus Proyectos </h2>
                <ListadoProyectos />
            </div>
        </aside>

    );
}
 
export default Sidebar;