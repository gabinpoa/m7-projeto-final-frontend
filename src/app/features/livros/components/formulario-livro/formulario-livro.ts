import { Component, signal, output, inject, effect, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario-livro',
  styleUrl: './formulario-livro.css',
  templateUrl: './formulario-livro.html',
})
export class FormularioLivro {
  livro = signal<Livro>({
    titulo: '',
    autor: '',
    categoria: '',
    ano: new Date().getFullYear(),
    status: 'disponivel',
    descricao: ''
  });

  salvar = output<Livro>();
  cancelar = output<void>();

  @ViewChild('formElement') formElement!: ElementRef<HTMLFormElement>;

  private livrosService = inject(LivrosService);
  
  searchQuery = signal('');
  searchResults = signal<any[]>([]);
  showSearchResults = signal(false);
  isSearching = signal(false);
  searchError = signal('');
  private searchDebouncer = signal('');
  private debounceTimer: any = null;
  private retryCount = 0;
  private maxRetries = 2;

  searchDebounceEffect = effect(() => {
    const query = this.searchQuery();
    
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Set new timer for debouncing (increased to 800ms to reduce API calls)
    this.debounceTimer = setTimeout(() => {
      this.searchDebouncer.set(query);
    }, 800);
    
    // Cleanup function
    return () => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
    };
  });

  searchEffect = effect(() => {
    const query = this.searchDebouncer();
    
    if (query.length < 3) {
      this.searchResults.set([]);
      this.showSearchResults.set(false);
      this.isSearching.set(false);
      this.searchError.set('');
      this.retryCount = 0;
      return;
    }
    
    this.performSearch(query);
  });

  private performSearch(query: string, retryAttempt: number = 0) {
    this.isSearching.set(true);
    this.searchError.set('');
    
    this.livrosService.searchGoogleBooks(query).subscribe({
      next: (response) => {
        this.isSearching.set(false);
        this.retryCount = 0;
        if (response.items) {
          this.searchResults.set(response.items);
          this.showSearchResults.set(true);
          this.searchError.set('');
        } else {
          this.searchResults.set([]);
          this.showSearchResults.set(false);
        }
      },
      error: (error) => {
        console.error('Error searching Google Books:', error);
        
        // Retry logic for 503 errors
        if (error.status === 503 && retryAttempt < this.maxRetries) {
          const delay = Math.pow(2, retryAttempt) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.log(`Retrying search in ${delay}ms (attempt ${retryAttempt + 1}/${this.maxRetries})`);
          
          setTimeout(() => {
            this.performSearch(query, retryAttempt + 1);
          }, delay);
          return;
        }
        
        this.isSearching.set(false);
        this.retryCount = 0;
        
        // Set user-friendly error message
        if (error.status === 503) {
          this.searchError.set('Serviço Google Books temporariamente indisponível. Tente novamente mais tarde.');
        } else if (error.status === 429) {
          this.searchError.set('Limite de buscas atingido. Aguarde um momento.');
        } else {
          this.searchError.set('Erro na busca. Você pode preencher o formulário manualmente.');
        }
        
        this.searchResults.set([]);
        this.showSearchResults.set(false);
      }
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.searchError.set('');
  }

  selectGoogleBook(book: any) {
    const volumeInfo = book.volumeInfo;
    
    this.livro.update(current => ({
      ...current,
      titulo: volumeInfo.title || current.titulo,
      autor: volumeInfo.authors?.join(', ') || current.autor,
      descricao: volumeInfo.description || current.descricao,
      ano: volumeInfo.publishedDate?.split('-')[0] || current.ano,
      googleBooksId: book.id
    }));

    this.searchResults.set([]);
    this.showSearchResults.set(false);
    this.searchQuery.set('');
    this.searchError.set('');
  }

  updateField(field: keyof Livro, value: any) {
    this.livro.update(current => ({ ...current, [field]: value }));
  }

  onSubmit() {
    // Use browser's native form validation
    if (!this.formElement.nativeElement.checkValidity()) {
      this.formElement.nativeElement.reportValidity();
      return;
    }

    const livroAtual = this.livro();
    this.salvar.emit({ ...livroAtual });
    this.resetForm();
  }

  onCancel() {
    this.cancelar.emit();
    this.resetForm();
  }

  private resetForm() {
    this.livro.set({
      titulo: '',
      autor: '',
      categoria: '',
      ano: new Date().getFullYear(),
      status: 'disponivel',
      descricao: '',
      googleBooksId: undefined
    });
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.showSearchResults.set(false);
    this.searchError.set('');
  }
}
