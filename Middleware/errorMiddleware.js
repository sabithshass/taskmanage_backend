import mongoose from "mongoose";
export const handleError = (error) => {
 
    if (error instanceof mongoose.Error.ValidationError) {
        const keys = Object.keys(error.errors);
        error.message = error.errors[keys[keys.length - 1]].message;
        return {
          code: 400,
          error: error.message,
        }
      }

      return {
        code: error.code ?? 500,
        error: error?.message ?? 'Internal server error',
      }


}
