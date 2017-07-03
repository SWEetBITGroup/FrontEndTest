import { Classe } from './classe';

class MetodiAstratti{
    constructor(public nome: string, 
                public tipo: string, 
                public listaParam: string[]){}
}

export class ClasseAstratta extends Classe {

    abstractMethods = new Array<MetodiAstratti>();

    constructor(nome: string) {
        super(nome);
    }

    addAbstractMethods(nome: string, tipo: string, listaParam: string[]) {
        this.abstractMethods.push(new MetodiAstratti(nome,tipo,listaParam));
    }

    toJSON() {
        let classe = '{"name":"'+super.getNome()+'","attributes":'+
        JSON.stringify(super.getAttributi)+',"methods":'+
        JSON.stringify(super.getMetodi)+',"abstract-methods":'+
        JSON.stringify(this.abstractMethods)+'}';
    }
}