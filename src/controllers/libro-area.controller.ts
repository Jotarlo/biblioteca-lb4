import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Libro,
  Area,
} from '../models';
import {LibroRepository} from '../repositories';

export class LibroAreaController {
  constructor(
    @repository(LibroRepository)
    public libroRepository: LibroRepository,
  ) { }

  @get('/libros/{id}/area', {
    responses: {
      '200': {
        description: 'Area belonging to Libro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async getArea(
    @param.path.number('id') id: typeof Libro.prototype.id,
  ): Promise<Area> {
    return this.libroRepository.area(id);
  }
}
