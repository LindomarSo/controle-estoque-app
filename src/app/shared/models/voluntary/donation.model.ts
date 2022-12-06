import { UserInfo } from "../user.info";
import { EntidadeInfo } from "./voluntary.info";

export interface Donation {
  id: number;
  materialDoado: string;
  preco: string;
  quantidade: number;
  destino: string;
  dtEntrada: string;
  dtRetirada: string;
  retiradaPor: string;
  disponibilidade: string;
  habilidade: string;
  unidade: string;
  entidadeId: number;
  entidade: EntidadeInfo;
  user: UserInfo;
}
