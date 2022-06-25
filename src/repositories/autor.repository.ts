import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Autor, AutorRelations} from '../models';

export class AutorRepository extends DefaultCrudRepository<
  Autor,
  typeof Autor.prototype.id,
  AutorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Autor, dataSource);
  }
}
