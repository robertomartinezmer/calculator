const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero'); //se seleccionan todos los numeros 
const botonesOperadores = document.querySelectorAll('.operador');

class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }
    restar(num1, num2) {
        return num1 - num2;
    }
    dividir(num1, num2) {
        return num1 / num2;
    }
    multiplicar(num1, num2) {
        return num1 * num2;
    }
}

class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculadora = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = "";
        this.valorAnterior = "";
        // para mostrar el signo en el display cuando se va operando se emplea este map
        this.signos = {
            sumar: "+",
            restar: "-",
            dividir: "/",
            multiplicar: "*",
        }
    }

    borrar(){
        this.valorActual = this.valorActual.toString().slice(0,-1); //recorta el valor actual en su última posición
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = "";
        this.valorAnterior = "";
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if (numero === "." && this.valorActual.includes(".")) {
            return
        }
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    calcular (){
        const valorAnterior = parseFloat(this.valorAnterior);   //se hace un numero con parseFloat
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorActual) || isNaN(valorAnterior)){return } //se verifica que sean numeros 

        this.valorActual = this.calculadora[this.tipoOperacion](valorAnterior,valorActual);
    }

    operacion(tipo){
        this.tipoOperacion !== "igual" && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = "";  //se deja vacío el actual para poder volver a operar
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion]|| ""}`; // en el signo se pone o un vacío para cuando no encuentre coincidencias en el map
    }

}

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () => {
        display.agregarNumero(boton.innerHTML)
    })
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () => {
        display.operacion(boton.value)
    })
});


