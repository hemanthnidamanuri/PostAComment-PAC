import TodoRoutes from "../api/todo/route/todo-route";
import writeapostRoute from "../api/writeapost/routes/writeapost-route";

export default class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     writeapostRoute.init(router);

     app.use("/", router);
   }
}
