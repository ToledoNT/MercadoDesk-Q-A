import { Request, Response } from "express";
import { FindClientByEmail } from "../../use-cases/find-client-by-email";
import { DeleteUser } from "../../use-cases/user/delete-user-use-cases";

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const email = req.body?.email;
    if (!email) {
      res.status(400).json({ erro: "E-mail é obrigatório" });
      return;
    }
    const resultadoClienteAntigo = await new FindClientByEmail().execute(email);
    if (!resultadoClienteAntigo || !resultadoClienteAntigo.data || resultadoClienteAntigo.data.length === 0) {
      res.status(404).json({ erro: "Cliente não encontrado" });
      return;
    }
    const id = resultadoClienteAntigo.data[0].id;
    const deleteUser = await new DeleteUser().execute(id);
    if (deleteUser) {
      res.status(200).json({ mensagem: "Usuário deletado com sucesso", dados: deleteUser });
      return;
    }
      res.status(500).json({ erro: "Erro ao deletar usuário", detalhes: deleteUser });
  }
}
