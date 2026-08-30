import { Component, inject, signal, computed, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  imports: [FormsModule],
  selector: 'app-livro-detalhe-page',
  styleUrl: './livro-detalhe-page.css',
  templateUrl: './livro-detalhe-page.html',
})
export class LivroDetalhePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livrosService = inject(LivrosService);

  livro = signal<Livro | null>(null);
  erro = signal('');
  editando = signal(false);
  id = signal('');

  // Form editing signals
  editTitulo = signal('');
  editAutor = signal('');
  editCategoria = signal('');
  editAno = signal(0);
  editStatus = signal('');
  editDescricao = signal('');

  loadLivroEffect = effect(() => {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.id.set(id);
    this.carregarLivro();
  });

  carregarLivro() {
    this.livrosService.getLivroById(this.id()).subscribe({
      next: (data) => {
        this.livro.set(data);
        // Initialize edit signals
        this.editTitulo.set(data.titulo);
        this.editAutor.set(data.autor);
        this.editCategoria.set(data.categoria);
        this.editAno.set(data.ano);
        this.editStatus.set(data.status);
        this.editDescricao.set(data.descricao || '');
      },
      error: (err) => {
        this.erro.set('Erro ao carregar livro: ' + err.message);
      }
    });
  }

  onEditar() {
    this.editando.set(true);
  }

  onSalvarEdicao() {
    const livroAtualizado: Livro = {
      _id: this.id(),
      titulo: this.editTitulo(),
      autor: this.editAutor(),
      categoria: this.editCategoria(),
      ano: this.editAno(),
      status: this.editStatus(),
      descricao: this.editDescricao()
    };

    this.livrosService.updateLivro(this.id(), livroAtualizado).subscribe({
      next: () => {
        this.editando.set(false);
        this.carregarLivro();
      },
      error: (err) => {
        this.erro.set('Erro ao atualizar livro: ' + err.message);
      }
    });
  }

  onCancelarEdicao() {
    this.editando.set(false);
    // Reset edit signals to current livro values
    const livroAtual = this.livro();
    if (livroAtual) {
      this.editTitulo.set(livroAtual.titulo);
      this.editAutor.set(livroAtual.autor);
      this.editCategoria.set(livroAtual.categoria);
      this.editAno.set(livroAtual.ano);
      this.editStatus.set(livroAtual.status);
      this.editDescricao.set(livroAtual.descricao || '');
    }
  }

  onExcluir() {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livrosService.deleteLivro(this.id()).subscribe({
        next: () => {
          this.router.navigate(['/livros']);
        },
        error: (err) => {
          this.erro.set('Erro ao excluir livro: ' + err.message);
        }
      });
    }
  }

  onVoltar() {
    this.router.navigate(['/livros']);
  }
}
