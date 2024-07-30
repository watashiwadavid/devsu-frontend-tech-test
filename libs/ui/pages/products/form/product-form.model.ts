import {
  date,
  maxLength,
  minLength,
  required,
  url,
} from '@rxweb/reactive-form-validators';

export class ProductForm {
  @required()
  @minLength({ value: 3 })
  @maxLength({ value: 10 })
  id: string = '';

  @required()
  @minLength({ value: 5 })
  @maxLength({ value: 100 })
  name: string = '';

  @required()
  @minLength({ value: 10 })
  @maxLength({ value: 200 })
  description: string = '';

  @required()
  @url()
  logo: string = '';

  @required()
  @date({})
  releaseDate?: Date = undefined;

  @required()
  @date()
  revisionDate?: Date = undefined;
}
