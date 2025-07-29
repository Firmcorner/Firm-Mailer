"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ShoppingCart, Users, Mail, Megaphone, FileText } from "lucide-react"

interface EmailTemplate {
  id: string
  name: string
  category: string
  subject: string
  body: string
  icon: React.ReactNode
  description: string
}

interface EmailTemplatesProps {
  onTemplateSelect: (template: EmailTemplate) => void
}

export function EmailTemplates({ onTemplateSelect }: EmailTemplatesProps) {
  const templates: EmailTemplate[] = [
    {
      id: "job-application",
      name: "Job Application",
      category: "Career",
      subject: "[Position Title] Application - [Your Name]",
      body: `Dear Hiring Manager,

I hope this email finds you well.

I am writing to express my strong interest in the [Position Title] position at [Company Name]. With [X years] of experience in [Your Field/Industry], I believe I would be a valuable addition to your team.

Key highlights of my background:
• [X years] of experience in [Relevant Skill/Area]
• Proven track record in [Specific Achievement/Area]
• Strong expertise in [Relevant Technology/Skill]
• [Relevant Certification/Education]

I have attached my resume for your review and would welcome the opportunity to discuss how my skills and experience align with your team's needs.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Phone Number]
[Your Email Address]`,
      icon: <Briefcase className="h-4 w-4" />,
      description: "Professional job application template",
    },
    {
      id: "product-marketing",
      name: "Product Marketing",
      category: "Marketing",
      subject: "Introducing [Product Name] - [Key Benefit]",
      body: `Dear [Customer Name],

We're excited to introduce you to [Product Name], our latest innovation designed to [solve specific problem/provide benefit].

🚀 What makes [Product Name] special:
• [Key Feature 1] - [Benefit]
• [Key Feature 2] - [Benefit]  
• [Key Feature 3] - [Benefit]
• [Key Feature 4] - [Benefit]

✨ Special Launch Offer:
Get [Discount/Offer Details] when you [Call to Action] before [Date].

[Product Name] has already helped [Number]+ customers [achieve specific result]. Here's what [Customer Type] are saying:

"[Customer Testimonial]" - [Customer Name], [Customer Title]

Ready to experience [Product Name] for yourself?

👉 [Call to Action Button/Link]

Questions? Simply reply to this email or call us at [Phone Number].

Best regards,
[Your Name]
[Your Title]
[Company Name]`,
      icon: <ShoppingCart className="h-4 w-4" />,
      description: "Promote products and services effectively",
    },
    {
      id: "hiring-recruitment",
      name: "Hiring & Recruitment",
      category: "HR",
      subject: "Exciting [Position Title] Opportunity at [Company Name]",
      body: `Dear [Candidate Name],

I hope this message finds you well.

I came across your profile and was impressed by your background in [Relevant Field/Skill]. I'm reaching out regarding an exciting [Position Title] opportunity at [Company Name] that I believe would be a perfect match for your expertise.

🏢 About the Role:
• Position: [Position Title]
• Department: [Department Name]
• Location: [Location/Remote]
• Experience Level: [Experience Level]

💼 What You'll Do:
• [Key Responsibility 1]
• [Key Responsibility 2]
• [Key Responsibility 3]
• [Key Responsibility 4]

🎯 What We're Looking For:
• [Required Skill/Experience 1]
• [Required Skill/Experience 2]
• [Required Skill/Experience 3]

🌟 What We Offer:
• Competitive salary: [Salary Range]
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

Would you be interested in learning more about this opportunity? I'd love to schedule a brief call to discuss how your background aligns with our needs.

Please let me know your availability for a 15-minute conversation this week.

Best regards,
[Your Name]
[Your Title]
[Company Name]
[Your Email]
[Your Phone]`,
      icon: <Users className="h-4 w-4" />,
      description: "Reach out to potential candidates",
    },
    {
      id: "cold-outreach",
      name: "Cold Outreach",
      category: "Sales",
      subject: "Quick question about [Company Name]'s [Specific Area]",
      body: `Hi [Contact Name],

I hope you're having a great week!

I've been following [Company Name]'s work in [Industry/Area] and was particularly impressed by [Specific Achievement/Project].

I'm [Your Name] from [Your Company], and we specialize in helping [Target Industry] companies [solve specific problem/achieve specific goal]. 

I noticed that [Company Name] might be facing challenges with [Specific Challenge/Pain Point]. We've helped similar companies like [Similar Company 1] and [Similar Company 2] achieve:

✅ [Specific Result/Benefit 1]
✅ [Specific Result/Benefit 2]  
✅ [Specific Result/Benefit 3]

I'd love to share how we helped [Similar Company] [achieve specific result] in just [timeframe].

Would you be open to a brief 15-minute call this week to explore if there's a potential fit? I promise to keep it focused and valuable.

If not, no worries at all – I understand how busy things can get.

Best regards,
[Your Name]
[Your Title]
[Your Company]
[Your Phone]
[Your Email]`,
      icon: <Mail className="h-4 w-4" />,
      description: "Professional cold outreach template",
    },
    {
      id: "newsletter",
      name: "Newsletter",
      category: "Marketing",
      subject: "[Newsletter Name] - [Month] Edition: [Main Topic]",
      body: `Hello [Subscriber Name],

Welcome to the [Month] edition of [Newsletter Name]!

📰 This Month's Highlights:

🔥 Featured Story: [Main Article Title]
[Brief description of main article - 2-3 sentences about the key insights or news]

📊 Industry Updates:
• [Update 1] - [Brief description]
• [Update 2] - [Brief description]
• [Update 3] - [Brief description]

💡 Tips & Insights:
[Tip Title]: [Brief valuable tip or insight that readers can immediately apply]

🎯 Spotlight: [Featured Section]
This month we're highlighting [topic/person/product]. [2-3 sentences about why this is important or interesting]

📅 Upcoming Events:
• [Event 1] - [Date] - [Brief description]
• [Event 2] - [Date] - [Brief description]

🔗 Recommended Reading:
• [Article/Resource 1] - [Why it's valuable]
• [Article/Resource 2] - [Why it's valuable]

That's all for this month! Thank you for being part of our community.

Have feedback or suggestions? Simply reply to this email - we read every response!

Best regards,
[Your Name]
[Your Title]
[Company/Organization Name]

P.S. Know someone who would enjoy [Newsletter Name]? Forward this email or have them subscribe at [Subscription Link]`,
      icon: <Megaphone className="h-4 w-4" />,
      description: "Engage your audience with newsletters",
    },
    {
      id: "follow-up",
      name: "Follow-up",
      category: "General",
      subject: "Following up on our [Meeting/Conversation/Proposal]",
      body: `Hi [Contact Name],

I hope you're doing well!

I wanted to follow up on our [meeting/conversation/discussion] from [Date/Time] regarding [Topic/Subject].

📝 Quick Recap:
We discussed [Key Point 1], [Key Point 2], and [Key Point 3]. You mentioned that [specific concern/interest they expressed].

✅ Next Steps:
As promised, I've [action you took - attached document/prepared proposal/researched solution]. 

[If applicable: I've attached [document name] which includes [brief description of what's included].]

🤔 Your Thoughts:
I'd love to hear your thoughts on [specific aspect] and answer any questions you might have.

📅 Moving Forward:
Would you be available for a brief call [suggest specific time/day] to discuss the next steps? I'm flexible with timing and happy to work around your schedule.

If you need more time to review or have any immediate questions, please don't hesitate to reach out.

Thank you for your time and consideration!

Best regards,
[Your Name]
[Your Title]
[Your Company]
[Your Phone]
[Your Email]`,
      icon: <FileText className="h-4 w-4" />,
      description: "Professional follow-up communication",
    },
  ]

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Email Templates</h3>
        <p className="text-sm text-gray-600">
          Choose a template to get started quickly. All placeholders (in [brackets]) can be customized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {template.icon}
                  <CardTitle className="text-sm">{template.name}</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              <CardDescription className="text-xs">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => onTemplateSelect(template)}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="text-blue-600 mt-0.5">💡</div>
          <div className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> After selecting a template, customize the placeholders in [brackets] with your
            specific information. For example, replace [Your Name] with your actual name, [Company Name] with the target
            company, etc.
          </div>
        </div>
      </div>
    </div>
  )
}
