import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sparkles,
  ExternalLink,
  Tag,
  FolderOpen,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";

const LandingPage = () => {
  const [userCount, setUserCount] = useState("10,000+");
  const [claimedAmount, setClaimedAmount] = useState("$2.5M+");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              Airdrop Linker
            </span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Benefits
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                How It Works
              </a>
            </nav>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/login?tab=register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground">
                <Sparkles className="mr-1 h-3 w-3" /> New Chrome Extension
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text animate-fade-in">
                Never Miss Another Airdrop
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Your all-in-one tool to collect, organize, and claim airdrops
                faster than ever before.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-600/30">
                <Sparkles className="mr-1 h-3 w-3" /> Crypto
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10 dark:ring-purple-600/30">
                <Sparkles className="mr-1 h-3 w-3" /> NFTs
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-700/10 dark:ring-green-600/30">
                <Sparkles className="mr-1 h-3 w-3" /> DeFi
              </span>
              <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300 ring-1 ring-inset ring-yellow-700/10 dark:ring-yellow-600/30">
                <Sparkles className="mr-1 h-3 w-3" /> GameFi
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span>{userCount} users</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>{claimedAmount} claimed</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login?tab=register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 animate-pulse-slow"
                >
                  Start Claiming Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80"
                alt="Airdrop Linker Dashboard"
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-3 shadow-lg border border-border animate-bounce-slow">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">
                  Save links with one click
                </span>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-card rounded-lg p-3 shadow-lg border border-border">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">
                  Open multiple airdrops at once
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {userCount}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">
                {claimedAmount}
              </div>
              <div className="text-sm text-muted-foreground">Value Claimed</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">150+</div>
              <div className="text-sm text-muted-foreground">
                Airdrops Tracked
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                5 min
              </div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Airdrop Linker comes packed with everything you need to
              efficiently manage your web3 opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Batch Link Opening</h3>
              <p className="text-muted-foreground">
                Open multiple links with a single click, saving you time when
                checking multiple airdrops.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tag Organization</h3>
              <p className="text-muted-foreground">
                Categorize your links with custom tags for easy filtering and
                organization.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Import/Export</h3>
              <p className="text-muted-foreground">
                Easily backup your link collection or share it across devices
                with our import/export feature.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
              <p className="text-muted-foreground">
                Save hours each week with our streamlined airdrop management
                system.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Saving</h3>
              <p className="text-muted-foreground">
                Right-click on any link to instantly save it to your collection
                without interrupting your browsing.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Insights</h3>
              <p className="text-muted-foreground">
                Join a growing community of airdrop hunters sharing strategies
                and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Airdrop Linker makes collecting and managing web3 opportunities
              simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Links</h3>
              <p className="text-muted-foreground">
                Right-click on any link while browsing and save it directly to
                your collection.
              </p>
              <div className="hidden md:block absolute top-8 right-0 w-16 h-1 bg-primary/20"></div>
            </div>

            <div className="text-center relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize</h3>
              <p className="text-muted-foreground">
                Add tags, edit details, and organize your links into categories
                for easy access.
              </p>
              <div className="hidden md:block absolute top-8 right-0 w-16 h-1 bg-primary/20"></div>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Batch Open</h3>
              <p className="text-muted-foreground">
                Select multiple links and open them all at once with a single
                click.
              </p>
            </div>
          </div>

          <div className="mt-16 p-6 bg-card rounded-lg border text-center">
            <h3 className="text-xl font-semibold mb-2">Ready in 5 Minutes</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Install the extension, create your account, and start saving
              airdrops immediately. No complicated setup required.
            </p>
            <Link to="/login?tab=register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80"
                alt="Crypto Airdrop"
                className="rounded-lg shadow-xl border border-border"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Why Use Airdrop Linker?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Save Valuable Time</h3>
                    <p className="text-muted-foreground">
                      Batch open links instead of clicking them one by one,
                      saving hours each week.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Stay Organized</h3>
                    <p className="text-muted-foreground">
                      Keep all your airdrop opportunities in one place with tags
                      and categories, never lose track of potential rewards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      Maximize Your Earnings
                    </h3>
                    <p className="text-muted-foreground">
                      Never miss another airdrop opportunity - users report
                      claiming up to 3x more airdrops after using our tool.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Cross-Device Sync</h3>
                    <p className="text-muted-foreground">
                      Export your collection and use it across all your devices,
                      ensuring you never miss an opportunity no matter where you
                      are.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/login?tab=register">
                <Button
                  size="lg"
                  className="mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their
              airdrop hunting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <p className="text-xs text-muted-foreground">
                    Crypto Enthusiast
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "I've claimed over $5,000 in airdrops since I started using
                Airdrop Linker. The batch opening feature alone saves me hours
                every week."
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-xs text-muted-foreground">
                    DeFi Developer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The organization features are incredible. I used to miss
                airdrops all the time, but now I have everything categorized and
                never miss an opportunity."
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">RK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert K.</h4>
                  <p className="text-xs text-muted-foreground">NFT Collector</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "I was skeptical at first, but this tool has completely changed
                how I hunt for airdrops. The time savings alone make it worth
                it, not to mention the extra opportunities I've found."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-purple-600/10">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Maximize Your Airdrop Earnings?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join {userCount} users who are already saving time and claiming more
            rewards with Airdrop Linker.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/login?tab=register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Free forever. Start claiming in minutes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="text-sm font-medium">Airdrop Linker</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Airdrop Linker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
