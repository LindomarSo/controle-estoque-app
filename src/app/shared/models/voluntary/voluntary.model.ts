import { Address } from "./address.model";
import { User } from '../user/user.model';
import { Donation } from "./donation.model";

export interface Voluntary {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  documento: string;
  habilidade: string;
  dtNascimento: string;
  tipoEntidade: string;
  escolaridade: string;
  endereco: Address;
  doacoes: Donation[];
  user: User;
}
