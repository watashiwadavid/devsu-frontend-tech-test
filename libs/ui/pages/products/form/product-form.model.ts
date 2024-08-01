import {
  date,
  maxLength,
  minLength,
  notEmpty,
  pattern,
  prop,
  required,
  url,
} from '@rxweb/reactive-form-validators';

export class ProductForm {
  @notEmpty({ message: 'Campo requerido' })
  @pattern({
    expression: { alphanumeric: /^[a-zA-Z0-9]*$/ },
    message: 'Caracteres no permitidos',
  })
  @minLength({ value: 3, message: 'Mínimo 3 caracteres' })
  @maxLength({ value: 10, message: 'Máximo 10 caracteres' })
  id: string = '';

  @notEmpty({ message: 'Campo requerido' })
  @minLength({ value: 6, message: 'Mínimo 6 caracteres' })
  @maxLength({ value: 100, message: 'Máximo 100 caracteres' })
  name: string = '';

  @notEmpty({ message: 'Campo requerido' })
  @minLength({ value: 10, message: 'Mínimo 10 caracteres' })
  @maxLength({ value: 200, message: 'Máximo 200 caracteres' })
  description: string = '';

  @notEmpty({ message: 'Campo requerido' })
  @url({ message: 'Url no válida' })
  logo: string = '';

  @notEmpty({ message: 'Campo requerido' })
  releaseDate: string = '';

  @prop()
  revisionDate: string = '';

  constructor(obj?: Partial<ProductForm>) {
    Object.assign(this, obj);
  }
}
