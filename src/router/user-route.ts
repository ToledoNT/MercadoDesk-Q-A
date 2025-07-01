import express, { Router } from "express";
import { CreateUserController } from "../controller/user/create-user-controller";
import { UpdateClienteController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";
import { GetAllUsersController } from "../controller/user/get-users-controller";

const router: Router = express.Router();

const userController = new CreateUserController();
const updateClienteController = new UpdateClienteController();
const deleteUserController = new DeleteUserController(); 
const getAllUsersController = new GetAllUsersController();

router.post("/cliente/create", userController.handle.bind(userController));
router.put("/cliente/update", updateClienteController.handle.bind(updateClienteController));
router.delete("/cliente/delete", deleteUserController.handle.bind(deleteUserController));
router.get("/cliente/allusers", getAllUsersController.handle.bind(getAllUsersController));

export default router;