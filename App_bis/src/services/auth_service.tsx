import { apiKey, apiURL } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

export interface SigninFormProps {
  username: string;
  password: string;
}

export interface SignupFormProps {
  username: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  other?: string;
}

export class AuthService {
  async signin(userData: SigninFormProps): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${apiURL}/signin`, userData, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  }

  async signup(userData: SignupFormProps): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${apiURL}/signup`, userData, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  }

  async resetPassword (userData : SigninFormProps): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${apiURL}/reset-password`, userData, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      return response;
    } catch (error:any) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  }

  validateLogin(loginForm: SigninFormProps): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!loginForm.username) {
      errors.username = "Username is required";
    }
    if (!loginForm.password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  validateResetPassword(loginForm: SigninFormProps): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!loginForm.username) {
      errors.email = "Email is required";
    }
    if (!loginForm.password) {
      errors.password = "Password is required";
    }
    return errors;
  }



  validateSignup(signupForm: SignupFormProps): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!signupForm.username) {
      errors.username = "Username is required";
    }
    if (!signupForm.email) {
      errors.email = "Email address is required";
    }
    if (!signupForm.password) {
      errors.password = "Password is required";
    } else if (signupForm.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  }
}
