import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';

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

  updateField(field: keyof Livro, value: any) {
    this.livro.update(current => ({ ...current, [field]: value }));
  }

  onSubmit() {
    const livroAtual = this.livro();
    if (livroAtual.titulo && livroAtual.autor && livroAtual.categoria) {
      this.salvar.emit({ ...livroAtual });
      this.resetForm();
    }
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
      descricao: ''
    });
  }
}
