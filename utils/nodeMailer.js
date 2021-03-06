const nodeMailer=require("nodemailer");
const path=require('path')
const sendMail=async(options)=>{

    const transport=nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:process.env.emailId,
            pass:process.env.password
        }
        })
        const output = `
        <h2>Dear <b>${options.name}</b></h2>
        <p> ${options.message}</p>
     
        `;
        const mailOption={
            from:`MasterMind Support Team <sanjeetkumar935421@gmail.com>`,
            to:options.email,
            subject:options.subject,
            generateTextFromHTML: true,
            html:output,
            attachments: [{
                filename: "c-logo22.png",
                path: path.join(__dirname,'../uploads/c-logo22.png'),

            }]
        }
        await transport.sendMail(mailOption)
}

module.exports=sendMail;


