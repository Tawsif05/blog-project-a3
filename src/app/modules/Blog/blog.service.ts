import { StatusCodes } from 'http-status-codes';
import { TBlog, TBlogReturn } from './blog.interface';
import Blog from './blog.model';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/queryBuilder';

const createBlog = async (
  authorPayload: JwtPayload,
  payload: TBlog
): Promise<TBlogReturn> => {
  const author = authorPayload._id;
  const createBlog = await Blog.create({ ...payload, author });
  const result = await createBlog.populate('author');
  return result;
};
const updateBlog = async (
  blogId: string,
  payload: TBlog,
  loggedUser: JwtPayload
) => {
  const checkBlogId = await Blog.findById(blogId).populate<{
    author: { email: string; role: string };
  }>('author');

  if (!checkBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  } else if (checkBlogId?.author?.email !== loggedUser.email) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to update this blog'
    );
  } else if (checkBlogId?.isPublished === false) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You can not updated this blog.Blog already deleted'
    );
  }

  const updateBlog = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
  });

  if (!updateBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not updated');
  }
  const result = await updateBlog.populate('author');

  return result;
};
const deleteBlog = async (blogId: string, loggedUser: JwtPayload) => {
  const checkBlogId = await Blog.findById(blogId).populate<{
    author: { email: string; role: string };
  }>('author');

  if (!checkBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  } else if (checkBlogId?.author?.email !== loggedUser.email) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this blog'
    );
  } else if (checkBlogId?.isPublished === false) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog already deleted');
  }

  await Blog.findByIdAndUpdate(
    blogId,
    { isPublished: false },
    {
      new: true,
    }
  );
};
const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content '];
  const blogs = new QueryBuilder(
    Blog.find({ isPublished: true }).populate('author'),
    query
  )
    .search(searchableFields)
    .filter()
    .sort();
  const result = await blogs.modelQuery
    .select('_id title content author')
    .lean();

  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
