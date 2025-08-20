"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Plus,
  Eye,
  Edit,
  Download,
  ExternalLink,
  MoreHorizontal,
  TrendingUp,
  Globe,
  Palette,
  BarChart3,
  FileText,
  Copy,
  Share2,
} from "lucide-react"

interface Portfolio {
  id: string
  name: string
  template: string
  status: "published" | "draft" | "deploying"
  url?: string
  views: number
  lastModified: string
  createdAt: string
  deploymentPlatform: "github" | "netlify" | "vercel" | "download"
}

const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    name: "John Doe - Developer Portfolio",
    template: "Developer Focus",
    status: "published",
    url: "https://johndoe-portfolio.vercel.app",
    views: 1247,
    lastModified: "2 days ago",
    createdAt: "Dec 15, 2024",
    deploymentPlatform: "vercel",
  },
  {
    id: "2",
    name: "Creative Showcase",
    template: "Creative Studio",
    status: "draft",
    views: 0,
    lastModified: "1 week ago",
    createdAt: "Dec 8, 2024",
    deploymentPlatform: "download",
  },
  {
    id: "3",
    name: "Business Profile",
    template: "Business Executive",
    status: "published",
    url: "https://business-profile.netlify.app",
    views: 892,
    lastModified: "3 days ago",
    createdAt: "Nov 28, 2024",
    deploymentPlatform: "netlify",
  },
]

const stats = [
  { label: "Total Portfolios", value: "3", change: "+1 this month", icon: FileText },
  { label: "Total Views", value: "2,139", change: "+12% from last month", icon: Eye },
  { label: "Published Sites", value: "2", change: "67% published", icon: Globe },
  { label: "Avg. Monthly Views", value: "713", change: "+8% growth", icon: TrendingUp },
]

export default function DashboardPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "deploying":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return "🐙"
      case "netlify":
        return "🌐"
      case "vercel":
        return "▲"
      case "download":
        return "📁"
      default:
        return "🌐"
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
                <a href="/templates">Templates</a>
              </Button>
              <Button asChild>
                <a href="/builder">
                  <Plus className="w-4 h-4 mr-2" />
                  New Portfolio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-serif font-bold text-2xl md:text-3xl text-foreground">Welcome back, John!</h1>
              <p className="text-muted-foreground">Manage your portfolios and track their performance</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolios Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-foreground">Your Portfolios</h2>
              <Button size="sm" asChild>
                <a href="/builder">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              {mockPortfolios.map((portfolio) => (
                <Card
                  key={portfolio.id}
                  className="p-6 bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{portfolio.name}</h3>
                        <Badge className={getStatusColor(portfolio.status)} variant="outline">
                          {portfolio.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Template: {portfolio.template}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created {portfolio.createdAt}</span>
                        <span>•</span>
                        <span>Modified {portfolio.lastModified}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          {getPlatformIcon(portfolio.deploymentPlatform)}
                          {portfolio.deploymentPlatform}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {portfolio.status === "published" && portfolio.url && (
                    <div className="bg-muted/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono text-muted-foreground">{portfolio.url}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(portfolio.url!)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={portfolio.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {portfolio.status === "published" && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{portfolio.views.toLocaleString()} views</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent" asChild>
                        <a href={`/builder?edit=${portfolio.id}`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      {portfolio.status === "published" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
              <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="/builder">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Portfolio
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="/templates">
                    <Palette className="w-4 h-4 mr-2" />
                    Browse Templates
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
              <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Portfolio deployed successfully</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Updated Business Profile</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Created new draft portfolio</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Downloaded portfolio files</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Usage Stats */}
            <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50">
              <h3 className="font-serif font-semibold text-lg text-foreground mb-4">This Month</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Portfolio Views</span>
                    <span className="text-foreground font-medium">2,139</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Unique Visitors</span>
                    <span className="text-foreground font-medium">1,847</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Avg. Session Duration</span>
                    <span className="text-foreground font-medium">2m 34s</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </Card>
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
