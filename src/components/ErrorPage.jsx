import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError()
   

    return(
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">{error.statusText ? error.status : 'CRM Clientes'}</h1>
            <p className="text-center text-blue-700 text-3xl font-bold">Ha ocurrido un error</p>
            <p className="text-center font-bold text-1xl ">{error.message || error.statusText}</p>
        </div>
    )
}