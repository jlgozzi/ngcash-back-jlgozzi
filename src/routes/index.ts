import { Express, Router } from "express";
import getUserTransactionsController from "../controllers/getUserTransactions.controller";
import transactionController from "../controllers/transaction.controller";
import userLoginController from "../controllers/userLogin.controller";
import userRegisterController from "../controllers/userRegister.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyUserExist.middleware";
import { userRegisterScheama } from "../schemas";
import { validateSerializer } from "../serializers/validate.serializer";

export const appRoutes = (app: Express) => {
  const routes = Router();

  routes.post(
    "/user",
    validateSerializer(userRegisterScheama),
    userRegisterController
  );
  routes.post("/login", userLoginController);
  routes.patch(
    "/transaction/:username",
    verifyAuthTokenMiddleware,
    transactionController
  );
  routes.get(
    "/user/transactions",
    verifyAuthTokenMiddleware,
    getUserTransactionsController
  );

  app.use(routes);
};
