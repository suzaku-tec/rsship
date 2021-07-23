import { Grid } from 'gridjs';
declare namespace NodeJS {
  interface Global {
    Grid: Grid
  }
}
