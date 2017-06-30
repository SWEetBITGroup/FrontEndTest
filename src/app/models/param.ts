export class Param {
    private tipo: string;
    private nome: string;

    constructor(tipo: string, nome: string) {
        this.tipo = tipo;
        this.nome = nome;
    }

    getTipo() {
        return this.tipo;
    }

    getNome() {
        return this.nome;
    }

    changeTipo(tipo: string) {
        this.tipo = tipo;
    }

    changeNome(nome: string) {
        this.nome = nome;
    }

    toJSON() {
        return '{"type":"'+this.tipo+'","name":"'+this.nome+'"}';
    }
}