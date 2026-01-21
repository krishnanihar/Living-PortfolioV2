'use client';

import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { CaseStudyTracker } from '@/components/CaseStudyTracker';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Palette,
  Code2,
  Search,
  Layout,
  Shield,
  FileCode,
  Boxes,
  Package,
  Cpu,
  Paintbrush,
  Component,
  Database,
  MessageSquare,
  User,
  Bot,
  Copy,
  Check,
  Terminal,
  Moon,
  Sun,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// MCP Tools data
const tools = [
  { name: 'get_tokens', icon: Palette, desc: 'Retrieve design tokens by category with theme support', example: 'get_tokens({ category: "colors" })' },
  { name: 'get_component_spec', icon: FileCode, desc: 'Fetch complete component specifications', example: 'get_component_spec({ name: "Button" })' },
  { name: 'get_code', icon: Code2, desc: 'Generate implementation code with semantic tokens', example: 'get_code({ component: "Button", variant: "destructive" })' },
  { name: 'search_components', icon: Search, desc: 'Find components via natural language queries', example: 'search_components({ query: "form input" })' },
  { name: 'compose_interface', icon: Layout, desc: 'Generative UI from natural language intent', example: 'compose_interface({ description: "login form" })' },
  { name: 'get_layout_pattern', icon: Boxes, desc: 'Access pre-built structural templates', example: 'get_layout_pattern({ pattern: "dashboard" })' },
  { name: 'validate_accessibility', icon: Shield, desc: 'Audit JSX for WCAG 2.1 AA compliance', example: 'validate_accessibility({ jsx: "<Button>..." })' },
];

// Architecture packages
const packages = [
  {
    name: '@origen/tokens',
    icon: Paintbrush,
    desc: 'Design tokens in W3C DTCG format',
    details: ['Semantic color system', 'Light/dark themes', 'Typography scales', 'Spacing & radius'],
    color: '#A855F7'
  },
  {
    name: '@origen/react',
    icon: Component,
    desc: 'React component library',
    details: ['5 core components', 'Variant system', 'TypeScript-first', 'Tree-shakeable'],
    color: '#3B82F6'
  },
  {
    name: '@origen/mcp',
    icon: Cpu,
    desc: 'MCP server for AI agents',
    details: ['7 queryable tools', 'Resource URIs', 'Typed schemas', 'Vercel-ready'],
    color: '#10B981'
  },
];

// Components data
const components = [
  {
    name: 'Button',
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    sizes: ['sm', 'default', 'lg', 'icon'],
    preview: '<Button variant="default">Click me</Button>'
  },
  {
    name: 'Input',
    variants: ['default'],
    sizes: ['default'],
    preview: '<Input placeholder="Enter text..." />'
  },
  {
    name: 'Card',
    variants: ['default'],
    sizes: ['default'],
    preview: '<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n  </CardHeader>\n  <CardContent>...</CardContent>\n</Card>'
  },
  {
    name: 'Select',
    variants: ['default'],
    sizes: ['default'],
    preview: '<Select>\n  <SelectTrigger />\n  <SelectContent>...</SelectContent>\n</Select>'
  },
  {
    name: 'Modal',
    variants: ['default'],
    sizes: ['default'],
    preview: '<Modal>\n  <ModalTrigger />\n  <ModalContent>...</ModalContent>\n</Modal>'
  },
];

// MCP Resources
const resources = [
  { uri: 'tokens://all', desc: 'Complete token collection' },
  { uri: 'tokens://colors', desc: 'Color palette tokens' },
  { uri: 'tokens://spacing', desc: 'Spacing scale tokens' },
  { uri: 'tokens://typography', desc: 'Typography tokens' },
  { uri: 'component://button', desc: 'Button component spec' },
  { uri: 'component://input', desc: 'Input component spec' },
  { uri: 'component://card', desc: 'Card component spec' },
  { uri: 'component://select', desc: 'Select component spec' },
  { uri: 'component://modal', desc: 'Modal component spec' },
];

// Design tokens examples
const tokenExamples = {
  colors: {
    light: { background: '#FFFFFF', primary: '#2563EB', destructive: '#DC2626' },
    dark: { background: '#0F172A', primary: '#3B82F6', destructive: '#EF4444' }
  },
  spacing: ['4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px'],
  radius: ['4px', '6px', '8px', '12px', '16px', 'full']
};

// Roadmap data
const roadmap = [
  { version: 'v0.1', title: 'Foundation', date: 'Jan 2025', current: true, items: ['5 components', '7 MCP tools', 'W3C DTCG tokens'] },
  { version: 'v0.2', title: 'Compose & Validate', date: 'Feb 2025', items: ['compose_interface tool', 'axe-core validation'] },
  { version: 'v0.3', title: 'AI-Native', date: 'Q1 2025', items: ['StreamingText', 'Figma sync'] },
  { version: 'v1.0', title: 'Production', date: 'Q2 2025', items: ['Multi-framework', 'npm publish'] },
];

// Conversation demo
const conversationSteps = [
  { role: 'user', message: 'Create a destructive button for deleting items' },
  { role: 'assistant', thinking: 'Querying Origen for the Button component with destructive variant...', tool: 'get_code({ component: "Button", variant: "destructive" })' },
  { role: 'tool', result: `{
  "jsx": "<Button variant=\\"destructive\\">Delete</Button>",
  "tokens": {
    "background": "var(--destructive)",
    "color": "var(--destructive-foreground)"
  }
}` },
  { role: 'assistant', message: 'Here\'s your destructive button using Origen\'s semantic tokens:', code: '<Button variant="destructive">\n  Delete\n</Button>' },
];

export default function OrigenPage() {
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activeComponent, setActiveComponent] = useState(0);
  const [showDarkTokens, setShowDarkTokens] = useState(true);

  const configJson = `{
  "mcpServers": {
    "origen": {
      "url": "https://mcp-alpha-green.vercel.app/api/mcp"
    }
  }
}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(configJson);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <>
      <CaseStudyTracker slug="origen" />
      <PortfolioNavigation />

      <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        {/* Hero */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(8rem, 15vh, 10rem) clamp(1.5rem, 4vw, 3rem) clamp(4rem, 8vh, 6rem)',
        }}>
          <div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors mb-12"
              style={{ color: 'var(--text-50)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-80)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-50)'}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>

            <p
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-40)' }}
            >
              Research Project
            </p>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Origen
            </h1>

            <p
              className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl"
              style={{ color: 'var(--text-60)' }}
            >
              The first design system built for the AI era. Give LLMs programmatic access
              to query design decisions instead of hallucinating tokens.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/krishnanihar/origen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all"
                style={{
                  backgroundColor: 'var(--text-100)',
                  color: 'var(--bg-primary)'
                }}
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://mcp-alpha-green.vercel.app/api/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all"
                style={{
                  border: '1px solid var(--text-20)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <ExternalLink className="w-4 h-4" />
                Live MCP Endpoint
              </a>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              The Problem
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
                color: 'var(--text-60)',
                marginBottom: '2.5rem',
                maxWidth: '42rem',
              }}
            >
              LLMs hallucinate design decisions. They generate plausible-looking code with hardcoded colors
              like <code
                className="px-1.5 py-0.5 rounded text-red-400"
                style={{ backgroundColor: 'var(--glass-05)' }}
              >bg-red-500</code> instead
              of your semantic tokens.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)',
            }}>
              <div
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-50)' }}
                  >
                    Without Origen
                  </span>
                </div>
                <pre className="text-sm text-red-400/80 font-mono overflow-x-auto">{`<button className="bg-red-500
  text-white px-4 py-2 rounded">
  Delete
</button>

// Hardcoded values
// No semantic meaning
// Breaks with theme changes`}</pre>
              </div>

              <div
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-50)' }}
                  >
                    With Origen
                  </span>
                </div>
                <pre className="text-sm text-emerald-400/80 font-mono overflow-x-auto">{`<Button variant="destructive">
  Delete
</Button>

// Uses: var(--destructive)
// Semantic token
// Theme-aware`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Monorepo Architecture
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Three packages working together to bridge design and AI.
            </p>

            {/* Architecture Diagram */}
            <div
              className="p-8 rounded-2xl mb-8"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--glass-02)'
              }}
            >
              {/* Visual Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
                {packages.map((pkg, i) => (
                  <div key={pkg.name} className="flex items-center gap-4 md:gap-8">
                    <div
                      className="w-32 h-32 rounded-xl flex flex-col items-center justify-center p-4 transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${pkg.color}15`,
                        border: `1px solid ${pkg.color}40`
                      }}
                    >
                      <pkg.icon className="w-8 h-8 mb-2" style={{ color: pkg.color }} />
                      <span className="text-xs font-mono text-center" style={{ color: 'var(--text-70)' }}>
                        {pkg.name.split('/')[1]}
                      </span>
                    </div>
                    {i < packages.length - 1 && (
                      <ChevronRight className="hidden md:block w-6 h-6" style={{ color: 'var(--text-30)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Flow Description */}
              <div
                className="text-center text-sm"
                style={{ color: 'var(--text-50)' }}
              >
                <span style={{ color: packages[0].color }}>Tokens</span>
                {' → '}
                <span style={{ color: packages[1].color }}>Components</span>
                {' → '}
                <span style={{ color: packages[2].color }}>AI Interface</span>
              </div>
            </div>

            {/* Package Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="p-6 rounded-xl transition-all"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--glass-02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--glass-04)';
                    e.currentTarget.style.borderColor = `${pkg.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--glass-02)';
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${pkg.color}15` }}
                    >
                      <pkg.icon className="w-5 h-5" style={{ color: pkg.color }} />
                    </div>
                    <span className="font-mono text-sm" style={{ color: 'var(--text-90)' }}>
                      {pkg.name}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-50)' }}>
                    {pkg.desc}
                  </p>
                  <ul className="space-y-1">
                    {pkg.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-xs flex items-center gap-2"
                        style={{ color: 'var(--text-40)' }}
                      >
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: pkg.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MCP Tools */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              7 MCP Tools
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Expose your design system through the Model Context Protocol. Each tool returns typed,
              machine-parseable responses.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-6 rounded-xl transition-colors cursor-default group"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--glass-02)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-04)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-02)'}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{ backgroundColor: 'var(--glass-05)' }}
                    >
                      <tool.icon
                        className="w-5 h-5"
                        style={{ color: 'var(--text-70)' }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-mono text-sm mb-1"
                        style={{ color: 'var(--text-90)' }}
                      >
                        {tool.name}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{ color: 'var(--text-50)' }}
                      >
                        {tool.desc}
                      </p>
                      <code
                        className="text-xs font-mono block truncate"
                        style={{ color: 'var(--text-35)' }}
                      >
                        {tool.example}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MCP Resources */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Queryable Resources
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Access design data through URI-based resources. AI agents can directly query
              tokens and component specifications.
            </p>

            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--glass-02)'
              }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{
                  borderBottom: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-03)'
                }}
              >
                <Database className="w-4 h-4" style={{ color: 'var(--text-50)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-70)' }}>
                  MCP Resources
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border-primary)' }}>
                {resources.map((resource) => (
                  <div
                    key={resource.uri}
                    className="px-5 py-3 flex items-center justify-between hover:bg-[var(--glass-02)] transition-colors"
                  >
                    <code
                      className="font-mono text-sm"
                      style={{ color: '#3B82F6' }}
                    >
                      {resource.uri}
                    </code>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-40)' }}
                    >
                      {resource.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              How It Works
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Watch how Claude uses Origen to generate design-system-aware code.
            </p>

            {/* Conversation Demo */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--glass-02)'
              }}
            >
              {/* Chat Header */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{
                  borderBottom: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-03)'
                }}
              >
                <MessageSquare className="w-4 h-4" style={{ color: 'var(--text-50)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-70)' }}>
                  Claude + Origen Demo
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs" style={{ color: 'var(--text-40)' }}>Connected</span>
                </div>
              </div>

              {/* Conversation */}
              <div className="p-5 space-y-4">
                {conversationSteps.map((step, i) => (
                  <div key={i}>
                    {step.role === 'user' && (
                      <div className="flex gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: 'var(--glass-08)' }}
                        >
                          <User className="w-4 h-4" style={{ color: 'var(--text-60)' }} />
                        </div>
                        <div
                          className="px-4 py-2.5 rounded-xl rounded-tl-none max-w-md"
                          style={{ backgroundColor: 'var(--glass-05)' }}
                        >
                          <p className="text-sm" style={{ color: 'var(--text-80)' }}>
                            {step.message}
                          </p>
                        </div>
                      </div>
                    )}

                    {step.role === 'assistant' && step.thinking && (
                      <div className="flex gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: '#A855F720' }}
                        >
                          <Bot className="w-4 h-4" style={{ color: '#A855F7' }} />
                        </div>
                        <div className="space-y-2 max-w-lg">
                          <p
                            className="text-sm italic"
                            style={{ color: 'var(--text-50)' }}
                          >
                            {step.thinking}
                          </p>
                          <div
                            className="px-3 py-2 rounded-lg font-mono text-xs"
                            style={{
                              backgroundColor: '#10B98115',
                              border: '1px solid #10B98130'
                            }}
                          >
                            <span style={{ color: '#10B981' }}>→ </span>
                            <span style={{ color: 'var(--text-60)' }}>{step.tool}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.role === 'tool' && (
                      <div className="ml-11 max-w-lg">
                        <div
                          className="px-4 py-3 rounded-lg font-mono text-xs overflow-x-auto"
                          style={{
                            backgroundColor: 'var(--glass-03)',
                            border: '1px solid var(--border-primary)'
                          }}
                        >
                          <pre style={{ color: 'var(--text-60)' }}>{step.result}</pre>
                        </div>
                      </div>
                    )}

                    {step.role === 'assistant' && step.message && (
                      <div className="flex gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: '#A855F720' }}
                        >
                          <Bot className="w-4 h-4" style={{ color: '#A855F7' }} />
                        </div>
                        <div className="space-y-2 max-w-lg">
                          <p className="text-sm" style={{ color: 'var(--text-80)' }}>
                            {step.message}
                          </p>
                          <div
                            className="px-4 py-3 rounded-lg font-mono text-sm"
                            style={{
                              backgroundColor: 'var(--glass-03)',
                              border: '1px solid var(--border-primary)'
                            }}
                          >
                            <pre className="text-emerald-400">{step.code}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Components Gallery */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              5 React Components
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Production-ready components with full variant and size systems.
            </p>

            {/* Component Tabs */}
            <div
              className="flex gap-2 mb-6 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {components.map((comp, i) => (
                <button
                  key={comp.name}
                  onClick={() => setActiveComponent(i)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeComponent === i ? 'var(--glass-08)' : 'transparent',
                    color: activeComponent === i ? 'var(--text-primary)' : 'var(--text-50)',
                    border: activeComponent === i ? '1px solid var(--text-20)' : '1px solid transparent'
                  }}
                >
                  {comp.name}
                </button>
              ))}
            </div>

            {/* Active Component Display */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--glass-02)'
              }}
            >
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-03)'
                }}
              >
                <span className="font-mono text-sm" style={{ color: 'var(--text-70)' }}>
                  {components[activeComponent].name}
                </span>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-40)' }}>
                  <span>{components[activeComponent].variants.length} variants</span>
                  <span>{components[activeComponent].sizes.length} sizes</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Preview Area */}
                <div
                  className="p-8 flex items-center justify-center min-h-[200px]"
                  style={{ borderRight: '1px solid var(--border-primary)' }}
                >
                  {/* Button Preview */}
                  {components[activeComponent].name === 'Button' && (
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium"
                        style={{ backgroundColor: '#3B82F6', color: 'white' }}
                      >
                        Default
                      </button>
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium"
                        style={{ backgroundColor: '#EF4444', color: 'white' }}
                      >
                        Destructive
                      </button>
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium"
                        style={{ border: '1px solid var(--text-20)', color: 'var(--text-80)' }}
                      >
                        Outline
                      </button>
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium"
                        style={{ backgroundColor: 'var(--glass-08)', color: 'var(--text-80)' }}
                      >
                        Secondary
                      </button>
                    </div>
                  )}
                  {/* Input Preview */}
                  {components[activeComponent].name === 'Input' && (
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="px-4 py-2 rounded-md text-sm w-64 outline-none"
                      style={{
                        backgroundColor: 'var(--glass-03)',
                        border: '1px solid var(--border-primary)',
                        color: 'var(--text-80)'
                      }}
                    />
                  )}
                  {/* Card Preview */}
                  {components[activeComponent].name === 'Card' && (
                    <div
                      className="w-64 rounded-lg p-4"
                      style={{
                        backgroundColor: 'var(--glass-03)',
                        border: '1px solid var(--border-primary)'
                      }}
                    >
                      <h4 className="font-medium mb-1" style={{ color: 'var(--text-90)' }}>Card Title</h4>
                      <p className="text-sm" style={{ color: 'var(--text-50)' }}>Card description text goes here.</p>
                    </div>
                  )}
                  {/* Select Preview */}
                  {components[activeComponent].name === 'Select' && (
                    <div
                      className="w-48 px-4 py-2 rounded-md text-sm flex items-center justify-between"
                      style={{
                        backgroundColor: 'var(--glass-03)',
                        border: '1px solid var(--border-primary)',
                        color: 'var(--text-80)'
                      }}
                    >
                      <span>Select option...</span>
                      <ChevronRight className="w-4 h-4 rotate-90" style={{ color: 'var(--text-50)' }} />
                    </div>
                  )}
                  {/* Modal Preview */}
                  {components[activeComponent].name === 'Modal' && (
                    <div
                      className="w-72 rounded-lg p-5"
                      style={{
                        backgroundColor: 'var(--glass-05)',
                        border: '1px solid var(--border-primary)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                      }}
                    >
                      <h4 className="font-medium mb-2" style={{ color: 'var(--text-90)' }}>Modal Title</h4>
                      <p className="text-sm mb-4" style={{ color: 'var(--text-50)' }}>Modal content goes here.</p>
                      <div className="flex gap-2 justify-end">
                        <button
                          className="px-3 py-1.5 rounded text-sm"
                          style={{ color: 'var(--text-60)' }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1.5 rounded text-sm"
                          style={{ backgroundColor: '#3B82F6', color: 'white' }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Code Area */}
                <div className="p-5">
                  <pre
                    className="text-sm font-mono overflow-x-auto"
                    style={{ color: 'var(--text-60)' }}
                  >
                    {components[activeComponent].preview}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Tokens */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              W3C DTCG Tokens
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Design tokens following the W3C Design Tokens Community Group specification.
              Semantic tokens automatically adapt to light and dark themes.
            </p>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm" style={{ color: 'var(--text-50)' }}>Preview theme:</span>
              <button
                onClick={() => setShowDarkTokens(!showDarkTokens)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: 'var(--glass-05)',
                  border: '1px solid var(--border-primary)'
                }}
              >
                {showDarkTokens ? (
                  <>
                    <Moon className="w-4 h-4" style={{ color: 'var(--text-60)' }} />
                    <span style={{ color: 'var(--text-70)' }}>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" style={{ color: 'var(--text-60)' }} />
                    <span style={{ color: 'var(--text-70)' }}>Light</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Colors */}
              <div
                className="p-6 rounded-xl"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-02)'
                }}
              >
                <h3 className="font-medium mb-4" style={{ color: 'var(--text-80)' }}>
                  Colors
                </h3>
                <div className="space-y-3">
                  {Object.entries(showDarkTokens ? tokenExamples.colors.dark : tokenExamples.colors.light).map(([name, value]) => (
                    <div key={name} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-md"
                        style={{ backgroundColor: value, border: '1px solid var(--border-primary)' }}
                      />
                      <div>
                        <p className="text-sm font-mono" style={{ color: 'var(--text-70)' }}>{name}</p>
                        <p className="text-xs font-mono" style={{ color: 'var(--text-40)' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div
                className="p-6 rounded-xl"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-02)'
                }}
              >
                <h3 className="font-medium mb-4" style={{ color: 'var(--text-80)' }}>
                  Spacing
                </h3>
                <div className="space-y-2">
                  {tokenExamples.spacing.map((value, i) => (
                    <div key={value} className="flex items-center gap-3">
                      <div
                        className="h-4 rounded-sm"
                        style={{
                          width: value,
                          backgroundColor: '#3B82F6',
                          minWidth: '4px'
                        }}
                      />
                      <span className="text-xs font-mono" style={{ color: 'var(--text-50)' }}>
                        space-{i + 1}: {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div
                className="p-6 rounded-xl"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--glass-02)'
                }}
              >
                <h3 className="font-medium mb-4" style={{ color: 'var(--text-80)' }}>
                  Border Radius
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tokenExamples.radius.map((value) => (
                    <div key={value} className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 h-10"
                        style={{
                          backgroundColor: 'var(--glass-10)',
                          border: '1px solid var(--border-secondary)',
                          borderRadius: value === 'full' ? '9999px' : value
                        }}
                      />
                      <span className="text-xs font-mono" style={{ color: 'var(--text-40)' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Get Started
            </h2>
            <p
              className="mb-10 text-lg leading-relaxed"
              style={{ color: 'var(--text-60)' }}
            >
              Connect Origen to Claude Desktop in seconds.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Claude Desktop Config */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5" style={{ color: 'var(--text-60)' }} />
                  <h3 className="font-medium" style={{ color: 'var(--text-80)' }}>
                    Claude Desktop Configuration
                  </h3>
                </div>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--glass-02)'
                  }}
                >
                  <div
                    className="px-4 py-2 flex items-center justify-between"
                    style={{
                      borderBottom: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--glass-03)'
                    }}
                  >
                    <span className="text-xs font-mono" style={{ color: 'var(--text-50)' }}>
                      claude_desktop_config.json
                    </span>
                    <button
                      onClick={copyConfig}
                      className="p-1.5 rounded transition-colors hover:bg-[var(--glass-05)]"
                    >
                      {copiedConfig ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" style={{ color: 'var(--text-50)' }} />
                      )}
                    </button>
                  </div>
                  <pre
                    className="p-4 text-sm font-mono overflow-x-auto"
                    style={{ color: 'var(--text-60)' }}
                  >
                    {configJson}
                  </pre>
                </div>
              </div>

              {/* Steps */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5" style={{ color: 'var(--text-60)' }} />
                  <h3 className="font-medium" style={{ color: 'var(--text-80)' }}>
                    Quick Setup
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { step: 1, text: 'Open Claude Desktop settings' },
                    { step: 2, text: 'Navigate to MCP Servers configuration' },
                    { step: 3, text: 'Add the Origen server config (copy from left)' },
                    { step: 4, text: 'Restart Claude Desktop' },
                    { step: 5, text: 'Start querying your design system!' },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                        style={{
                          backgroundColor: 'var(--glass-05)',
                          color: 'var(--text-60)'
                        }}
                      >
                        {item.step}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-70)' }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
        }}>
          <div>
            <h2
              className="text-3xl font-bold mb-12"
              style={{ color: 'var(--text-primary)' }}
            >
              Roadmap
            </h2>

            <div className="space-y-6">
              {roadmap.map((item) => (
                <div
                  key={item.version}
                  className="p-6 rounded-xl transition-colors"
                  style={{
                    border: item.current ? '1px solid var(--text-20)' : '1px solid var(--border-primary)',
                    backgroundColor: item.current ? 'var(--glass-04)' : 'var(--glass-02)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono text-sm px-2 py-1 rounded"
                      style={{
                        backgroundColor: item.current ? 'var(--glass-10)' : 'var(--glass-05)',
                        color: item.current ? 'var(--text-primary)' : 'var(--text-50)'
                      }}
                    >
                      {item.version}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="font-medium"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.title}
                        </h3>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--text-40)' }}
                        >
                          {item.date}
                        </span>
                        {item.current && (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.items.map((i) => (
                          <span
                            key={i}
                            className="text-sm px-2 py-0.5 rounded"
                            style={{
                              color: 'var(--text-50)',
                              backgroundColor: 'var(--glass-03)'
                            }}
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack & Footer */}
        <section style={{
          maxWidth: 'min(900px, 90vw)',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-primary)',
          textAlign: 'center',
        }}>
          <div>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Built With
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['TypeScript', 'Model Context Protocol', 'React', 'W3C DTCG Tokens', 'Turborepo', 'Vercel', 'Base UI'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    color: 'var(--text-70)',
                    border: '1px solid var(--border-secondary)',
                    backgroundColor: 'var(--glass-02)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <p
              className="mt-16 text-sm"
              style={{ color: 'var(--text-40)' }}
            >
              A research project by Krishna Nihar Sunkara
            </p>

            <div className="mt-4 flex justify-center gap-8">
              <Link
                href="/"
                className="text-sm transition-colors"
                style={{ color: 'var(--text-50)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-80)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-50)'}
              >
                Portfolio
              </Link>
              <Link
                href="/work"
                className="text-sm transition-colors"
                style={{ color: 'var(--text-50)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-80)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-50)'}
              >
                Other Projects
              </Link>
              <Link
                href="/contact"
                className="text-sm transition-colors"
                style={{ color: 'var(--text-50)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-80)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-50)'}
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
