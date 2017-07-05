import { Param } from './param';

import * as joint from 'jointjs';

export class Metodo {
    nome: string;
    accesso: string;
    tipoRitorno: string;
    listaArgomenti: Param[];
    diagramma: JSON;

    constructor(nome: string, acc: string, tipo: string, listaArg?: Param[]) {
        this.nome = nome;
        this.accesso = acc;
        this.tipoRitorno = tipo;
        this.diagramma = (new joint.dia.Graph).toJSON();
        if (listaArg)
          this.listaArgomenti = listaArg;
    }

    changeNome(name: string) {
        this.nome = name;
    }

    changeTipoRitorno(tipo: string) {
        this.tipoRitorno = tipo;
    }

    changeAccesso(acc: string) {
        this.accesso = acc;
    }

    changeListaArg(listArg: Param[]) {
        this.listaArgomenti = listArg;
    }

    addArgomento(arg: Param) {
        if(!this.listaArgomenti)
            this.listaArgomenti = new Array<Param>();
        this.listaArgomenti.push(arg);
    }

    addDiagram(dia: JSON) {
        this.diagramma = dia;
    }

    getDiagram() {
        return this.diagramma;
    }

    getNome() {
        return this.nome;
    }

    getAccesso() {
        return this.accesso;
    }

    getTipoRitorno() {
        return this.tipoRitorno;
    }

    getListaArgomenti() {
        return this.listaArgomenti;
    }

    // toJSON() {
    //     let metodo = '{"name":"'+this.nome+'","arguments":['+
    //                  this.listaArgomenti.forEach((arg, index) => {
    //                      let argomento = JSON.stringify(arg);
    //                      if(index != this.listaArgomenti.length-1) argomento += ',';
    //                      return argomento;
    //                  })+'],"graph":"'+this.diagramma.toJSON()
    //     return metodo;
    // }
}
