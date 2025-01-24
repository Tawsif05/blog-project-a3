"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../User/user.model"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // checking User
    const checkUserId = yield user_model_1.default.findById(userId);
    if (!checkUserId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'user not found');
    }
    else if (checkUserId.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User already blocked');
    }
    // update the blog
    const updateBlog = yield user_model_1.default.findByIdAndUpdate(userId, { isBlocked: true }, {
        new: true,
    });
    if (!updateBlog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'user not blocked! try again later');
    }
});
const deleteBlog = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // checking the blog id
    const checkBlogId = yield blog_model_1.default.findById(userId);
    if (!checkBlogId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    else if (checkBlogId.isPublished === false) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Blog already deleted');
    }
    // update the blog
    const updateBlog = yield blog_model_1.default.findByIdAndUpdate(userId, { isPublished: false }, {
        new: true,
    });
    // if blog not updated
    if (!updateBlog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Blog not deleted');
    }
});
exports.adminService = {
    blockUser,
    deleteBlog,
};
