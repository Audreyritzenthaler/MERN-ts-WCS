"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wilder_1 = __importDefault(require("../models/Wilder"));
exports.default = {
    create: async (req, res) => {
        await Wilder_1.default.init();
        const wilder = new Wilder_1.default(req.body);
        const result = await wilder.save();
        res.json({ success: true, result });
    },
    read: async (req, res) => {
        const result = await Wilder_1.default.find();
        res.json({ success: true, result });
    },
    update: async (req, res) => {
        const result = await Wilder_1.default.updateOne({ _id: req.body._id }, req.body);
        res.json(result);
    },
    delete: async (req, res) => {
        const result = await Wilder_1.default.deleteOne({ _id: req.body._id });
        res.json({ success: true, result });
    },
};
//# sourceMappingURL=wilders.js.map