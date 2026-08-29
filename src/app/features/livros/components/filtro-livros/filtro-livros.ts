import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-filtro-livros',
  styleUrl: './filtro-livros.css',
  templateUrl: './filtro-livros.html',
})
export class FiltroLivros {
  searchTerm: string = '';
  categoriaFilter: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() filterByCategoria = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }

  onCategoriaChange() {
    this.filterByCategoria.emit(this.categoriaFilter);
  }
}
