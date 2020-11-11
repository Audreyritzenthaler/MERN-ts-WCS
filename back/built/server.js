"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cors_1 = __importDefault(require("cors"));
const wilders_1 = __importDefault(require("./controllers/wilders"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/wilderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
})
    .then(() => console.log('Connected to db !'))
    .catch((err) => console.log(err));
app.get('/api/wilder', express_async_handler_1.default(wilders_1.default.read));
app.post('/api/wilder', express_async_handler_1.default(wilders_1.default.create));
app.put('/api/wilder', express_async_handler_1.default(wilders_1.default.update));
app.delete('/api/wilder', express_async_handler_1.default(wilders_1.default.delete));
app.get('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Wrong address !' });
});
app.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});
//# sourceMappingURL=server.js.map