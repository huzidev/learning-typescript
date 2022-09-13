import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

interface MailParams {
  to: string
  msg: string
  subject: string
}

interface MailParamSub {
  to: string
  code: string
}

class MailService {
  private static async sendMail({ to, subject, msg }: MailParams) {
    await Mail.send((message) => {
      message.from(Env.get('SMTP_FROM')).to(to).subject(subject).html(msg)
    })
  }

  public static async sendEmailVerificationCode({ to, code }: MailParamSub) {
    await MailService.sendMail({
      to,
      subject: 'Email verification code',
      msg: `Your email verification code is:<br /><br /><b>${code}</b><br /><br />This code will expire in 2 hours`,
    })
  }

  public static async sendResetPasswordCode({ to, code }: MailParamSub) {
    await MailService.sendMail({
      to,
      subject: 'Reset password code',
      msg: `Your reset password code is:<br /><br /><b>${code}</b><br />This code will expire in 2 hours`,
    })
  }
}

export default MailService
