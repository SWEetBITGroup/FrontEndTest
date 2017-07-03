import { Param } from './param';

export class Attributo extends Param {
    private accesso: string;

    constructor (tipo: string, nome: string, acc: string) {
        super(tipo,nome);
        this.accesso = acc;
    }

    getAccesso() {
        return this.accesso;
    }

    changeAccesso(acc: string) {
        this.accesso = acc;
    }
}