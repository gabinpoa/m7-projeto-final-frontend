import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LivrosService } from './livros.service';
import { Livro } from '../models/livro';

describe('LivrosService', () => {
  let service: LivrosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LivrosService]
    });
    service = TestBed.inject(LivrosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get livros', () => {
    const mockLivros: Livro[] = [
      {
        _id: '1',
        titulo: 'Clean Code',
        autor: 'Robert C. Martin',
        categoria: 'Tecnologia',
        ano: 2008,
        status: 'disponivel',
        descricao: 'Livro sobre boas práticas'
      }
    ];

    service.getLivros().subscribe(livros => {
      expect(livros).toEqual(mockLivros);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/livros');
    expect(req.request.method).toBe('GET');
    req.flush(mockLivros);
  });

  it('should get livro by id', () => {
    const mockLivro: Livro = {
      _id: '1',
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      categoria: 'Tecnologia',
      ano: 2008,
      status: 'disponivel',
      descricao: 'Livro sobre boas práticas'
    };

    service.getLivroById('1').subscribe(livro => {
      expect(livro).toEqual(mockLivro);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/livros/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockLivro);
  });
});
