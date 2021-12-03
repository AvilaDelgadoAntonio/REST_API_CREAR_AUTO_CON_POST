import { Automovil } from './automovil';
//import { Personal } from './personal'; //doble relación
export class TodoTerreno extends Automovil {
  private _traccion: string;
  constructor(matricula: string, precioBase: number, potenciaMotor: number, traccion: string) {
    super(matricula, precioBase, potenciaMotor);
    this._traccion = traccion;
  }
  get traccion() {
    return this._traccion;
  }
  
}
