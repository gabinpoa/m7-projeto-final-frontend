export interface Livro {
  _id?: string;
  id?: number;
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: string;
  descricao?: string;
  googleBooksId?: string;
}
