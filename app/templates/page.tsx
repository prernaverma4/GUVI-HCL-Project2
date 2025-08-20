"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Palette, Code, Briefcase, User, Star, Heart, Zap, X } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: "minimal" | "creative" | "professional" | "developer"
  difficulty: "beginner" | "intermediate" | "advanced"
  features: string[]
  colorSchemes: Array<{
    name: string
    primary: string
    secondary: string
    accent: string
  }>
  preview: {
    hero: string
    layout: "single-column" | "two-column" | "grid" | "sidebar"
    sections: string[]
  }
  popular: boolean
}

const templates: Template[] = [
  {
    id: "minimal-pro",
    name: "Minimal Pro",
    description: "Clean and elegant design perfect for professionals who want to make a strong first impression.",
    category: "minimal",
    difficulty: "beginner",
    features: ["Responsive Design", "Dark Mode", "Contact Form", "Project Gallery"],
    colorSchemes: [
      { name: "Classic", primary: "#2563eb", secondary: "#64748b", accent: "#0ea5e9" },
      { name: "Warm", primary: "#dc2626", secondary: "#78716c", accent: "#ea580b" },
      { name: "Nature", primary: "#059669", secondary: "#6b7280", accent: "#10b981" },
    ],
    preview: {
      hero: "Large centered name with subtitle and call-to-action",
      layout: "single-column",
      sections: ["Hero", "About", "Skills", "Projects", "Contact"],
    },
    popular: true,
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Bold and artistic template designed for creatives, designers, and artists to showcase their work.",
    category: "creative",
    difficulty: "intermediate",
    features: ["Animation Effects", "Image Gallery", "Video Background", "Custom Cursor"],
    colorSchemes: [
      { name: "Vibrant", primary: "#7c3aed", secondary: "#ec4899", accent: "#f59e0b" },
      { name: "Sunset", primary: "#dc2626", secondary: "#ea580c", accent: "#f59e0b" },
      { name: "Ocean", primary: "#0ea5e9", secondary: "#06b6d4", accent: "#8b5cf6" },
    ],
    preview: {
      hero: "Full-screen background with animated text overlay",
      layout: "grid",
      sections: ["Hero", "Portfolio", "About", "Services", "Contact"],
    },
    popular: false,
  },
  {
    id: "developer-focus",
    name: "Developer Focus",
    description: "Technical and modern design tailored for software developers and engineers.",
    category: "developer",
    difficulty: "intermediate",
    features: ["Code Syntax Highlighting", "GitHub Integration", "Tech Stack Icons", "Terminal Theme"],
    colorSchemes: [
      { name: "Terminal", primary: "#22c55e", secondary: "#64748b", accent: "#06b6d4" },
      { name: "VS Code", primary: "#3b82f6", secondary: "#6366f1", accent: "#8b5cf6" },
      { name: "GitHub", primary: "#1f2937", secondary: "#4b5563", accent: "#10b981" },
    ],
    preview: {
      hero: "Code-inspired layout with terminal-style elements",
      layout: "sidebar",
      sections: ["Hero", "Skills", "Projects", "Experience", "Blog"],
    },
    popular: true,
  },
  {
    id: "business-executive",
    name: "Business Executive",
    description: "Professional and sophisticated template for business leaders and executives.",
    category: "professional",
    difficulty: "beginner",
    features: ["LinkedIn Integration", "Testimonials", "Company Logos", "Professional Timeline"],
    colorSchemes: [
      { name: "Corporate", primary: "#1e40af", secondary: "#64748b", accent: "#0ea5e9" },
      { name: "Luxury", primary: "#7c2d12", secondary: "#a3a3a3", accent: "#d97706" },
      { name: "Modern", primary: "#374151", secondary: "#6b7280", accent: "#06b6d4" },
    ],
    preview: {
      hero: "Professional headshot with executive summary",
      layout: "two-column",
      sections: ["Hero", "Experience", "Achievements", "Testimonials", "Contact"],
    },
    popular: false,
  },
  {
    id: "portfolio-showcase",
    name: "Portfolio Showcase",
    description: "Image-heavy template perfect for photographers, designers, and visual artists.",
    category: "creative",
    difficulty: "advanced",
    features: ["Masonry Gallery", "Lightbox", "Image Optimization", "Lazy Loading"],
    colorSchemes: [
      { name: "Monochrome", primary: "#000000", secondary: "#737373", accent: "#ffffff" },
      { name: "Warm Tones", primary: "#92400e", secondary: "#78716c", accent: "#f59e0b" },
      { name: "Cool Blues", primary: "#1e3a8a", secondary: "#64748b", accent: "#0ea5e9" },
    ],
    preview: {
      hero: "Full-width image carousel with overlay text",
      layout: "grid",
      sections: ["Hero", "Gallery", "About", "Services", "Contact"],
    },
    popular: true,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    description: "Dynamic and modern template for entrepreneurs and startup founders.",
    category: "professional",
    difficulty: "intermediate",
    features: ["Startup Metrics", "Team Section", "Investor Relations", "Press Coverage"],
    colorSchemes: [
      { name: "Startup", primary: "#7c3aed", secondary: "#64748b", accent: "#06b6d4" },
      { name: "Growth", primary: "#059669", secondary: "#6b7280", accent: "#10b981" },
      { name: "Innovation", primary: "#dc2626", secondary: "#78716c", accent: "#f59e0b" },
    ],
    preview: {
      hero: "Bold statement with company metrics",
      layout: "single-column",
      sections: ["Hero", "Vision", "Team", "Achievements", "Contact"],
    },
    popular: false,
  },
]

const categories = [
  { id: "all", name: "All Templates", icon: Palette },
  { id: "minimal", name: "Minimal", icon: User },
  { id: "creative", name: "Creative", icon: Heart },
  { id: "professional", name: "Professional", icon: Briefcase },
  { id: "developer", name: "Developer", icon: Code },
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>("Classic")

  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "all" || template.category === selectedCategory,
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
              <Button variant="ghost" asChild>
                <a href="/builder">Builder</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select from our collection of professionally designed templates. Each template is fully customizable and
            optimized for all devices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id

            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={isActive ? "default" : "outline"}
                className={`px-6 py-3 ${isActive ? "" : "bg-transparent"}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group relative overflow-hidden bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-accent text-accent-foreground border-accent/20">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}

              {/* Template Preview */}
              <div className="relative h-48 bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
                <div className="absolute inset-0 p-6">
                  {/* Mock Preview Content */}
                  <div className="space-y-3">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-12 bg-secondary/20 rounded"></div>
                      <div className="h-12 bg-accent/20 rounded"></div>
                      <div className="h-12 bg-primary/20 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Preview Template</p>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif font-semibold text-lg text-foreground">{template.name}</h3>
                  <Badge className={getDifficultyColor(template.difficulty)} variant="outline">
                    {template.difficulty}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{template.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-muted/50">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-muted/50">
                      +{template.features.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Color Schemes Preview */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {template.colorSchemes.slice(0, 3).map((scheme, index) => (
                      <div key={index} className="flex gap-0.5">
                        <div
                          className="w-3 h-3 rounded-full border border-border/30"
                          style={{ backgroundColor: scheme.primary }}
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full border border-border/30"
                          style={{ backgroundColor: scheme.secondary }}
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full border border-border/30"
                          style={{ backgroundColor: scheme.accent }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedTemplate(template)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <a href={`/builder?template=${template.id}`}>
                      <Zap className="w-4 h-4 mr-2" />
                      Use Template
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card/90 backdrop-blur-sm border border-border/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-foreground mb-2">{selectedTemplate.name}</h2>
                    <p className="text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                  <Button onClick={() => setSelectedTemplate(null)} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Template Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div>
                    <h3 className="font-semibold mb-4">Template Preview</h3>
                    <div className="bg-muted/30 rounded-lg p-6 h-64 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Eye className="w-12 h-12 mx-auto mb-2" />
                        <p>Interactive preview coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    {/* Color Schemes */}
                    <div>
                      <h4 className="font-medium mb-3">Color Schemes</h4>
                      <div className="space-y-2">
                        {selectedTemplate.colorSchemes.map((scheme) => (
                          <div
                            key={scheme.name}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedColorScheme === scheme.name
                                ? "border-primary bg-primary/5"
                                : "border-border/30 hover:border-border/50"
                            }`}
                            onClick={() => setSelectedColorScheme(scheme.name)}
                          >
                            <span className="font-medium">{scheme.name}</span>
                            <div className="flex gap-1">
                              <div
                                className="w-4 h-4 rounded-full border border-border/30"
                                style={{ backgroundColor: scheme.primary }}
                              ></div>
                              <div
                                className="w-4 h-4 rounded-full border border-border/30"
                                style={{ backgroundColor: scheme.secondary }}
                              ></div>
                              <div
                                className="w-4 h-4 rounded-full border border-border/30"
                                style={{ backgroundColor: scheme.accent }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-3">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-muted/50">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sections */}
                    <div>
                      <h4 className="font-medium mb-3">Template Sections</h4>
                      <div className="space-y-2">
                        {selectedTemplate.preview.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-border/30">
                  <Button onClick={() => setSelectedTemplate(null)} variant="outline" className="bg-transparent">
                    Close Preview
                  </Button>
                  <Button className="flex-1" asChild>
                    <a href={`/builder?template=${selectedTemplate.id}&scheme=${selectedColorScheme}`}>
                      <Zap className="w-4 h-4 mr-2" />
                      Use This Template
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
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
