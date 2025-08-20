"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Code,
  Briefcase,
  LinkIcon,
  Plus,
  X,
  Palette,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
} from "lucide-react"

interface FormData {
  // Personal Info
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  bio: string

  // Skills
  skills: string[]

  // Projects
  projects: Array<{
    title: string
    description: string
    technologies: string[]
    liveUrl: string
    githubUrl: string
  }>

  // Social Links
  socialLinks: Array<{
    platform: string
    url: string
  }>
}

const initialFormData: FormData = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  skills: [],
  projects: [{ title: "", description: "", technologies: [], liveUrl: "", githubUrl: "" }],
  socialLinks: [{ platform: "", url: "" }],
}

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic information about you" },
  { id: 2, title: "Bio & Skills", icon: FileText, description: "Your story and expertise" },
  { id: 3, title: "Projects", icon: Briefcase, description: "Showcase your work" },
  { id: 4, title: "Social Links", icon: LinkIcon, description: "Connect with your audience" },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [newSkill, setNewSkill] = useState("")
  const [showPreview, setShowPreview] = useState(true)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop")

  const progress = (currentStep / steps.length) * 100

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData("skills", [...formData.skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    updateFormData(
      "skills",
      formData.skills.filter((skill) => skill !== skillToRemove),
    )
  }

  const addProject = () => {
    updateFormData("projects", [
      ...formData.projects,
      { title: "", description: "", technologies: [], liveUrl: "", githubUrl: "" },
    ])
  }

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project,
    )
    updateFormData("projects", updatedProjects)
  }

  const removeProject = (index: number) => {
    if (formData.projects.length > 1) {
      updateFormData(
        "projects",
        formData.projects.filter((_, i) => i !== index),
      )
    }
  }

  const addSocialLink = () => {
    updateFormData("socialLinks", [...formData.socialLinks, { platform: "", url: "" }])
  }

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updatedLinks = formData.socialLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    updateFormData("socialLinks", updatedLinks)
  }

  const removeSocialLink = (index: number) => {
    if (formData.socialLinks.length > 1) {
      updateFormData(
        "socialLinks",
        formData.socialLinks.filter((_, i) => i !== index),
      )
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="John Doe"
                  className="bg-input/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="Frontend Developer"
                  className="bg-input/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                  className="bg-input/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-input/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="San Francisco, CA"
                className="bg-input/50 backdrop-blur-sm"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell your story... What drives you? What are your passions and goals?"
                className="min-h-32 bg-input/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-4">
              <Label>Skills & Technologies *</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React, Python, Design)"
                  className="bg-input/50 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary border-primary/20"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-lg">Projects *</Label>
              <Button onClick={addProject} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {formData.projects.map((project, index) => (
              <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Project {index + 1}</h3>
                  {formData.projects.length > 1 && (
                    <Button
                      onClick={() => removeProject(index)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Title *</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(index, "title", e.target.value)}
                      placeholder="My Awesome Project"
                      className="bg-input/50 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Describe what this project does and your role in it..."
                      className="bg-input/50 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Live URL</Label>
                      <Input
                        value={project.liveUrl}
                        onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
                        placeholder="https://myproject.com"
                        className="bg-input/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input
                        value={project.githubUrl}
                        onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="bg-input/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-lg">Social Links</Label>
              <Button onClick={addSocialLink} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </div>

            {formData.socialLinks.map((link, index) => (
              <Card key={index} className="p-4 bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Platform</Label>
                    <Input
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                      placeholder="LinkedIn, GitHub, Twitter, etc."
                      className="bg-input/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="flex-2 space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="bg-input/50 backdrop-blur-sm"
                    />
                  </div>
                  {formData.socialLinks.length > 1 && (
                    <Button
                      onClick={() => removeSocialLink(index)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const LivePreview = () => {
    return (
      <div className="h-full bg-background border border-border/50 rounded-lg overflow-hidden">
        {/* Preview Header */}
        <div className="bg-muted/30 border-b border-border/30 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">Portfolio Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewDevice("desktop")}
              className={previewDevice === "desktop" ? "bg-muted" : ""}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewDevice("mobile")}
              className={previewDevice === "mobile" ? "bg-muted" : ""}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className={`h-full overflow-y-auto ${previewDevice === "mobile" ? "max-w-sm mx-auto" : ""}`}>
          <div className="p-6 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-2xl md:text-3xl text-foreground">
                  {formData.fullName || "Your Name"}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">{formData.title || "Your Professional Title"}</p>
                {formData.location && <p className="text-sm text-muted-foreground mt-1">{formData.location}</p>}
              </div>
            </div>

            {/* Bio Section */}
            {formData.bio && (
              <div className="space-y-3">
                <h2 className="font-serif font-semibold text-xl text-foreground">About Me</h2>
                <p className="text-muted-foreground leading-relaxed">{formData.bio}</p>
              </div>
            )}

            {/* Skills Section */}
            {formData.skills.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-serif font-semibold text-xl text-foreground">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 bg-primary/10 text-primary border-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {formData.projects.some((p) => p.title) && (
              <div className="space-y-4">
                <h2 className="font-serif font-semibold text-xl text-foreground">Projects</h2>
                <div className="grid gap-4">
                  {formData.projects
                    .filter((project) => project.title)
                    .map((project, index) => (
                      <Card key={index} className="p-4 bg-card/60 backdrop-blur-sm border border-border/50">
                        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                        {project.description && (
                          <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                        )}
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              Live Demo
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              GitHub
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="space-y-3">
              <h2 className="font-serif font-semibold text-xl text-foreground">Contact</h2>
              <div className="space-y-2">
                {formData.email && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                )}
                {formData.phone && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Social Links */}
            {formData.socialLinks.some((link) => link.platform && link.url) && (
              <div className="space-y-3">
                <h2 className="font-serif font-semibold text-xl text-foreground">Connect</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.socialLinks
                    .filter((link) => link.platform && link.url)
                    .map((link, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                        {link.platform}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl text-foreground">PortfolioBuilder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)} className="hidden lg:flex">
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button variant="ghost" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-4xl mx-auto"}`}>
          {/* Form Section */}
          <div className="space-y-8">
            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-serif font-bold text-2xl md:text-3xl text-foreground">Build Your Portfolio</h1>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </span>
              </div>

              <Progress value={progress} className="mb-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((step) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary/10 border border-primary/20"
                          : isCompleted
                            ? "bg-secondary/10 border border-secondary/20"
                            : "bg-muted/30 border border-border/30"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : isCompleted
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="hidden md:block">
                        <p className={`font-medium text-sm ${isActive ? "text-primary" : "text-foreground"}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <Card className="p-8 bg-card/60 backdrop-blur-sm border border-border/50 shadow-xl">
              <div className="mb-6">
                <h2 className="font-serif font-semibold text-xl text-foreground mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </div>

              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
                <Button onClick={prevStep} variant="outline" disabled={currentStep === 1} className="bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep === steps.length ? (
                  <Button size="lg" className="px-8" asChild>
                    <a href="/deploy">
                      Generate Portfolio
                      <Code className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button onClick={nextStep} size="lg" className="px-8">
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
              <div className="h-full min-h-[600px]">
                <LivePreview />
              </div>
            </div>
          )}
        </div>

        <div className="lg:hidden mt-8">
          <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="w-full bg-transparent">
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
