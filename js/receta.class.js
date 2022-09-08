 class Receta {
    constructor(id, nombre, tipo, sabor, tiempo, imagen) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.sabor = sabor
        this.tiempo = tiempo
        this.imagen = imagen
    }
}
 
class IMC {
    constructor(peso, altura) {
    this.peso = peso
    this.altura = altura
    } 
    calcular() {
        this.altura = this.altura / 100
        let resultadoIMC = (this.peso / (this.altura * this.altura)).toFixed(2)
            return resultadoIMC
    }
}



