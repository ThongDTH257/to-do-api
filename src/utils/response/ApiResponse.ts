class ApiResponse<T> {
    statusCode?: number;
    message?: string;
    data: T | null;
    error: string | null;
  
    private constructor(statusCode: number, message: string, data?: T, error?: string) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data ?? null;
      this.error = error ?? null;
    }
  
    static success<T>(statusCode: number, message: string, data?: T): ApiResponse<T> {
      return new ApiResponse(statusCode, message, data);
    }
  
    static error(statusCode: number, message: string, error?: string): ApiResponse<null> {
      return new ApiResponse(statusCode, message, null, error);
    }
  }
  
  export default ApiResponse;
  