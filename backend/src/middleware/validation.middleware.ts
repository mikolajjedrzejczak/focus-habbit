import type { NextFunction, Request, Response } from 'express';
import { type ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Błąd walidacji!',
          errors: err.errors,
        });
      }

      console.error(err);
      return res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
    }
  };
