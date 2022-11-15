import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  @Input('voluntaryId') voluntaryId!: number;
  form!: FormGroup;
  donation!: Donation;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  get donations(): FormArray {
    return this.form.get('donations') as FormArray;
  }

  validation() {
    this.form = this.formBuilder.group({
      donations: this.formBuilder.array([])
    });
  }

  createDonation(donation: Donation): FormGroup {
    return this.formBuilder.group({
      id: [donation.id],
      materialDoado: [donation.materialDoado],
      preco: [donation.preco],
      quantidade: [donation.quantidade],
      destino: [donation.destino],
      dtEntrada: [donation.dtEntrada],
      unidade: [donation.unidade]
    });
  }

  addDonation(): void {
    this.donations.push(this.createDonation({id: 0} as Donation))
  }

  send(): void {

  }

  resetForm(): void {

  }

  cancel(index: number): void{
    this.donations.removeAt(index);
  }
}
