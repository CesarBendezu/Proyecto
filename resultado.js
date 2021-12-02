function Resultado(gano, numeroGanador, montoAGanar) {
    this.gano = gano;
    this.numeroGanador = numeroGanador;
    this.montoAGanar = montoAGanar;
}

Resultado.prototype.valor = function() {
    if (this.gano) {
        return '¡¡ Ganaste $' + this.montoAGanar + " !!";
    } else {
        return '¡¡Perdiste!! Salió el ' + this.numeroGanador;
    }
};