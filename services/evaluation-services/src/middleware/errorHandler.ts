import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** ✅ Handle Zod validation errors */
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors.map((error) => ({
        fieldName: error.path.length === 0 ? undefined : error.path.join("."),
        message: error.message,
      })),
    });
  }

  /** ✅ Handle Prisma Client Known Request Errors */
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let errorMessage = "Database error";
    let statusCode = 400;

    switch (err.code) {
      case "P2000":
        errorMessage = "Input value is too long for the database field.";
        break;
      case "P2001":
        errorMessage = "The requested record does not exist.";
        statusCode = 404;
        break;
      case "P2002":
        errorMessage = "Unique constraint failed: Duplicate entry detected.";
        break;
      case "P2003":
        errorMessage = "Foreign key constraint failed: Invalid reference.";
        break;
      case "P2004":
        errorMessage = "A database constraint was violated.";
        break;
      case "P2005":
        errorMessage = "Invalid value provided for a database field.";
        break;
      case "P2006":
        errorMessage = "Mismatched data type for a field.";
        break;
      case "P2007":
        errorMessage = "Validation failed on a database field.";
        break;
      case "P2008":
        errorMessage = "Failed to parse the query.";
        break;
      case "P2009":
        errorMessage = "Query parameter validation failed.";
        break;
      case "P2010":
        errorMessage = "Raw database error occurred.";
        break;
      case "P2011":
        errorMessage = "Null constraint violation: Required field is missing.";
        break;
      case "P2012":
        errorMessage = "Missing required fields in the database.";
        break;
      case "P2013":
        errorMessage = "Missing arguments in the database query.";
        break;
      case "P2014":
        errorMessage =
          "Related record deletion restricted: Cannot delete this record.";
        break;
      case "P2015":
        errorMessage = "Record not found.";
        statusCode = 404;
        break;
      case "P2016":
        errorMessage = "Query validation error: Invalid query structure.";
        break;
      case "P2017":
        errorMessage = "Invalid relation between records.";
        break;
      case "P2018":
        errorMessage = "Invalid record in the database.";
        break;
      case "P2019":
        errorMessage = "Input value conflicts with database constraints.";
        break;
      case "P2020":
        errorMessage = "Invalid value for an enum field.";
        break;
      case "P2021":
        errorMessage = "Database table not found.";
        break;
      case "P2022":
        errorMessage = "Column not found in the database.";
        break;
      case "P2023":
        errorMessage = "Inconsistent data found.";
        break;
      case "P2024":
        errorMessage = "Database transaction failed.";
        break;
      case "P2025":
        errorMessage = "Record to delete does not exist.";
        statusCode = 404;
        break;
      case "P2026":
        errorMessage = "Database query timeout.";
        break;
      default:
        errorMessage = `Unexpected database error: ${err.message}`;
        break;
    }

    return res.status(statusCode).json({
      status: "error",
      message: errorMessage,
    });
  }

  /** ✅ Handle Prisma Client Validation Errors */
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data format provided.",
      details: err.message,
    });
  }

  /** ✅ Handle Prisma Client Initialization Errors */
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      status: "error",
      message:
        "Database connection failed. Please check your database configuration.",
      details: err.message,
    });
  }

  /** ✅ Handle Prisma Client Rust Panic Errors */
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected Prisma error. Try restarting the server.",
      details: err.message,
    });
  }

  /** ✅ Handle Custom App Errors */
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  /** ✅ Handle Unexpected Errors */
  console.error("Unexpected error:", err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
