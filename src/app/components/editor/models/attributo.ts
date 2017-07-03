import { Param } from './param';

export class Attributo extends Param {
    private visibility: string;

    constructor (tipo: string, nome: string, acc: string) {
        super(tipo,nome);
        this.visibility = acc;
    }

    getAccesso() {
        return this.visibility;
    }

    changeAccesso(acc: string) {
        this.visibility = acc;
    }
}