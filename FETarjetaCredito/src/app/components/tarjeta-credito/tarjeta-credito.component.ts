import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetasCredito: any[] =[
    {cardholder:'Juan Perez',ccn:'1234567890123456',expire:'11/23',cvv:'123'},
    {cardholder:'Card Holder 1',ccn:'1234567890123457',expire:'11/22',cvv:'124'},
    {cardholder:'Card Holder 2',ccn:'1234567890123458',expire:'10/22',cvv:'125'}
  ];
  
  form:FormGroup;
  
  constructor(private fb: FormBuilder, private toastr:ToastrService) {
    this.form=this.fb.group({
      cardholder:['',Validators.required],
      ccn:['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      expire:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
  }

  addTarjeta(){
    const tarjeta:any ={
      cardholder:this.form.get('cardholder')?.value,
      ccn:this.form.get('ccn')?.value,
      expire:this.form.get('expire')?.value,
      cvv:this.form.get('cvv')?.value
    }
    this.listTarjetasCredito.push(tarjeta);
    this.toastr.success('La tarjeta fue registrada con éxito','Tarjeta Registrada')
    this.form.reset();
  }

  eliminarTarjeta(index:number){
    console.log(index);
    this.listTarjetasCredito.splice(index,1)
    this.toastr.error('La tarjeta fue eliminada con éxito','Tarketa Eliminada')
  }

}
