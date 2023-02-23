import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.scss'],
})
export class DonationModalComponent implements OnInit {
  public donationForm: FormGroup = new FormGroup({});
  public categories: any[] = [];
  public turnoOptions: string[] = ['Manhã', 'Tarde', 'Noite'];
  public formIsReady = false;
  public donationToLoad: any;
  public unities: string[] = [];
  public isEditing = false;
  public isSending = false;
  public formFieldsByCategory: any = {
    serviços: [
      'descricao',
      'preco',
      'destino',
      'dtEntrada',
      'unidade',
      'dias',
      'turno',
      'doador',
      'categoria',
    ],
    materiais: [
      'descricao',
      'preco',
      'destino',
      'dtEntrada',
      'unidade',
      'quantidade',
      'doador',
      'categoria',
    ],
    dinheiro: [
      'descricao',
      'preco',
      'destino',
      'dtEntrada',
      'unidade',
      'doador',
      'categoria',
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DonationModalComponent>,
    private donationService: DonationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.donationToLoad = this.data.donate;
    this.isEditing = !!this.donationToLoad;

    this.loadUnities();
    this.loadCategories();
  }

  mountDonationFields(category: Category) {
    const daysOfWeek = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

    let donator = this.data.donator;

    let weekFormControls: any = {};
    daysOfWeek.forEach((day) => {
      weekFormControls[day] = new FormControl(
        false,
        this.fieldIsRequired(category.nome, 'dias')
      );
    });

    this.donationForm = new FormGroup({
      id: new FormControl(0),
      materialDoado: new FormControl(
        '',
        this.fieldIsRequired(category.nome, 'descricao')
      ),
      preco: new FormControl(0),
      quantidade: new FormControl(
        '',
        this.fieldIsRequired(category.nome, 'quantidade')
      ),
      destino: new FormControl(''),
      dtEntrada: new FormControl(
        '',
        this.fieldIsRequired(category.nome, 'dtEntrada')
      ),
      doador: new FormControl(
        donator,
        this.fieldIsRequired(category.nome, 'doador')
      ),
      unidade: new FormControl(
        '',
        this.fieldIsRequired(category.nome, 'unidade')
      ),
      turno: new FormControl(
        '',
        this.fieldIsRequired(category.nome, 'periodo')
      ),
      categoria: new FormControl(
        category,
        this.fieldIsRequired(category.nome, 'categoria')
      ),
      ...weekFormControls,
    });

    this.formIsReady = true;
  }

  showField(fieldName: string) {
    let selectedCategoryName =
      this.donationForm.controls['categoria'].value['nome'];

    return (
      this.formFieldsByCategory[selectedCategoryName.toLowerCase()].findIndex(
        (field: any) => field === fieldName
      ) != -1
    );
  }

  fieldIsRequired(categoryName: any, fieldName: any) {
    return this.formFieldsByCategory[categoryName.toLowerCase()].findIndex(
      (field: any) => field === fieldName
    ) != -1
      ? [Validators.required]
      : [Validators.nullValidator];
  }

  loadCategories() {
    this.donationService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        let initialCategory = this.categories[0];
        this.mountDonationFields(initialCategory);
      },
      error: () => {
        this.toastr.error('Erro ao carregar categorias.', 'Erro');
      },
      complete: () => {
        if (this.donationToLoad) {
          this.loadDonation(this.donationToLoad);
        }
      },
    });
  }

  loadDonation(donation: any) {
    this.donationForm.controls['categoria'].disable();
    this.donationForm.controls['quantidade'].disable();

    let indexCategory = this.categories.findIndex(
      (category) => category.nome === donation.categoria.nome
    );

    this.donationForm.patchValue(donation);

    this.donationForm.controls['categoria'].setValue(
      this.categories[indexCategory]
    );
  }

  loadUnities(): void {
    this.donationService.getUnties().subscribe({
      next: (unities: string[]) => {
        this.unities = unities;
      },
      error: () => {
        this.toastr.error('Erro ao carregar unidades', 'Erro');
      },
    });
  }

  send(): void {
    this.spinner.show();
    this.isSending = true;

    let formValue = this.donationForm.getRawValue();

    let donation = {
      id: formValue['id'],
      materialDoado: formValue['materialDoado'],
      preco: formValue['preco'],
      quantidade: formValue['quantidade'],
      destino: formValue['destino'],
      dtEntrada: formValue['dtEntrada'],
      unidade: formValue['unidade'],
      entidadeId: formValue['doador']['id'],
      segunda: formValue['segunda'],
      terca: formValue['terca'],
      quarta: formValue['quarta'],
      quinta: formValue['quinta'],
      sexta: formValue['sexta'],
      turno: formValue['turno'],
      categoriaId: formValue['categoria']['id'],
      estoque: this.donationToLoad
        ? this.donationToLoad.quantidade
        : formValue['quantidade'],
    };

    let service = this.isEditing
      ? this.donationService.updateDonation(donation)
      : this.donationService.createDonation([donation]);

    console.log('Doação: ', donation);

    service
      .subscribe({
        next: () => {
          this.toastr.success(
            `Doação ${this.isEditing ? 'editada' : 'cadastrada'} com sucesso`
          );
          // this.donations.clear();
        },
        error: () => {
          this.toastr.error(
            `Não foi possível ${
              this.isEditing ? 'editar' : 'cadastrar'
            } a doação`
          );
        },
        complete: () => {
          this.dialogRef.close();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
      })
      .add(() => {
        this.spinner.hide();
        this.isSending = false;
      });
  }

  resetForm() {
    let actualCategorySelected = this.donationForm.controls['categoria'].value;
    this.mountDonationFields(actualCategorySelected);
  }
}

export interface Category {
  id: number;
  nome: string;
}
