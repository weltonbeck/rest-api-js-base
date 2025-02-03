import { AdministratorRepository } from '../../../models/repositories/administrator.repository'
import {
  CreateAdministrator,
  UpdateAdministrator,
} from '../../../models/schema/administrator.schema'
import { CrudController } from '../crud.controller'

export class AdministratorsController extends CrudController<
  CreateAdministrator,
  UpdateAdministrator
> {
  constructor() {
    super(new AdministratorRepository())
  }
}
