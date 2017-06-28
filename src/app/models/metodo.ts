export class Metodo {
    nome: string;
    tipoRitorno: string;
    listaArgomenti: string[];
    diagramma: any;

    constructor() {}

    changeNome(name: string) {
        this.nome = name;
    }

    changeTipoRitorno(tipo: string) {
        this.tipoRitorno = tipo;
    }

    addArgomento(arg: string) {
        this.listaArgomenti.push(arg);
    }

    addDiagram(dia: any) {
        this.diagramma = dia;
    }

    getNome() {
        return this.nome;
    }

    getTipoRitorno() {
        return this.tipoRitorno;
    }

    getListaArgomenti() {
        return this.listaArgomenti;
    }

    toJSON() {
        let metodo = '{"name":"'+this.nome+'","arguments":['+
                     this.listaArgomenti.forEach((element, index) => {
                         let arg = element;
                         if(index != this.listaArgomenti.length) arg += ',';
                         return arg;
                     })+'],"graph":"'+this.diagramma.toJSON()
        return metodo;
    }
}