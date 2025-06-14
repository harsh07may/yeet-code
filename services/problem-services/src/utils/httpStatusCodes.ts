export const httpStatusCodes:Record<number, { code: number; flag: string; message: string }> = {
    200: {
      code: 200,
      flag: "OK",
      message: "Process Successful",
    },
    204: {
      code: 204,
      flag: "Not created",
      message: "Could not create",
    },
  
    400: {
      code: 400,
      flag: "Bad Request",
      message: "The Server could not process the request due to bad syntax",
    },
    401: {
      code: 401,
      flag: "Unauthorized",
      message: "Unauthorized access",
    },
    403: {
      code: 403,
      flag: "Forbidden",
      message: "forbidden",
    },
    404: {
      code: 404,
      flag: "Not found",
      message: "Not found",
    },
    412: {
      code: 412,
      flag: "Pre-condition failed",
      message: "Pre-condition failed",
    },
    498: {
      code: 498,
      flag: "Invalid Token",
      message: "Invalid Token",
    },
    500: {
      code: 500,
      flag: "Internal Server error",
      message: "An Internal Server error occured",
    },
  };
  