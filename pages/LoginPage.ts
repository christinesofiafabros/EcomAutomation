
import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    email = this.page.getByTestId('login-email-input');
    password = this.page.getByTestId('login-password-input');
    submitBtn = this.page.getByTestId('login-submit-btn');
    showPassBtn = this.page.getByTestId('login-password-toggle');
    rememberMe = this.page.getByTestId('login-remember-me');

    async goto() {
        await this.page.goto('/');
    }

    async loginCredentials(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
    }

    async showPassword() {
        await this.showPassBtn.click();
    }

    async checkRememberMe() {
        await this.rememberMe.check();
    }

    async login() {
        await this.submitBtn.click();
    }

    async loginUser(email: string, password: string) {
        await this.page.goto('/');
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submitBtn.click();
    }

}