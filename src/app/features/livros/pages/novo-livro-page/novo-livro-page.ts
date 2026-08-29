import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';
import { FormularioLivro } from '../../components/formulario-livro/formulario-livro';

@Component({
  imports: [FormularioLivro],
  selector: 'app-novo-livro-page',
  styleUrl: './novo-livro-page.css',
  templateUrl: './novo-livro-page.html',
})
export class NovoLivroPage {
  private router = inject(Router);
  private livrosService = inject(LivrosService);
  erro = signal('');

  onSalvarLivro(livro: Livro) {
    this.livrosService.createLivro(livro).subscribe({
      next: () => {
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        this.erro.set('Erro ao salvar livro: ' + err.message);
      }
    });
  }

  onCancelar() {
    this.router.navigate(['/livros']);
  }
}
