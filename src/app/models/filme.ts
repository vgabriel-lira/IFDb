export interface Filme {
  id: number;
  titulo: string;
  descricao?: string;
  sinopse?: string;
  ano?: number;
  categoria?: string;
  genero?: string;
  imagemUrl?: string;
}