import { Classe } from '../components/editor/models/classe';


export class Global {
  private titolo: string;
  private diagramma: any;
  private classi = new Array<Classe>();


  addClasse(nome: string){
    this.classi.forEach(c => {
      if(c.getNome() == nome) throw new Error('NomePresente');
    })
    let c;
    c = new Classe(nome);
    this.classi.push(c);
  }

  changeTitolo(titolo: string){
    this.titolo = titolo;
  }

  setDiagramma(diagramma: any){
    this.diagramma = diagramma;
  }

  getDiagramma(){
    return this.diagramma;
  }

  getTitolo(){
    return this.titolo;
  }

  public getClassi(){
    return this.classi;
  }

  toJSON(){
    let global = '{"titolo":"'+this.titolo+
                  '","graph":'+ this.diagramma.toJSON()+
                  '","classi":['+
                  this.classi.forEach((c,index) => {
                      let clas = c.toJSON();
                      if(index != this.classi.length-1)
                         clas += ',';   // Inserisce una ',' tra ogni attributo a meno che non sia l'ultimo elemento
                      return clas;
                  })+']}';
    return global;
  }

}
