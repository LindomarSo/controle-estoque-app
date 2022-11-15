import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-voluntary',
  templateUrl: './create-voluntary.component.html',
  styleUrls: ['./create-voluntary.component.scss']
})
export class CreateVoluntaryComponent implements OnInit {

  form!: FormGroup;
  typePersson!: string;
  isPersonFisic:boolean = true;
  voluntaryId!: number;
  method = 'post';
  isEditMode = true;
  documentType = 'CPF';
  name = 'Nome Completo';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  get enderecos() {
    return this.form.get('endereco') as FormGroup;
  }

  ngOnInit(): void {
    this.typePersson = this.route.snapshot.params['pessoa'];
    console.log(this.typePersson);
    this.getTypePerson();
    this.validator();
  }

  validator(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      dtNascimento: [''],
      tipoEntidade: [''],
      escolaridade: [''],
      endereco: this.ValidateAddress(),
      habilidade: ['']
    });
  }

  ValidateAddress(): FormGroup {
    return this.formBuilder.group({
      logradouro: ['', Validators.required],
      cEP: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: [''],
      numero: [''],
    })
  }

  resetForm(): void {
    this.form.reset();
  }

  send(): void {
    if (!this.form.invalid)
      console.log(this.form.value)
  }

  getTypePerson(): void{
    if(this.typePersson === 'juridica'){
      this.isPersonFisic =  false;
      this.documentType = 'CNPJ';
      this.name = 'Nome da Empresa';
    }
  }
}
