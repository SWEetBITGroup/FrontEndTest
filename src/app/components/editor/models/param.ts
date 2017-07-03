export class Param {
    private type: string;
    private name: string;

    constructor(tipo: string, nome: string) {
        this.type = tipo;
        this.name = nome;
    }

    getTipo() {
        return this.type;
    }

    getNome() {
        return this.name;
    }

    changeTipo(tipo: string) {
        this.type = tipo;
    }

    changeNome(nome: string) {
        this.name = nome;
    }
}