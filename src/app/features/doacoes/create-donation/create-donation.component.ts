import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  @Input('voluntaryId') voluntaryId!: number;
  @Output('changeDonation') changeDonation: EventEmitter<Donation[]> = new EventEmitter();
  form!: FormGroup;
  donation!: Donation;
  unities!: string[];
  indices: number[] = [];
  indice: number = 0;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private donationService: DonationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.validation();
    this.getUnities();
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
      entidadeId: [this.voluntaryId],
      unidade: [donation.unidade]
    });
  }

  addDonation(): void {
    this.donations.push(this.createDonation({ id: 0 } as Donation))
  }

  send(): void {
    // console.log(this.donations.value);
    // return ;
    this.spinner.show();

    this.donationService.createDonation(this.donations.value).subscribe({
      next: (donation: Donation[]) => {
        this.changeDonation.emit(donation);
        this.toastr.success('Doação adicionada com sucesso');
        this.donations.clear();
      },
      error: () => {
        this.toastr.error('Não foi possível adicionar a doação');
      }
    }).add(() => this.spinner.hide());
  }

  getUnities(): void {
    this.spinner.show();

    this.donationService.getUnties().subscribe({
      next: (unities: string[]) => {
        this.unities = unities;
      },
      error: () => {
        this.toastr.error('Não carregar unidades');
      }
    }).add(() => this.spinner.hide());
  }

  resetForm(): void {
    this.donations.reset();
  }

  cancel(index: number): void {
    this.donations.removeAt(index);
  }
}
