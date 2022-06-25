import {Entity, model, property} from '@loopback/repository';

@model()
export class AutorLibro extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  libroId?: number;

  @property({
    type: 'number',
  })
  autorId?: number;

  constructor(data?: Partial<AutorLibro>) {
    super(data);
  }
}

export interface AutorLibroRelations {
  // describe navigational properties here
}

export type AutorLibroWithRelations = AutorLibro & AutorLibroRelations;
