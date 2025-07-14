export class QuestionMlModel {
    id: number;
    text: string;
    item_id?: string;
  
    constructor(id: number, text: string, item_id?: string) {
      this.id = id;
      this.text = text;
      this.item_id = item_id;
    }
  }