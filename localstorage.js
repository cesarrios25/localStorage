// variables globales
const d = document;
let clienteInput = document.querySelector('.cliente');
let productoInput = document.querySelector('.producto');
let precioInput = document.querySelector('.precio');
let imagenInput = document.querySelector('.imagen');
let observacionInput = document.querySelector('.observacion');
let btnGuardar = document.querySelector('.btn-guardar');
let tabla = document.querySelector('.table > tbody')

// Agregar evento al boton del formulario
btnGuardar.addEventListener('click', () => {
    // alert(clienteInput.value)
    let datos = validarFormulario();
    if (datos != null) {
        guardarDatosLocalStorage(datos);
    }
    quitarDatosTabla();
    obtenerDatosLocalStorage();
} )

// Funcion para validar los campos del formulario
function validarFormulario() {
    let datosFormulario = [];
    if (clienteInput.value == "" || productoInput.value == "" || precioInput.value == "" || imagenInput.value == "") {
        alert("Todos los campos son obligatorios");
        return;
    } else {
        datosFormulario = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value
        }
        console.log(datosFormulario)
        // Limpia el campo despues de hacer un ingreso.
        clienteInput.value = ""; 
        productoInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";
        
        return datosFormulario;
        // Esto es para que la func ion me tome los datos, limpie el formulario y esos datos tomados del objeto los devuelva.
    }
}



const listadoPedidos = 'pedidos'; // aqui se guardaran todos los pedidos.
function guardarDatosLocalStorage(datos) {
    let pedidos = []; // aqui se guardaran los pedidos viejos como los nuevos

    // extraer datos guardados previamente en el localStorage.
    let pedidosAnteriores = JSON.parse(localStorage.getItem(listadoPedidos));

    // validar datos guardados previamente en localStorage
    if(pedidosAnteriores != null) {
        pedidos = pedidosAnteriores;
    }

    // Agregar el pedido nuevo al array.
    pedidos.push(datos);

    // guardar en localStorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos))

    // Validar que los datos fueron guardados.
    alert('Pedido agregado con exito')
}

// funcion para extraer los datos guardados previamente en el localStorage.
function obtenerDatosLocalStorage() {
    //////////////// este bloque siempre se repite para guardar o mostrar los datos del localStorage.
    let pedidos = [];
    // extraer datos guardados previamente en el localStorage.
    let pedidosAnteriores = JSON.parse(localStorage.getItem(listadoPedidos));
    // validar datos guardados previamente en localStorage
    if(pedidosAnteriores != null) {
        pedidos = pedidosAnteriores;
    }
    //////////////
    console.log(pedidos)

    // mostrar los datos en la tabla
    pedidos.forEach((pedido, indice) => {
        let fila = document.createElement('tr')
        fila.innerHTML = `
        <td>${indice+1}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.producto}</td>
        <td>${pedido.precio}</td>
        <td><img src="${pedido.imagen}" width="100px"></td>
        <td>${pedido.observacion}</td>
        <td>
            <span onclick="actualizarRegistroTabla(${indice})" class="btn-editar btn btn-warning"> 📑 </span>
            <span onclick="eliminarRegistroTabla(${indice})" class="btn-eliminar btn btn-warning mt-1"> ❌ </span>
        
        </td>
        `;
        tabla.appendChild(fila)
    });
}

// quitar los datos de la tabla.
function quitarDatosTabla() {
    let filas = document.querySelectorAll('.table tbody tr')
    filas.forEach((fila) => {
        fila.remove();
    })
}

// funcion para eliminar un registro de la tabla.
function eliminarRegistroTabla(indiceTabla) {
    //////////////// este bloque siempre se repite para guardar, mostrar o eliminar los datos del localStorage.
    let pedidos = [];
    // extraer datos guardados previamente en el localStorage.
    let pedidosAnteriores = JSON.parse(localStorage.getItem(listadoPedidos));
    // validar datos guardados previamente en localStorage
    if(pedidosAnteriores != null) {
        pedidos = pedidosAnteriores;
    }
    //////////////

    // confirmar pedido a eliminar.
    let confirmar = confirm(`Estas seguro que deseas eliminar el producto del cliente: ${pedidos[indiceTabla].cliente}`)
    if (confirmar) {
        pedidos.splice(indiceTabla, 1)
        alert('Producto eliminado')
        
        // guardar datos que quedaron en localstorage
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos))
        quitarDatosTabla();
        obtenerDatosLocalStorage();
    } else {
        alert('Operacion cancelada')
    }
}

// actualizar pedidode localstorage.
function actualizarRegistroTabla(indiceTabla) {
    let pedidos = [];
    // extraer datos guardados previamente en el localStorage.
    let pedidosAnteriores = JSON.parse(localStorage.getItem(listadoPedidos));
    // validar datos guardados previamente en localStorage
    if(pedidosAnteriores != null) {
        pedidos = pedidosAnteriores;
    }
    // Pasar los datos al formulario para editarlos.
    clienteInput.value = pedidos[indiceTabla].cliente;
    productoInput.value = pedidos[indiceTabla].producto;
    precioInput.value = pedidos[indiceTabla].precio;
    imagenInput.value = pedidos[indiceTabla].imagen;
    observacionInput.value = pedidos[indiceTabla].observacion;

    // activar boton actualizar datos
    let btnActualizar = document.querySelector('.btn-actualizar')
    btnActualizar.classList.toggle('d-none');
    btnGuardar.classList.toggle('d-none')

    // agregar evento al boton de actualizar
    btnActualizar.addEventListener('click', function () {
        pedidos[indiceTabla].cliente = clienteInput.value;
        pedidos[indiceTabla].producto = productoInput.value;
        pedidos[indiceTabla].precio = precioInput.value;
        pedidos[indiceTabla].imagen = imagenInput.value;
        pedidos[indiceTabla].observacion = observacionInput.value;

        //guardar los datos editados en localstorage.
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert('El pedido fue actualizado con exito!!');

        clienteInput.value = ""; 
        productoInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        quitarDatosTabla();
        obtenerDatosLocalStorage();

        btnActualizar.classList.toggle('d-none');
        btnGuardar.classList.toggle('d-none')
    });
}

// mostrar los datos de localstorage al recargar la pagina
document.addEventListener('DOMContentLoaded', function() {
    quitarDatosTabla();
    obtenerDatosLocalStorage();
})

