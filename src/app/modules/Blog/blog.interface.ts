/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
}

export interface TBlogReturn {
  title: string;
  content: string;
  author: Record<string, any> | undefined;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}
