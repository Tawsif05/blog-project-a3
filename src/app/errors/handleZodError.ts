/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from '../interface/error';

export const handleZodError = (err: any): TGenericErrorResponse => {
  //   const issues = err.issues.map((issue: any) => {
  //     return {
  //       path: issue.path[issue.path.length - 1],
  //       message: issue.message,
  //     };
  //   });

  //   -->

  const issuesObject = err.issues.reduce(
    (acc: Record<string, any>, issue: any) => {
      const path = issue.path[issue.path.length - 1]; // Get the last element of the path
      acc[path] = {
        path,
        message: issue.message,
      };
      return acc;
    },
    {}
  );

  return {
    message: 'Validation error',
    statusCode: 400,
    error: issuesObject,
  };
};
