"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Github,
  Globe,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
  Palette,
  FileText,
  Code,
  Rocket,
  Clock,
  Shield,
} from "lucide-react"

interface DeployOption {
  id: string
  name: string
  description: string
  icon: any
  features: string[]
  difficulty: "Easy" | "Medium" | "Advanced"
  time: string
  popular?: boolean
  color: string
}

const deployOptions: DeployOption[] = [
  {
    id: "download",
    name: "Download ZIP",
    description: "Download your portfolio as a complete HTML/CSS/JS package that you can host anywhere.",
    icon: Download,
    features: ["Complete source code", "No dependencies", "Host anywhere", "Full customization"],
    difficulty: "Easy",
    time: "Instant",
    popular: true,
    color: "from-primary to-accent",
  },
  {
    id: "github",
    name: "GitHub Pages",
    description: "Deploy directly to GitHub Pages with automatic SSL and custom domain support.",
    icon: Github,
    features: ["Free hosting", "Custom domain", "SSL certificate", "Version control"],
    difficulty: "Easy",
    time: "2-3 minutes",
    popular: true,
    color: "from-secondary to-primary",
  },
  {
    id: "netlify",
    name: "Netlify",
    description: "Deploy to Netlify with continuous deployment, form handling, and edge functions.",
    icon: Globe,
    features: ["CDN hosting", "Form handling", "Analytics", "Branch previews"],
    difficulty: "Medium",
    time: "3-5 minutes",
    color: "from-accent to-secondary",
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy to Vercel with automatic HTTPS, global CDN, and serverless functions.",
    icon: Zap,
    features: ["Global CDN", "Serverless functions", "Analytics", "Preview deployments"],
    difficulty: "Medium",
    time: "2-4 minutes",
    color: "from-primary to-secondary",
  },
]

export default function DeployPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [deployedUrl, setDeployedUrl] = useState("")

  const handleDeploy = async (optionId: string) => {
    setSelectedOption(optionId)
    setDeploymentStatus("deploying")
    setDeploymentProgress(0)

    // Simulate deployment process
    const steps = [
      { message: "Generating portfolio files...", progress: 25 },
      { message: "Optimizing assets...", progress: 50 },
      { message: "Deploying to platform...", progress: 75 },
      { message: "Finalizing deployment...", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDeploymentProgress(step.progress)
    }

    // Simulate successful deployment
    setDeploymentStatus("success")
    setDeployedUrl(
      `https://your-portfolio-${Math.random().toString(36).substr(2, 9)}.${optionId === "github" ? "github.io" : optionId === "netlify" ? "netlify.app" : "vercel.app"}`,
    )
  }

  const handleDownload = () => {
    setSelectedOption("download")
    setDeploymentStatus("deploying")
    setDeploymentProgress(0)

    // Simulate file generation
    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDeploymentStatus("success")
          // Trigger download
          const link = document.createElement("a")
          link.href = "/placeholder.zip"
          link.download = "my-portfolio.zip"
          link.click()
          return 100
        }
        return prev + 20
      })
    }, 200)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (deploymentStatus === "deploying") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 p-8 bg-card/60 backdrop-blur-sm border border-border/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-primary-foreground animate-pulse" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
            {selectedOption === "download" ? "Generating Files..." : "Deploying Portfolio..."}
          </h2>
          <Progress value={deploymentProgress} className="mb-4" />
          <p className="text-muted-foreground">
            {selectedOption === "download"
              ? "Creating your portfolio package..."
              : `Deploying to ${deployOptions.find((opt) => opt.id === selectedOption)?.name}...`}
          </p>
        </Card>
      </div>
    )
  }

  if (deploymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-lg w-full mx-4 p-8 bg-card/60 backdrop-blur-sm border border-border/50 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
            {selectedOption === "download" ? "Download Ready!" : "Portfolio Deployed!"}
          </h2>

          {selectedOption === "download" ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">Your portfolio has been packaged and downloaded successfully.</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">What's included:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• index.html - Your portfolio page</li>
                  <li>• styles.css - Custom styling</li>
                  <li>• script.js - Interactive features</li>
                  <li>• assets/ - Images and resources</li>
                  <li>• README.md - Setup instructions</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">Your portfolio is now live and accessible to the world!</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Live URL:</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(deployedUrl)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-primary font-mono mt-1 break-all">{deployedUrl}</p>
              </div>
              <Button className="w-full" asChild>
                <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Your Portfolio
                </a>
              </Button>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <a href="/builder">Edit Portfolio</a>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </div>
        </Card>
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
            <Button variant="ghost" asChild>
              <a href="/builder">Back to Builder</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Portfolio Complete!</span>
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
            Choose Your Deployment Option
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your portfolio is ready! Select how you'd like to share it with the world.
          </p>
        </div>

        {/* Deployment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deployOptions.map((option) => {
            const Icon = option.icon

            return (
              <Card
                key={option.id}
                className="group relative overflow-hidden bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Popular Badge */}
                {option.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-accent text-accent-foreground border-accent/20">Popular</Badge>
                  </div>
                )}

                {/* Header */}
                <div className={`h-24 bg-gradient-to-r ${option.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif font-bold text-xl text-foreground">{option.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(option.difficulty)} variant="outline">
                        {option.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{option.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Time Estimate */}
                  <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Setup time: {option.time}</span>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    onClick={() => (option.id === "download" ? handleDownload() : handleDeploy(option.id))}
                  >
                    {option.id === "download" ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download ZIP
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Deploy to {option.name}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg mb-2">Clean Code</h3>
            <p className="text-muted-foreground text-sm">
              Your portfolio is built with clean, semantic HTML, modern CSS, and vanilla JavaScript.
            </p>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-serif font-semibold text-lg mb-2">Secure & Fast</h3>
            <p className="text-muted-foreground text-sm">
              All deployment options include HTTPS, CDN delivery, and optimized performance.
            </p>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif font-semibold text-lg mb-2">Fully Customizable</h3>
            <p className="text-muted-foreground text-sm">
              You own the code completely. Modify, extend, or rebrand as needed.
            </p>
          </Card>
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <h2 className="font-serif font-bold text-2xl text-foreground mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our deployment guides or contact support if you need assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              View Guides
            </Button>
            <Button variant="outline" className="bg-transparent">
              Contact Support
            </Button>
          </div>
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
