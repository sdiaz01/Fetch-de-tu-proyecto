
const borrarReceta = async () => {

    if (datosCompletosBorrar(true)) {

        let borrarR = borrar.value.toUpperCase()
        borrando = recetas.find(r => r.nombre == borrarR) || false
        if (!borrando) {
            toastSwal("La receta ingresada no existe", "error", "white")
            borrar.value = ""
            borrar.focus()
        } else {

            recetas.forEach(receta => {
                if (receta.nombre == borrarR) {
                    idR = receta.id
                }
            })

            const FULLURL = `${URL}${idR}`
            const OPTIONS = {
                method: 'DELETE',
                headers: { 'Content-Type': 'Application/json' }
            }
            const response = await fetch(FULLURL, OPTIONS)
            respuesta = await response.json()
            borrar.value = ""
            cerrarBorrar()
            cargarRecetas()
            toastSwal("La receta fue borrada", "warning", "white")
        }
    } else {
        toastSwal("Debe ingresar un nombre.", "error", "white")
    }


}

const buscarReceta = () => {

    const busqueda = recetas.filter(receta => receta.nombre.includes(buscar.value.toUpperCase()))
    const cuerpo = document.getElementById("cuerpo")
    cuerpo.innerHTML = ""

    busqueda.forEach(receta => {
        cuerpo.innerHTML += `
                                <div class="grid-item">
                                <div class="card">
                                  <img class="card-img" src="${receta.imagen}">
                                  <div class="card-content">
                                    <h1 class="card-header">${receta.nombre}</h1>
                                    <br><br>
                                     <p class="card-text">${receta.tipo}</p>
                                     <p class="card-text">${receta.sabor}</p>
                                     <p class="card-text">${receta.tiempo}</p>
                                    <button class="card-btn">Ver <span>&rarr;</span></button>
                                  </div>
                                </div>
                                </div>
                                `
    })

    if (busqueda.length === 0) {
        document.getElementById("noEncontrado").style.display = 'block';
    } else {
        document.getElementById("noEncontrado").style.display = 'none';
    }

    if (buscar.value == "") {
        cargarRecetas()
    }
}



const calcularIMC = () => {

    const imc = new IMC(peso.value, altura.value)
    let resultadoIMC = imc.calcular()
    if (datosCompletosIMC(true)) {

        valorIMC.innerText = resultadoIMC

        if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {
            toastSwal("Su peso se encuentra normal", "succces", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()
        } else if (resultadoIMC > 25) {
            toastSwal("Su peso se encuentra por arriba del limite", "warning", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()
        } else if (resultadoIMC < 18.4) {
            toastSwal("Su peso se encuentra por debajo del limite", "warning", "white")
            peso.value = ""
            altura.value = ""
            peso.focus()

        }

    } else {
        toastSwal("Debe ingresar valores correctos!", "error", "white")
    }



}

const agregarReceta = async () => {

    const resultado = recetas.some(receta => receta.nombre === (nombre.value).toUpperCase())

    if (datosCompletosAgregar(true) && resultado === false) {

        const datos = {
            nombre: (nombre.value).toUpperCase(),
            tipo: (tipo.value).toUpperCase(),
            sabor: (sabor.value).toUpperCase(),
            tiempo: (tiempo.value).toUpperCase(),
            imagen: './fotos/proximamente.jpg'
        }
        const BODY = JSON.stringify(datos)
        const OPTIONS = {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: BODY
        }
        const response = await fetch(URL, OPTIONS)
        respuesta = await response.json()
        nombre.value = ""
        tipo.value = ""
        sabor.value = ""
        tiempo.value = ""
        cerrarAgregar()
        toastSwal("La receta fue agregada", "success", "white")
        cargarRecetas()

    } else if (datosCompletosAgregar(true) && resultado === true) {
        nombre.value = ""
        tipo.value = ""
        sabor.value = ""
        tiempo.value = ""
        nombre.focus()
        toastSwal("La receta ingresada ya existe", "error", "white")
    } else {
        toastSwal("Debe ingresar todos los valores", "error", "white")
    }


}



const cargarRecetas = async () => {
    cuerpo.innerHTML = ""
    try {
        recetas.reverse()
        recetas = await peticionFetch()
        recetas.forEach(receta => {
            cuerpo.innerHTML += `
                <div class="grid-item">
                <div class="card">
                  <img class="card-img" src="${receta.imagen}">
                  <div class="card-content">
                    <h1 class="card-header">${receta.nombre}</h1>
                    <br><br>
                     <p class="card-text">${receta.tipo}</p>
                     <p class="card-text">${receta.sabor}</p>
                     <p class="card-text">${receta.tiempo}</p>
                    <button class="card-btn">Ver <span>&rarr;</span></button>
                  </div>
                </div>
                </div>
                `
        })
    } catch (error) {
        toastSwal("Error al cargar las recetas", "error", "white")
    } /* finally {
            toastSwal2("Las recetas fueron cargadas exitosamente", "success", "white")
        } */
}

const peticionFetch = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    return data
}

cargarRecetas()



const toastSwal = (mensaje, icono, bgcolor) => {
    Swal.fire({
        title: mensaje,
        icon: icono,
        background: bgcolor,
        color: 'black'
    })
}

const toastSwal2 = (mensaje, icono, bgcolor) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        title: mensaje,
        icon: icono,
        background: bgcolor,
        color: 'black',
        showConfirmButton: false,
        timer: 5000
    })
}
