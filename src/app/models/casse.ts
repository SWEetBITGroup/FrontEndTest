import { Metodo } from './metodo';

export class Classe {
    private id: string;
    private nome: string;
    private attributi: string[];
    private metodi: Metodo[];
    private sottoclasse: Classe;

    constuctor(nome: string, id: string) {
        this.nome = nome;
        this.id = id;
    }
    
    // Metodo per aggiungere un attributo all'array di attributi della classe
    addAttribute(attr: string) {
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


    toJSON() {
        let classe = '{"id":"'+this.id+'","name":"'+this.nome+'","attributes":['+
                     this.attributi.forEach((element,index) => {
                         let split = element.split(':');
                         let attr = JSON.stringify(split[0])+':'+JSON.stringify(split[1]);
                         if(index != this.attributi.length-1) attr += ','; // Inserisce una ',' tra ogni attributo a meno che non sia l'ultimo nome/valore
                         return attr;
                     })+'],"methods":['+
                     this.metodi.forEach((element, index) => {
                         let metodo = element.toJSON();
                         if(index != this.metodi.length-1) metodo += ','; // Inserisce una ',' tra ogni metodo a meno che non sia l'ultimo nome/valore
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