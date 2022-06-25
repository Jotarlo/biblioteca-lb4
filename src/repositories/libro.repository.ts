import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Libro, LibroRelations, Area, Autor, AutorLibro} from '../models';
import {AreaRepository} from './area.repository';
import {AutorLibroRepository} from './autor-libro.repository';
import {AutorRepository} from './autor.repository';

export class LibroRepository extends DefaultCrudRepository<
  Libro,
  typeof Libro.prototype.id,
  LibroRelations
> {

  public readonly area: BelongsToAccessor<Area, typeof Libro.prototype.id>;

  public readonly autores: HasManyThroughRepositoryFactory<Autor, typeof Autor.prototype.id,
          AutorLibro,
          typeof Libro.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('AutorLibroRepository') protected autorLibroRepositoryGetter: Getter<AutorLibroRepository>, @repository.getter('AutorRepository') protected autorRepositoryGetter: Getter<AutorRepository>,
  ) {
    super(Libro, dataSource);
    this.autores = this.createHasManyThroughRepositoryFactoryFor('autores', autorRepositoryGetter, autorLibroRepositoryGetter,);
    this.registerInclusionResolver('autores', this.autores.inclusionResolver);
    this.area = this.createBelongsToAccessorFor('area', areaRepositoryGetter,);
    this.registerInclusionResolver('area', this.area.inclusionResolver);
  }
}
