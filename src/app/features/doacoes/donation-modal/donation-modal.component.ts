import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.scss'],
})
export class DonationModalComponent implements OnInit {
  public donationForm: FormGroup = new FormGroup({});

  public categories: any = [];

  public turnoOptions: string[] = ['Manhã', 'Tarde', 'Noite'];

  donator = {
    id: 1,
    nome: 'João Felipe',
    telefone: '61333333333',
    email: 'joaof@gmail.com',
    documento: '73317403349',
    habilidade: 'Comer e jogar bola.',
    dtNascimento: '1996-07-27',
    tipoEntidade: 'Pessoa Física',
    escolaridade: 'Superior Cursando',
    endereco: {
      id: 1,
      logradouro: 'Rua Principal, s/n',
      cep: '72610000',
      cidade: 'Brasília',
      estado: 'Brasília',
      complemento: null,
      numero: null,
    },
    doacoes: [],
    user: {
      id: 2,
      nomeCompleto: 'Gabriel',
      email: 'gabriel',
      phoneNumber: '61333333333',
      userRoles: [],
    },
  };

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

  public formIsReady = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private donationService: DonationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('Data Modal: ', this.data);

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
      preco: new FormControl('', this.fieldIsRequired(category.nome, 'preco')),
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
        console.log('Complete');
      },
    });
  }

  send(): void {
    // this.spinner.show();

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
    };

    console.log('Doação: ', donation);

    this.donationService
      .createDonation([donation])
      .subscribe({
        next: () => {
          this.toastr.success('Doação adicionada com sucesso');
          // this.donations.clear();
        },
        error: () => {
          this.toastr.error('Não foi possível adicionar a doação');
        },
      })
      .add(() => this.spinner.hide());
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
