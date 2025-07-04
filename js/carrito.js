document.addEventListener("DOMContentLoaded", () => {
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById("contenedor-carrito");
        seccionProductos.innerHTML = "";

        if (!carrito.length) {
            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.classList.add("mensaje-carrito");
            mensajeCarrito.textContent = "No hay productos en tu carrito";

            seccionProductos.appendChild(mensajeCarrito);
        } else {
            carrito.forEach((producto, index) => {
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("producto-carrito");

                let imgProducto = document.createElement("img");
                imgProducto.src = producto.images[0];

                let tituloProducto = document.createElement("h3");
                tituloProducto.textContent = producto.title;

                let precioProducto = document.createElement("p");
                precioProducto.textContent = `$${producto.price}`;

            
                let cantidadContenedor = document.createElement("div");
                cantidadContenedor.classList.add("cantidad-producto");

                let btnMenos = document.createElement("button");
                btnMenos.textContent = "➖";
                btnMenos.addEventListener("click", () => {
                    cambiarCantidad(index, -1);
                });

                let spanCantidad = document.createElement("span");
                spanCantidad.textContent = `Cantidad: ${producto.cantidad}`;

                let btnMas = document.createElement("button");
                btnMas.textContent = "➕";
                btnMas.addEventListener("click", () => {
                    cambiarCantidad(index, 1);
                });

                cantidadContenedor.appendChild(btnMenos);
                cantidadContenedor.appendChild(spanCantidad);
                cantidadContenedor.appendChild(btnMas);

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carrito");
                btnEliminar.textContent = "Eliminar";

                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index);
                });

                tarjetaProducto.appendChild(imgProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(cantidadContenedor);
                tarjetaProducto.appendChild(btnEliminar);

                seccionProductos.appendChild(tarjetaProducto);
            });
        }

        renderizarBotones();
        mostrarResumenCarrito(carrito);
    };

    const cambiarCantidad = (index, cambio) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito[index].cantidad += cambio;

        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarProductos();
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = "";

        if (carrito.length) {
            let btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar carrito";

            btnVaciar.addEventListener("click", () => {
                vaciarCarrito();
            });

            let btnFinalizar = document.createElement("button");
            btnFinalizar.textContent = "Finalizar compra";

            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("¿Estás seguro que deseas finalizar la compra?");
                if (confirmado) {
                    alert("Gracias por tu compra!");
                    localStorage.removeItem("carrito");
                    window.location.href = "../index.html";
                }
            });

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
        }
    };

    const productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        let total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        contadorCarrito.textContent = total;
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto eliminado");
        renderizarProductos();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert("Carrito vaciado");
        renderizarProductos();
    };

    const mostrarResumenCarrito = (carrito) => {
        let resumen = document.getElementById("resumen-carrito");
        resumen.innerHTML = "";

        if (carrito.length) {
            let total = carrito.reduce((acum, prod) => acum + prod.price * prod.cantidad, 0);
            let cantidadTotal = carrito.reduce((acum, prod) => acum + prod.cantidad, 0);
            let productosUnicos = carrito.length;

            let resumenContenido = document.createElement("div");
            resumenContenido.classList.add("resumen-total");
            resumenContenido.innerHTML = `
                <h3>Resumen del carrito:</h3>                
                <p> Total de unidades: ${cantidadTotal}</p>
                <h2> Total a pagar: $${total.toFixed(2)}</h2>
            `;

            resumen.appendChild(resumenContenido);
        }
    };

    renderizarProductos();
});
