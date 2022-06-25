import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Area, AreaRelations, Libro} from '../models';
import {LibroRepository} from './libro.repository';

export class AreaRepository extends DefaultCrudRepository<
  Area,
  typeof Area.prototype.id,
  AreaRelations
> {

  public readonly libros: HasManyRepositoryFactory<Libro, typeof Area.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LibroRepository') protected libroRepositoryGetter: Getter<LibroRepository>,
  ) {
    super(Area, dataSource);
    this.libros = this.createHasManyRepositoryFactoryFor('libros', libroRepositoryGetter,);
    this.registerInclusionResolver('libros', this.libros.inclusionResolver);
  }
}
