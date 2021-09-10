import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetasCredito: any[] = [
    
  ];

  accion:string = 'Agregar';

  form: FormGroup;

  id:number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    this.form = this.fb.group(
      {
        cardholder: ['', Validators.required],
        ccn: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        expire: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
        cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListaTarjetas().subscribe(data=>
      this.listTarjetasCredito=data, error=>{
        console.log(error)
      })
  }

  guardarTarjeta() {
    const tarjeta: any = {
      cardholder: this.form.get('cardholder')?.value,
      ccn: this.form.get('ccn')?.value,
      expire: this.form.get('expire')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if(this.id == undefined){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data=>{
        this.toastr.success('La tarjeta fue registrada con éxito', 'Tarjeta Registrada');
        this.obtenerTarjetas();
        this.form.reset();
      },error=>{
        this.toastr.error('Ocurrió un error','Error')
        console.log(error);
      })
    }

    else{
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data=>{
        this.form.reset();
        this.accion='agregar';
        this.id=undefined;
        this.toastr.info('Tarjeta modificada con éxito','Modificada');
        this.obtenerTarjetas();
      },error=>{this.toastr.error('Ocurrió un error','Error')
      console.log(error);})
    }

    
    
    
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
      this.toastr.error('La tarjeta fue eliminada con éxito', 'Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error=>{console.log(error)} );
    
  }

  editarTarjeta(tarjeta:any){
    this.accion='editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      cardholder : tarjeta.cardHolder,
      ccn:tarjeta.ccn,
      expire:tarjeta.expire,
      cvv:tarjeta.cvv
    })
  } 

}
