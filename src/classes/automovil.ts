export class Automovil {
  private _matricula: string;
  protected _precioBase: number; // para acceder en la subclase
  private _potenciaMotor: number;
  constructor(matricula: string, precioBase: number, potenciaMotor: number) {
    this._matricula = matricula;
    this._precioBase = precioBase;
    this._potenciaMotor = potenciaMotor;
  }

  get matricula() {
    return this._matricula;
  }
  get precioBase() {
    return this._precioBase;
  }
  get potenciaMotor() {
    return this._potenciaMotor;
  }
  

  
  }
