import { Component, Input } from '@angular/core';
import { Livro } from '../../models/livro';
import { LivroCard } from '../livro-card/livro-card';

@Component({
  imports: [LivroCard],
  selector: 'app-lista-livros',
  styleUrl: './lista-livros.css',
  templateUrl: './lista-livros.html',
})
export class ListaLivros {
  @Input() livros: Livro[] = [];
}
