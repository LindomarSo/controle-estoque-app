import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account/account.service';
import { RoleService } from 'src/app/core/services/account/role.service';
import { Role } from 'src/app/shared/models/user/role';
import { User } from 'src/app/shared/models/user/user.model';
import { ValidatorsField } from 'src/app/utils/validatefield/ValidatorsField';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  roles: Role[] = [];
  perfil: any;
  userId = 0;
  method = 'post';

  private formOptions: AbstractControlOptions = {
    validators: ValidatorsField.MustMatch('password', 'confirmPassword')
  }
  public registerUserForm: UntypedFormGroup = new UntypedFormGroup({
    nomeCompleto: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [
      Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
    password: new UntypedFormControl(''),
    confirmPassword: new UntypedFormControl(''),
    perfil: new UntypedFormControl('')
  }, this.formOptions);

  constructor(private accountService: AccountService,
    private toastr: ToastrService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    if(this.userId > 0)
      this.getUserById(this.userId);

    this.getRole();
  }

  resetForm() {
    this.registerUserForm.reset();
  }

  onSubmit() {
    if (this.registerUserForm.valid) {
      let service = this.method === 'post' ? 
              this.accountService.post(this.registerUserForm.value) : 
              this.accountService.put(this.registerUserForm.value);
      
      service.subscribe({
        next: () => {
          this.createProfile();
        },
        error: () => {
          this.toastr.error('Erro ao cadastrar um usuário!');
        }
      })
    }
  }

  getRole(): void {
    this.roleService.get().subscribe({
      next: (role: Role[]) => {
        this.roles = role;
      },
      error: () => {
        this.toastr.error('Erro ao carregar permissões');
      }
    })
  }

  createProfile(): void {
    let profile = new Role();
    profile.email = this.registerUserForm.value.email;
    profile.role = this.registerUserForm.value.perfil;
    profile.delete = false;

    this.roleService.update(profile).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
        this.toastr.success('Usuario cadastrado com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar perfil!');
      },
    })
  }

  getUserById(id: number): void {
    this.method = 'put';
    this.spinner.show();
    this.accountService.getUserById(id).subscribe({
      next: (user: User) => {
        this.registerUserForm.patchValue(user);
        this.perfil = user.userRoles[0].role.name;
      },
      error: () => {
        this.toastr.error('Erro ao carregar usuário');
      },
    }).add(() => this.spinner.hide());
  }
}
