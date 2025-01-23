import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { adminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  await adminService.blockUser(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  await adminService.deleteBlog(blogId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
