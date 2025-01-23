import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const error = Object.values(err.errors).reduce(
    (
      acc: Record<string, { path: string; message: string }>,
      val: mongoose.Error.ValidatorError | mongoose.Error.CastError
    ) => {
      if (val?.path) {
        acc[val.path] = {
          path: val.path,
          message: val.message,
        };
      }
      return acc;
    },
    {}
  );

  const statusCode = StatusCodes.BAD_REQUEST;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;
