import { Metodo } from './metodo';
import { Attributo } from './attributo';

export class Classe {
    private id: string;
    private nome: string;
    private attributi: Attributo[];
    private metodi: Metodo[];
    private sottoclasse: Classe;

    constuctor(nome: string, id: string) {
        this.nome = nome;
        this.id = id;
    }
    
    // Metodo per aggiungere un attributo all'array di attributi della classe
    addAttribute(tipo: string, nome: string, acc?: string) {
        let attr
        if(acc)
            attr = new Attributo(tipo,nome,acc);
        else
            attr = new Attributo(tipo,nome,'public');

        this.attributi.push();
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
        if(ind)
            this.attributi.splice(ind,1);
    }

    removeMetodo(nomeMetodo: string) {
        let ind;
        this.metodi.forEach((metodo, index) => {
            if(metodo.getNome() == nomeMetodo)
                ind = index;
        });
        if(ind)
            this.metodi.splice(ind,1);
    }

    // Metodo che restituisce il nome della classe
    getNome() {
        return this.nome;
    }

    // Metodo che restituisce l'id della classe
    getId() {
        return this.id;
    }

    // Metodo che restituisce la sottoclasse della classe
    getSottoclasse() {
        return this.sottoclasse;
    }

    // Metodo che produce una rappresentazione JSON della classe
    toJSON() {
        let classe = '{"id":"'+this.id+'","name":"'+this.nome+'","attributes":['+
                     this.attributi.forEach((attr,index) => {
                         let attributo = attr.toJSON();
                         if(index != this.attributi.length-1) 
                            attributo += ',';   // Inserisce una ',' tra ogni attributo a meno che non sia l'ultimo elemento
                         return attributo;
                     })+'],"methods":['+
                     this.metodi.forEach((met, index) => {
                         let metodo = met.toJSON();
                         if(index != this.metodi.length-1) 
                            metodo += ',';       // Inserisce una ',' tra ogni metodo a meno che non sia l'ultimo elemento
                     })+'],'+this.subclassToJSON();

        return classe;
    }
    
    subclassToJSON() {
        if(this.sottoclasse){
            return ',"subclass":'+this.sottoclasse.toJSON()+'}';
        }
        return '}';
    }
}