var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Users = require("../models/Users");
module.exports.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userData = {
            name: "yves morel",
            email: "hackerYves842@gmail.com",
            password: "1234567",
        };
        const user = yield Users.create(userData);
        res.status(200).json({ message: "user created", user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//# sourceMappingURL=userController.js.map