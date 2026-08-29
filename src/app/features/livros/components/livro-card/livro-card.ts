import { Component, Input } from '@angular/core';
import { Livro } from '../../models/livro';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-livro-card',
  styleUrl: './livro-card.css',
  templateUrl: './livro-card.html',
})
export class LivroCard {
  @Input() livro!: Livro;
}
