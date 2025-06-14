"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formResponse = void 0;
const httpStatusCodes_1 = require("./httpStatusCodes");
const formResponse = (code, data) => {
    return {
        status_code: code,
        flag: httpStatusCodes_1.httpStatusCodes[code]?.flag,
        message: httpStatusCodes_1.httpStatusCodes[code]?.message,
        data: data,
    };
};
exports.formResponse = formResponse;
