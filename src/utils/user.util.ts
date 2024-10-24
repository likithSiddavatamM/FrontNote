import nodemailer from 'nodemailer'

class Transporter{

    private  Data = {
        from:process.env.SECRET_MAIL_ID,
        to:'',
        subject:`Use this Reset Password Token for login`,
        text: ``
        }

    public Transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SECRET_MAIL_ID,
            pass:process.env.SECRET_MAIL_PASSWORD
        }
    })
    
    public sendMail = async(ForgetPasswordAccessToken, email)=>{
        this.Data.to=email;
        this.Data.text=`Your reset password token is '${ForgetPasswordAccessToken}'`
        return await this.Transporter.sendMail(this.Data)
    }

}

export default new Transporter()