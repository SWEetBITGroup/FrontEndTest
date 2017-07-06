import { Classe } from '../components/editor/models/classe';

/**
 * It stores the data of the project and povides the methods
 * to retrive it's informations
 */
export class Global {
  /**
   * Name of the project
   */
  private nome_progetto = "project #1";
  /**
   * Diagram of this project stored as string
   */
  private diagramma: string;
  /**
   * Collection of the classes of this project of type Classe[]
   */
  private classi = new Array<Classe>();

  /**
   * Adds a new class to the array of classes
   * @param nome name of the class to build
   */
  addClasse(nome: string){
    this.classi.forEach(c => {
      if(c.getNome() == nome) throw new Error('NomePresente');
    })
    let c;
    c = new Classe(nome);
    this.classi.push(c);
  }

  /**
   * Changes the title of this project
   * @param titolo the new title for the project
   */
  changeTitolo(titolo: string){
    this.nome_progetto = titolo;
  }

  /**
   * Sets the class diagram of the project, saved as string
   * @param diagramma the class diagram for this project 
   */
  setDiagramma(diagramma: string){
    this.diagramma = diagramma;
  }

  /**
   * Returns the diagram of the project
   */
  getDiagramma(){
    return this.diagramma;
  }

  /**
   * Returns the name of the project
   */
  getTitolo(){
    return this.nome_progetto;
  }

  /**
   * Return the collection of classes
   */
  getClassi(){
    return this.classi;
  }

  // I campi devono ritornare come string
  /**
   * Override of the toJSON method. Returns the JSON of this project in the correct
   * format to permit the storage in the back-end and its parsing in Java
   */
  toJSON(){
    let global = '{\"nome_progetto\":\"'+this.nome_progetto+
                  '\",\"project":{\"graph\":'+ JSON.stringify(this.diagramma)+
                  ',\"classi\":'+JSON.stringify(this.classi)+'}}';
    return global;
  }

}
