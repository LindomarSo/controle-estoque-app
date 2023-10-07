import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';

@Component({
  selector: 'app-create-voluntary',
  templateUrl: './create-voluntary.component.html',
  styleUrls: ['./create-voluntary.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { },
    },
  ],
})
export class CreateVoluntaryComponent implements OnInit {

  form!: FormGroup;
  types!: string[];
  schooling!: any[];
  typePerson!: string;
  isPersonFisic: boolean = true;
  voluntaryId!: number;
  method = 'post';
  isEditMode = true;
  documentType = 'CPF';
  documentMask = 'CPF';
  name = 'Nome Completo';
  isLoading = true;

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(private voluntaryService: VoluntaryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {  }

  get enderecos() {
    return this.form.get('endereco') as FormGroup;
  }

  ngOnInit(): void {
    this.validator();
    this.typePerson = this.route.snapshot.params['pessoa'];
    this.getPersonType();
    this.getSchooling();
  }

  validator(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      dtNascimento: [null],
      tipoEntidade: [],
      escolaridade: [],
      endereco: this.ValidateAddress(),
      habilidade: []
    });
  }

  ValidateAddress(): FormGroup {
    return this.formBuilder.group({
      logradouro: ['', Validators.required],
      cEP: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: [],
      numero: [],
    })
  }

  resetForm(): void {
    this.form.reset();
  }

  send(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.voluntaryService.post(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Voluntário adicionado com sucesso!');
          this.router.navigateByUrl('/voluntarios');
        },
        error: () => {
          this.toastr.error('Erro ao adicionar voluntário');
        }
      }).add(() => this.isLoading = false);
    }
  }

  getSchooling(): void {
    this.voluntaryService.getSchooling().subscribe({
      next: (response: any) => {
        this.schooling = response;
      },
      error: () => {
        this.toastr.error('Não foi possível carregar escolaridade');
      }
    });
  }

  getPersonType(): void {
    this.voluntaryService.getPersonType().subscribe({
      next: (response: any) => {
        this.types = response;
        this.getTypePerson();
      },
      error: () => {
        this.toastr.error('Não foi possível carregar tipos');
      }
    }).add(() => this.isLoading = false);
  }

  getTypePerson(): void {
    let type = '';

    if (this.typePerson === 'juridica') {
      this.isPersonFisic = false;
      this.documentType = 'CNPJ';
      this.name = 'Nome da Empresa';
      this.documentMask = '00.000.000/0000-00';
      this.types.forEach(tipo => {
        if (tipo === 'Pessoa Jurídica') {
          type = tipo;
        }
      });
    } else {
      type = 'Pessoa Física'
      this.documentMask = '000.000.000-00';
    }
    this.form.controls['tipoEntidade'].setValue(type);
  }
}
