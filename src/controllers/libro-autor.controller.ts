import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Libro,
AutorLibro,
Autor,
} from '../models';
import {LibroRepository} from '../repositories';

export class LibroAutorController {
  constructor(
    @repository(LibroRepository) protected libroRepository: LibroRepository,
  ) { }

  @get('/libros/{id}/autors', {
    responses: {
      '200': {
        description: 'Array of Libro has many Autor through AutorLibro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Autor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Autor>,
  ): Promise<Autor[]> {
    return this.libroRepository.autores(id).find(filter);
  }

  @post('/libros/{id}/autors', {
    responses: {
      '200': {
        description: 'create a Autor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Autor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Libro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Autor, {
            title: 'NewAutorInLibro',
            exclude: ['id'],
          }),
        },
      },
    }) autor: Omit<Autor, 'id'>,
  ): Promise<Autor> {
    return this.libroRepository.autores(id).create(autor);
  }

  @patch('/libros/{id}/autors', {
    responses: {
      '200': {
        description: 'Libro.Autor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Autor, {partial: true}),
        },
      },
    })
    autor: Partial<Autor>,
    @param.query.object('where', getWhereSchemaFor(Autor)) where?: Where<Autor>,
  ): Promise<Count> {
    return this.libroRepository.autores(id).patch(autor, where);
  }

  @del('/libros/{id}/autors', {
    responses: {
      '200': {
        description: 'Libro.Autor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Autor)) where?: Where<Autor>,
  ): Promise<Count> {
    return this.libroRepository.autores(id).delete(where);
  }
}
