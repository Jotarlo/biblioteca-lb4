import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Area} from './area.model';
import {Autor} from './autor.model';
import {AutorLibro} from './autor-libro.model';

@model()
export class Libro extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @property({
    type: 'string',
  })
  resumen?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  keywords?: string[];

  @property({
    type: 'date',
    required: true,
  })
  fecha_publicacion: string;

  @property({
    type: 'string',
  })
  imagen?: string;

  @belongsTo(() => Area)
  areaId: number;

  @hasMany(() => Autor, {through: {model: () => AutorLibro}})
  autores: Autor[];

  constructor(data?: Partial<Libro>) {
    super(data);
  }
}

export interface LibroRelations {
  // describe navigational properties here
}

export type LibroWithRelations = Libro & LibroRelations;
