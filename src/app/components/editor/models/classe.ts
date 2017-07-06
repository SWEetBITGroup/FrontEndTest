import { Metodo } from './metodo';
import { Attributo } from './attributo';

export class Classe {
    private nome: string;
    private attributi = new Array<Attributo>();
    private metodi = new Array<Metodo>();
    private sottoclasse: Classe;

    constructor(nome: string) {
        this.nome = nome;
    }

    // Metodo per aggiungere un attributo all'array di attributi della classe
    /**
     * This method adds a new attribute into the array of attributes ´this.attributi´,
     * but first it'll controll if there is not an attribute with the same name.
     * @param tipo type of the new attribute, it's passed as parameter to the constructor of Attributo
     * @param nome the name of the new attribute, it's passed as parameter to the constructor of Attributo
     * @param acc 
     * @throws an error of type Error anche custom message 'NomePresente'
     */
    addAttributo(tipo: string, nome: string, acc?: string) {
        this.attributi.forEach(attr => {
            if(attr.getNome() == nome) 
                throw new Error('NomePresente');
        });
        let attr;
        if(acc)
            attr = new Attributo(tipo,nome,acc);
        else
            attr = new Attributo(tipo,nome,'public');
        this.attributi.push(attr);
    }

    // Metodo per aggiungere una sottoclasse
    addSottoclasse(subclass: Classe) {
        this.sottoclasse = subclass;
    }

    // Metodo per aggiungere un nuovo metodo alla classe
    addMetodo(metodo: Metodo) {
        this.metodi.push(metodo);
    }

    // Metodo per cambiare il nome alla classe
    changeNome(name: string) {
        this.nome = name;
    }

    changeAttr(nomeAttr: string, tipo?: string, nuovoNome?: string, acc?: string) {
        let attributo;
        this.attributi.forEach(attr => {
            if(attr.getNome() == nomeAttr)
                attributo = attr;
        });
        if(attributo){
            if(tipo)
                attributo.changeTipo(tipo);
            if(nuovoNome)
                attributo.changeNome(nuovoNome);
            if(acc)
                attributo.changeAcc(acc);
        }
    }

    removeAttr(nomeAttr: string) {
        let ind;
        this.attributi.forEach((attr,index) => {
            if(attr.getNome() == nomeAttr)
                ind = index;
        });
        if(ind >= 0)
            this.attributi.splice(ind,1);
        console.log(this);
    }

    removeMetodo(nomeMetodo: string) {
        let ind;
        this.metodi.forEach((metodo, index) => {
            if(metodo.getNome() == nomeMetodo)
                ind = index;
        });
        if(ind >= 0)
            this.metodi.splice(ind,1);
    }

    // Metodo che restituisce il nome della classe
    getNome() {
        return this.nome;
    }

    // Metodo che ritorna l'array di attributi
    getAttributi() {
        return this.attributi;
    }

    // Ritorna l'array di metodi
    getMetodi() {
        return this.metodi;
    }

    retriveMethod(name: string) {
        let met: Metodo;
        this.metodi.forEach(metodo => {
            if(metodo.getNome() == name)
                met = metodo;
            else
                throw new Error('Metodo non presente')
        });
        return met;
    }

    // Metodo che restituisce la sottoclasse della classe
    getSottoclasse() {
        return this.sottoclasse;
    }

    // Metodo che produce una rappresentazione JSON della classe
    toJSON() {
        let classe = '{\"name\":\"'+this.nome+'\",\"attributes\":'+
                     JSON.stringify(this.attributi)+',\"methods\":'+
                     JSON.stringify(this.metodi)+this.subclassToJSON();

        return JSON.parse(classe);
    }

    subclassToJSON() {
        if(this.sottoclasse){
            return ',\"subclass\":'+this.sottoclasse.toJSON()+'}';
        }
        return '}';
    }
}
