
document.addEventListener("DOMContentLoaded", ()=>{
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarProductos = ()=>{
        
        //url= "https://dummyjson.com/products?limit=10";
        url= "https://dummyjson.com/products/category/smartphones";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let contenedorProductos = document.getElementById("contenedor-productos");

                for(const producto of data.products){
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");

                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("h3");
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.textContent = `$${producto.price}`;

                    //let descripcionProducto = document.createElement("p");
                    //descripcionProducto.textContent = producto.description;

                    let btnAgregar = document.createElement("button")
                    btnAgregar.textContent = "Agregar"

                    btnAgregar.addEventListener("click", ()=>{
                        alert(`${producto.title} agregado al carrito`);
                        agregarProducto(producto);
                        actualizarAgregados();
                    })

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    //tarjetaProducto.appendChild(descripcionProducto);
                    tarjetaProducto.appendChild(btnAgregar);

                    contenedorProductos.appendChild(tarjetaProducto)
                    
                }

            }) 
            .catch(err => console.error("Error: ", err));    
    
    };

	const agregarProducto = (producto)=>{
		carrito.push(producto);
		localStorage.setItem("carrito",JSON.stringify(carrito));
	}

	const actualizarAgregados= ()=>{
		const contadorCarrito = document.getElementById("contador-carrito");
		contadorCarrito.textContent = carrito.length;
	}
    
	renderizarProductos();
	actualizarAgregados();
});
