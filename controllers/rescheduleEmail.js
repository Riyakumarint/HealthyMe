const nodemailer = require("nodemailer");

const rescheduleEmail = (email, patient_name,doc_name, prevDate,newDate) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: "studyearthuniverse@gmail.com",
      // pass: "Y}t{w<5wcHZ=",
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: "HealthyMe: Reschedule Appointment",
    html: `
    <div style="margin:0;padding:0;font-family:sans-serif;background-color: #F7F7F7;text-align: center; ">

    <div style="max-width: 500px; margin: auto;border-top: 60px solid #F7F7F7; padding: 50px 40px; font-size: 110%; background-color:white;color: #5D5C5C;">
    

    <h2 style="font-family: comic sans ms,sans-serif; font-size: 35px;color:crimson;"><strong>HealthyMe</strong></h2>

    <hr>

    <p style="font-size: 20px;"> Hi, ${patient_name}</p>
    
    <p style="font-size: 20px;">Your Appointment on ${prevDate} with ${doc_name} is rescheduled on ${newDate}.
    Please check your appointment details on the HealthyMe.
    
    </p>
    
    <p style="font-size: 20px;color: #5D5C5C;"> Sorry, for the inconvience.</p>
    
    
</div>

    <div style="max-width: 500px; margin: auto;  padding: 50px 40px; font-size: 80%; background-color:white;color: grey;">

    <p>MNNIT Allahabad Campus</p>
    <p>Teliarganj, Prayagraj, Uttar Pradesh 211004
    </p>
    <p>© 2021 HealthyMe. All Rights Reserved.</p>
    </div>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = rescheduleEmail;
