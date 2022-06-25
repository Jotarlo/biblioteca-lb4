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
  Area,
  Libro,
} from '../models';
import {AreaRepository} from '../repositories';

export class AreaLibroController {
  constructor(
    @repository(AreaRepository) protected areaRepository: AreaRepository,
  ) { }

  @get('/areas/{id}/libros', {
    responses: {
      '200': {
        description: 'Array of Area has many Libro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Libro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Libro>,
  ): Promise<Libro[]> {
    return this.areaRepository.libros(id).find(filter);
  }

  @post('/areas/{id}/libros', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {'application/json': {schema: getModelSchemaRef(Libro)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Area.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Libro, {
            title: 'NewLibroInArea',
            exclude: ['id'],
            optional: ['areaId']
          }),
        },
      },
    }) libro: Omit<Libro, 'id'>,
  ): Promise<Libro> {
    return this.areaRepository.libros(id).create(libro);
  }

  @patch('/areas/{id}/libros', {
    responses: {
      '200': {
        description: 'Area.Libro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Libro, {partial: true}),
        },
      },
    })
    libro: Partial<Libro>,
    @param.query.object('where', getWhereSchemaFor(Libro)) where?: Where<Libro>,
  ): Promise<Count> {
    return this.areaRepository.libros(id).patch(libro, where);
  }

  @del('/areas/{id}/libros', {
    responses: {
      '200': {
        description: 'Area.Libro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Libro)) where?: Where<Libro>,
  ): Promise<Count> {
    return this.areaRepository.libros(id).delete(where);
  }
}
