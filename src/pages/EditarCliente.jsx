import {obtenerCliente, actualizarCliente} from '../data/clientes'
import { Form, useNavigate,useLoaderData,useActionData,redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from '../components/Error';

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteid)

    if(Object.values(cliente).length == 0){
        throw new Response('',{
        status:404,
        statusText:'no hay resultados'} )
    }

    return(cliente)}

export async function action({request,params}){
    const FormDat = await request.formData();

    const datos = Object.fromEntries(FormDat);
    const email = FormDat.get('email')
   
    const errores = [];

    if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
      errores.push('El email no es valido');
    }
    if(Object.keys(errores).length){
      return errores;
    }
   
    await actualizarCliente(params.clienteid,datos);
    
    return redirect('/');
}

function EditarCliente() {

    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
  return (
   
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
          <p className='mt-3'>Modifique los datos del cliente</p>
          <div className="flex justify-end">
            <button onClick={() => navigate(-1)} className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-3xl">Volver</button>
          </div>
    
          <div className="bg-white rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}
            <Form method='POST' noValidate >
            
              <Formulario
              
                cliente={cliente}
              
              />
    
              <input type="submit" className="w-full bg-blue-800 mt-5 p-3 font-bold text-white text-lg rounded-3xl" value='Guardar Cambios' />
            </Form>
          </div>
        </>
      
  )
}

export default EditarCliente