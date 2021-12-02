Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};

function Apuesta() {
	"use strict";
	this.fecha = new Date();
	this.monto = 0;
	this.tipoApuesta = null;
	this.valorApostado = null;
	this.resultado = null;
	this.validarApuesta = function() {
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        if (now.getTime() > this.fecha.getTime()) {
            throw "Debe ingresar una fecha actual o posterior al día de hoy";
        }
        if (this.monto < 0) {
            throw "El monto a apostar debe ser positivo";
        }
        if (this.tipoApuesta === null) {
            throw "Debe ingresar tipo de apuesta";
        }
        this.tipoApuesta.validar(this);
    };
    this.apostar = function() {
        this.validarApuesta();
		var numeroGanador = Math.floor(Math.random() * 37);
		var gano = this.tipoApuesta
				.esGanador(numeroGanador, this.valorApostado);
		var ganancia = 0;
		if (gano) {
			ganancia = this.monto * this.tipoApuesta.ganancia;
		}
		this.resultado = new Resultado(gano, numeroGanador, ganancia);
	};
}

function Pleno() {
	"use strict";
	this.ganancia = 35;
	this.descripcion = 'Pleno';
	this.valoresAApostar = list(1, 36);
    this.validar = function(apuesta) {
        if (apuesta.monto < 10) {
            throw "Debe apostar más de 10 $";
        }
    };
	this.esGanador = function(numeroGanador, valorApostado) {
		return numeroGanador === valorApostado;
	};
}

function Docena() {
	"use strict";
    this.ganancia = 11;
	this.descripcion = 'Docena';
	this.valoresAApostar = [ "Primera", "Segunda", "Tercera" ];
	this.validar = function(apuesta) {
        if (apuesta.monto < 50) {
            throw "Debe apostar más de 50 $";
        }
    };
   this.esGanador = function(numeroGanador, valorApostado){
	   var docena = this.valoresAApostar.indexOf(valorApostado);
	   var min = docena* 12 + 1;
	   var max = (docena + 1)* 12;
	   return numeroGanador.between(min, max);
   }
}

