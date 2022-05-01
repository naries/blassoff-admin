import { combineReducers } from "redux";
import auth from "./auth";
import users from './users'
import roles from './roles'
import customers from './customers'
import dashboard from './dashboard'
import payments from './payments'

export default combineReducers({
  auth,
  users,
  roles,
  customers,
  dashboard,
  payments
});
