import { apiURL } from "@/utils/api";
import axios, { AxiosResponse } from "axios";

interface LoginForm {
  username: string;
  password: string;
}

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

export class AuthService {
  async signin(username: string, password: string): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${apiURL}/signin`, {
        username,
        password,
      });
      return response;
    } catch (error: any) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  }

  async signup(userData: SignupForm): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${apiURL}/signup`, userData);
      return response;
    } catch (error: any) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  }

  validateLogin(loginForm: LoginForm): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!loginForm.username) {
      errors.username = ["Username is required"];
    }
    if (!loginForm.password) {
      errors.password = ["Password is required"];
    }
    return errors;
  }

  validateSignup(signupForm: SignupForm): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!signupForm.username) {
      errors.username = ["Username is required"];
    }
    if (!signupForm.email) {
      errors.email = ["Email address is required"];
    }
    if (!signupForm.password) {
      errors.password = ["Password is required"];
    } else if (signupForm.password.length < 8) {
      errors.password = ["Password must be at least 8 characters long"];
    }
    return errors;
  }
}
