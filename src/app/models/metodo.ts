export class Metodo {
    nome: string;
    accesso: string;
    tipoRitorno: string;
    listaArgomenti: string[];
    diagramma: any;

    constructor(nome: string, acc: string, tipo: string, listaArg: string[]) {
        this.nome = nome;
        this.accesso = acc;
        this.tipoRitorno = tipo;
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

    changeListaArg(listArg: string[]) {
        this.listaArgomenti = listArg;
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

    getAccesso() {
        return this.accesso;
    }

    getTipoRitorno() {
        return this.tipoRitorno;
    }

    getListaArgomenti() {
        return this.listaArgomenti;
    }

    toJSON() {
        let metodo = '{"name":"'+this.nome+'","arguments":['+
                     this.listaArgomenti.forEach((arg, index) => {
                         let argomento = arg;
                         if(index != this.listaArgomenti.length) argomento += ',';
                         return argomento;
                     })+'],"graph":"'+this.diagramma.toJSON()
        return metodo;
    }
}