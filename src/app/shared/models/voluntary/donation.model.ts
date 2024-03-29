import { UserInfo } from "../user/user.info";
import { EntidadeInfo } from "./voluntary.info";

export interface Donation {
  id: number;
  materialDoado: string;
  preco: number;
  quantidade: number;
  destino: string;
  dtEntrada: string;
  dtRetirada: string;
  retiradaPor: string;
  disponibilidade: string;
  habilidade: string;
  unidade: string;
  entidadeId: number;
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  turno: string;
  entidade: EntidadeInfo;
  user: UserInfo;
}
