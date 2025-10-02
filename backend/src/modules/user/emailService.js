import nodemailer from 'nodemailer';
import { logger } from '../../core/logger.js';
import config from '../../config/index.js';


class EmailService {
    constructor() {
        // Настройка транспорта для отправки email
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru', // host используем mail.ru
            port: 465,
            secure: true, // использовать SSL
            auth: {
            user: process.env.EMAIL_USER, //логин от почты
            pass: process.env.EMAIL_PASS //пароль от почты (пароль специальный)
            }
        });
    }

    /**
     * Отправляет письмо с подтверждением emailб
     * @param {string} email - Email пользователя
     * @param {string} token - Токен подтверждения
     * @param {string} username - Имя пользователя
     */
    async sendConfirmationEmail(email, token, username) {
        try {
            const confirmationLink = `${config.frontendUrl || 'http://localhost:5173'}/confirm-email?token=${token}`;
            
            const mailOptions = {
                from: process.env.EMAIL_USER || 'your-email@gmail.com',
                to: email,
                subject: 'Подтверждение регистрации',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #0C2461;">Добро пожаловать, ${username}!</h2>
                        <p>Спасибо за регистрацию в нашем приложении.</p>
                        <p>Для завершения регистрации, пожалуйста, подтвердите ваш email, перейдя по ссылке:</p>
                        <a href="${confirmationLink}" 
                            style="display: inline-block; padding: 12px 24px; background-color: #0C2461; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
                            Подтвердить email
                        </a>
                        <p>Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:</p>
                        <p style="word-break: break-all; color: #666;">${confirmationLink}</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            Если вы не регистрировались в нашем приложении, просто проигнорируйте это письмо.
                        </p>
                    </div>
                `
            };

            await this.transporter.sendMail(mailOptions);
            logger.info(`Confirmation email sent to: ${email}`);
            return true;
        } catch (error) {
            logger.error(`Error sending confirmation email to ${email}:`, error);
            throw new Error('Не удалось отправить письмо подтверждения');
        }
    }

    /**
     * Отправляет письмо с восстановлением пароля
     * @param {string} email - Email пользователя
     * @param {string} token - Токен восстановления
     * @param {string} username - Имя пользователя
     */
    async sendPasswordResetEmail(email, token, username) {
        try {
            const resetLink = `${config.frontendUrl || 'http://localhost:5173'}/reset-password?token=${token}`;
            
            const mailOptions = {
                from: process.env.EMAIL_USER || 'your-email@gmail.com',
                to: email,
                subject: 'Восстановление пароля',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #0C2461;">Восстановление пароля</h2>
                        <p>Привет, ${username}!</p>
                        <p>Вы запросили восстановление пароля для вашего аккаунта.</p>
                        <p>Для создания нового пароля, перейдите по ссылке:</p>
                        <a href="${resetLink}" 
                            style="display: inline-block; padding: 12px 24px; background-color: #0C2461; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
                            Восстановить пароль
                        </a>
                        <p>Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:</p>
                        <p style="word-break: break-all; color: #666;">${resetLink}</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
                        </p>
                    </div>
                `
            };

            await this.transporter.sendMail(mailOptions);
            logger.info(`Password reset email sent to: ${email}`);
            return true;
        } catch (error) {
            logger.error(`Error sending password reset email to ${email}:`, error);
            throw new Error('Не удалось отправить письмо восстановления пароля');
        }
    }
}

const emailService = new EmailService();
export { emailService };
