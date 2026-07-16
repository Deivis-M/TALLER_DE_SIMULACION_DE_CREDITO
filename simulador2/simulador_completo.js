
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}
function mostrarSeccion (id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}
function guardarTasa(){
  let valorTasa =recuperarInt("tasaInteres");
  if (valorTasa>10 && valorTasa<20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+valorTasa+"%")
  }
  else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%")
  }
}

function guardarCliente(){
  let cedula = recuperaraTexto("txtCedula");
  let estadoCliente = buscarCliente(cedula);
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("nunIngreso");
  let egresos = recuperarFloat("nunEgresos");
  let objetoCliente = {}
  if (estadoCliente == null){
    objetoCliente.cedula = cedula;
    objetoCliente.nombre = nombre;
    objetoCliente.apellido = apellido;
    objetoCliente.ingresos = ingresos;
    objetoCliente.egresos = egresos;
    clientes.push(objetoCliente);
    pintarClientes()
    }
    else{
      estadoCliente.nombre = nombre;
      estadoCliente.apellido = apellido;
      estadoCliente.ingresos = ingresos;
      estadoCliente.egresos = egresos;
      pintarClientes()
    }
}

function pintarClientes (){
  let modificarTabla = document.getElementById("tablaClientes");
  let datos ;
  let tabla = "";
  for (let i = 0; i<clientes.length;i++){
    datos = clientes[i];
    tabla += "<tr>"
    tabla += "<td>"+datos.cedula+"</td>"
    tabla += "<td>"+datos.nombre+"</td>"
    tabla += "<td>"+datos.apellido+"</td>"
    tabla += "<td>"+datos.ingresos+"</td>"
    tabla += "<td>"+datos.egresos+"</td>"
    tabla += "<td><button onclick='seleccionarCliente("+datos.cedula+")'>Actualizar</button></td>"
    tabla += "</tr>"
  }
  modificarTabla.innerHTML=tabla;
}

function buscarCliente (cedula){
  let clienteCedula ;
  for (let i = 0;i<clientes.length;i++){
    clienteCedula = clientes[i];
    if (cedula == clienteCedula.cedula){
      return clientes[i] ;
    }
  }
  return null
}

function seleccionarCliente(cedula){
  let clienteSeleccionado=buscarCliente(cedula)
  if (clienteSeleccionado != null){
    mostrarTextoEnCaja("txtCedula",clienteSeleccionado.cedula);
    mostrarTextoEnCaja("txtNombre",clienteSeleccionado.nombre);
    mostrarTextoEnCaja("txtApellido",clienteSeleccionado.apellido);
    mostrarTextoEnCaja("nunIngreso",clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("nunEgresos",clienteSeleccionado.egresos);
  }
  else{
  }
}

function limpiar (){
    mostrarTextoEnCaja("txtCedula","");
    mostrarTextoEnCaja("txtNombre","");
    mostrarTextoEnCaja("txtApellido","");
    mostrarTextoEnCaja("nunIngreso","");
    mostrarTextoEnCaja("nunEgresos","");
}