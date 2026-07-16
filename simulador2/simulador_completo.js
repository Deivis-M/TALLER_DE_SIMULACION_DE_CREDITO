
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let capacidadPago = 0;
  let totalPagar = 0;
  let cuotaMensual = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("credito").classList.remove("activa");
}
function mostrarSeccion (id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}
function guardarTasa(){
  let valorTasa =recuperarInt("tasaInteres");
  if (valorTasa>=10 && valorTasa<=20){
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

function buscarClienteCredito(){
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let estadoCliente=buscarCliente (cedula);
  let datosClienteCredito = document.getElementById("datosClienteCredito")
  let comienzoDatos = "";
  if (estadoCliente != null){
    comienzoDatos += "<h3>Datos del Cliente</h3>"
    comienzoDatos += "<p><strong>Cédula:</strong>"+estadoCliente.cedula+"</p>"
    comienzoDatos += "<p><strong>Nombre:</strong>"+estadoCliente.nombre+"</p>"
    comienzoDatos += "<p><strong>Apellido:</strong>"+estadoCliente.apellido+"</p>"
    comienzoDatos += "<p><strong>Ingresos:</strong>"+estadoCliente.ingresos+"</p>"
    comienzoDatos += "<p><strong>Egresos:</strong>"+estadoCliente.egresos+"</p>"
  }
  else {
    comienzoDatos += "<h3>Cliente no encontrado </h3>"
  }
  datosClienteCredito.innerHTML = comienzoDatos
}


function calcularCredito (){
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let datosCliente = buscarCliente(cedula);
  if (datosCliente != null){
    let valorDisponible = calcularDisponible(datosCliente.ingresos,datosCliente.egresos);
    let capacidadPago = calcularCapacidadPago(valorDisponible);
    let totalPagar = calcularTotalPagar (recuperarFloat("montoCredito"),tasaInteres);
    let cuotaMensual = calcularCuotaMensual(totalPagar,recuperarFloat("plazoCredito"));
    let creditoAprobado = aprobarCredito(capacidadPago,cuotaMensual);
    let resultadoCredito = document.getElementById("resultadoCredito");
    let comienzoCredito = "<p><strong>Capacidad de pago:</strong>"+capacidadPago.toFixed(2)+"</p>"
        comienzoCredito +="<p><strong>Total a pagar:</strong>"+totalPagar.toFixed(2)+"</p>"
        comienzoCredito +="<p><strong>Cuota Mensual:</strong>"+cuotaMensual.toFixed(2)+"</p>"
    if (creditoAprobado == true){
      comienzoCredito +="<p><strong> RESULTADO:</strong>APROBADO</p>"
    }
    else{
      comienzoCredito +="<p><strong> RESULTADO:</strong>RECHAZADO</p>"
    }
    resultadoCredito.innerHTML = comienzoCredito
  }
  else{
    let mensajeCredito = document.getElementById("datosClienteCredito");
    let mensajeCreditoError = "<h3>No se puede calcular el credito </h3>"+"<h3>Verifique la cédula ingresada </h3>"
    datosClienteCredito.innerHTML = mensajeCreditoError
    let resultadoCredito = document.getElementById("resultadoCredito");
    resultadoCredito.innerHTML = ""
  }
}

function calcularDisponible(ingreso, egresos) {
    let disponible = ingreso - egresos;
    if (disponible < 0) {
        disponible = 0;
    }
    return disponible;
}
function calcularCapacidadPago(valorDisponible){
    let calculo = (30/100)*valorDisponible;
    return calculo
}
function calcularTotalPagar (monto,interes){
    let calculo= monto+interes+100
    return calculo
}

function calcularCuotaMensual(total,plazoAnios){
    let meses = plazoAnios*12
    let calculo = total/meses
    return calculo
}
function aprobarCredito(capacidadPago,cuotaMensual){
    if (capacidadPago>cuotaMensual){
        return true
    }
    else{
        return false
    }
}