import { Component, signal, computed, inject, effect } from '@angular/core';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';
import { ListaLivros } from '../../components/lista-livros/lista-livros';
import { FiltroLivros } from '../../components/filtro-livros/filtro-livros';
import { Router } from '@angular/router';

@Component({
  imports: [ListaLivros, FiltroLivros],
  selector: 'app-livros-page',
  styleUrl: './livros-page.css',
  templateUrl: './livros-page.html',
})
export class LivrosPage {
  private livrosService = inject(LivrosService);
  private router = inject(Router);

  livros = signal<Livro[]>([]);
  searchTerm = signal('');
  categoriaFilter = signal('');
  erro = signal('');

  livrosFiltrados = computed(() => {
    const livros = this.livros();
    const termo = this.searchTerm();
    const categoria = this.categoriaFilter();

    return livros.filter(livro => {
      const matchTermo = !termo || 
        livro.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        livro.autor.toLowerCase().includes(termo.toLowerCase());
      
      const matchCategoria = !categoria || livro.categoria === categoria;
      
      return matchTermo && matchCategoria;
    });
  });

  loadLivrosEffect = effect(() => {
    this.carregarLivros();
  });

  carregarLivros() {
    this.livrosService.getLivros().subscribe({
      next: (data) => {
        this.livros.set(data);
      },
      error: (err) => {
        this.erro.set('Erro ao carregar livros: ' + err.message);
      }
    });
  }

  onSearch(termo: string) {
    this.searchTerm.set(termo);
  }

  onFilterByCategoria(categoria: string) {
    this.categoriaFilter.set(categoria);
  }

  onNovoLivro() {
    this.router.navigate(['/livros/novo']);
  }
}
