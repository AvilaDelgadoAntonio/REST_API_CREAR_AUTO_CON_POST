import {Request, Response, Router } from 'express'
import { Automovil } from '../classes/automovil';
import { TodoTerreno } from '../classes/todoTerreno';
import { Autos, iAuto, iTodoTerreno, } from '../model/autos'
import { db } from '../database/database'
//let automoviles: Array<Automovil> = new Array<Automovil>();
//let matricula: string, precioBase: number, potenciaMotor: number, traccion: string
class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getAutos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje: any) => {
            console.log(mensaje)
            const query  = await Autos.find({})
            res.json(query)
        })
        .catch((mensaje: any) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
    private getPlaca = async (req: Request, res: Response) => {
        const {matricula} =req.params
        console.log(req.params)
        //res.send('Me has dado la matrícula: ${matricula}')
        await db.conectarBD()
        
        .then( async (mensaje: any) => {
            console.log(mensaje)
            
            const query  = await Autos.find({"_matricula": matricula})
            res.json(query)
        })
        .catch((mensaje: any) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }
    private crearAuto = async (req: Request, res: Response) => {
        const {_tipoObjeto, _precioBase, _potenciaMotor, _matricula } =req.body
        console.log(req.body)
        //res.send('Me has dado la matrícula: ${matricula}')
        //let grabarBD = async () => {

        
            // Automovil schema
            /*let aSchema: any
            let dShemaAuto: iAuto =
            {
              _matricula: null,
              _tipoObjeto: null,
              _precioBase: null,
              _potenciaMotor: null,
            }
            let dShemaTT: iTodoTerreno =
            {
              _matricula: null,
              _tipoObjeto: null,
              _precioBase: null,
              _potenciaMotor: null,
              _traccion: null,
            }*/
            await db.conectarBD()
            res.send(`Me has dado un objeto tipo ${_tipoObjeto}`)
           /*for (let a of automoviles) {
                // valores comunes ->
                dShemaAuto._matricula = dShemaTT._matricula = a.matricula
                dShemaAuto._potenciaMotor = dShemaTT._potenciaMotor = a.potenciaMotor
                dShemaAuto._precioBase = dShemaTT._precioBase = a.precioBase
                // Valores propios ->
                // Hay que preguntar primero por las subclases
                if (a instanceof TodoTerreno) {
                  dShemaTT._tipoObjeto = "T"
                  dShemaTT._traccion = a.traccion
                  aSchema = new Autos(dShemaTT)
                } else if (a instanceof Automovil) {
                  dShemaAuto._tipoObjeto = "A"
                  aSchema = new Autos(dShemaAuto)
                }*/
                const dSchema={
                _tipoObjeto: _tipoObjeto,
                _precioBase: parseInt(_precioBase),
                _potenciaMotor: parseInt(_potenciaMotor),
                _matricula: _matricula,
                }
                console.log(dSchema)
                const oSchema = new Autos(dSchema)
                await oSchema.save()
                .then((doc: any) => {
                        console.log('Salvado Correctamente: '+ doc)
                        //res.json(doc)
                })
    
                .catch( (err: any) => {
                    console.log('Error: '+err) // concatenando con cadena muestra mensaje  
                //res.send('Error: '+ err) 
            })
                //await grabarBD()
        await db.desconectarBD()
            }


            

    misRutas(){
        this._router.get('/autos', this.getAutos)
        this._router.get('/autos/:matricula', this.getPlaca)
        this._router.post('/auto', this.crearAuto)
 
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
