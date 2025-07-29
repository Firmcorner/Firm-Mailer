"use server"

import nodemailer from "nodemailer"

interface EmailResult {
  success: number
  failed: number
  errors: string[]
}

export async function sendBulkEmails(formData: FormData): Promise<EmailResult> {
  const senderEmail = formData.get("senderEmail") as string
  const appPassword = formData.get("appPassword") as string
  const platform = formData.get("platform") as string
  const subject = formData.get("subject") as string
  const emailBody = formData.get("emailBody") as string
  const emailList = formData.get("emailList") as string
  const attachment = formData.get("attachment") as File | null

  const platformConfigs = {
    gmail: { host: "smtp.gmail.com", port: 465, secure: true },
    outlook: { host: "smtp-mail.outlook.com", port: 587, secure: false },
    yahoo: { host: "smtp.mail.yahoo.com", port: 587, secure: false },
    custom: { host: "smtp.gmail.com", port: 587, secure: false },
  }

  const config = platformConfigs[platform as keyof typeof platformConfigs] || platformConfigs.gmail

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: senderEmail,
      pass: appPassword,
    },
  })

  // Parse email list
  const emails = emailList
    .split("\n")
    .map((email) => email.trim())
    .filter((email) => email && email.includes("@"))

  const results: EmailResult = {
    success: 0,
    failed: 0,
    errors: [],
  }

  // Prepare attachment if provided
  let attachmentData = null
  if (attachment) {
    const buffer = Buffer.from(await attachment.arrayBuffer())
    attachmentData = {
      filename: attachment.name,
      content: buffer,
      contentType: attachment.type,
    }
  }

  // Send emails
  for (const email of emails) {
    try {
      const mailOptions = {
        from: senderEmail,
        to: email,
        subject: subject,
        text: emailBody,
        attachments: attachmentData ? [attachmentData] : [],
      }

      await transporter.sendMail(mailOptions)
      results.success++
    } catch (error) {
      results.failed++
      results.errors.push(`Failed to send to ${email}: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return results
}
