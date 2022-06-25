import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AutorLibro, AutorLibroRelations} from '../models';

export class AutorLibroRepository extends DefaultCrudRepository<
  AutorLibro,
  typeof AutorLibro.prototype.id,
  AutorLibroRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AutorLibro, dataSource);
  }
}
