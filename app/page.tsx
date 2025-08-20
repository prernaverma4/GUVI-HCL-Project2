import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Zap, Globe, Download, Github, Palette } from "lucide-react"
import { CursorEffects } from "@/components/cursor-effects"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function HomePage() {
  return (
    <>
      <CursorEffects />
      <ScrollAnimations />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Navigation */}
        <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center hover-glow">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">PortfolioBuilder</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/templates"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Templates
                </a>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Features
                </a>
                <Button variant="outline" size="sm" className="magnetic-button bg-transparent" asChild>
                  <a href="/dashboard">Dashboard</a>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 hover-lift fade-in-up">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">New: AI-Powered Portfolio Generation</span>
              </div>

              <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight fade-in-up">
                Create Your
                <span className="gradient-text"> Professional</span>
                <br />
                Portfolio in Minutes
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up">
                Build stunning portfolios that showcase your work and skills. Perfect for students, developers, and
                designers who want to make a lasting impression.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up">
                <Button size="lg" className="px-8 py-3 text-lg font-semibold group magnetic-button hover-glow" asChild>
                  <a href="/builder">
                    Create Your Portfolio
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg bg-transparent magnetic-button"
                  asChild
                >
                  <a href="/templates">View Templates</a>
                </Button>
              </div>

              {/* Portfolio Preview Mockup */}
              <div className="relative max-w-5xl mx-auto fade-in-up">
                <Card className="p-8 glass-card hover-lift">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover-lift">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 hover-glow">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2">Lightning Fast</h3>
                      <p className="text-muted-foreground text-sm">
                        Build your portfolio in under 5 minutes with our intuitive form builder.
                      </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 hover-lift">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 hover-glow">
                        <Globe className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2">Deploy Anywhere</h3>
                      <p className="text-muted-foreground text-sm">
                        One-click deployment to GitHub Pages, Netlify, or download as ZIP.
                      </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-accent/5 to-secondary/5 border border-accent/20 hover-lift">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 hover-glow">
                        <Download className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2">Own Your Code</h3>
                      <p className="text-muted-foreground text-sm">
                        Download clean, customizable HTML/CSS code that you fully own.
                      </p>
                    </Card>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-delayed"></div>
            <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl floating"></div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-20 bg-muted/30 parallax-slow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No design experience needed. Our guided process makes portfolio creation effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 hover-glow hover-lift">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-3">Fill Out Your Info</h3>
                <p className="text-muted-foreground">
                  Add your personal details, skills, and project information through our simple form.
                </p>
              </div>

              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 hover-glow hover-lift">
                  <span className="text-2xl font-bold text-accent-foreground">2</span>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-3">Choose a Template</h3>
                <p className="text-muted-foreground">
                  Select from our collection of professionally designed templates that match your style.
                </p>
              </div>

              <div className="text-center fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 hover-glow hover-lift">
                  <span className="text-2xl font-bold text-secondary-foreground">3</span>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-3">Deploy & Share</h3>
                <p className="text-muted-foreground">
                  Launch your portfolio with one click or download the code to host anywhere.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 fade-in-up">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold magnetic-button hover-glow" asChild>
                <a href="/builder">
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-12 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center hover-glow">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">PortfolioBuilder</span>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  Support
                </a>
                <Button variant="ghost" size="sm" className="magnetic-button">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
