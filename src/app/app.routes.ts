import { Routes } from '@angular/router';
import { LivrosPage } from './features/livros/pages/livros-page/livros-page';
import { LivroDetalhePage } from './features/livros/pages/livro-detalhe-page/livro-detalhe-page';
import { NovoLivroPage } from './features/livros/pages/novo-livro-page/novo-livro-page';

export const routes: Routes = [
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosPage },
  { path: 'livros/novo', component: NovoLivroPage },
  { path: 'livros/:id', component: LivroDetalhePage }
];
