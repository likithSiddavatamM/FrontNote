"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_route_1 = __importDefault(require("./user.route"));
const note_route_1 = __importDefault(require("./note.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openApi_json_1 = __importDefault(require("../../Swagger/openApi.json"));
/**c
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
    router.get('/', (req, res) => {
        res.json('Welcome');
    });
    router.use('/user', new user_route_1.default().getRoutes());
    router.use('/usernotes', new note_route_1.default().getRoutes());
    router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApi_json_1.default));
    return router;
};
exports.default = routes;
