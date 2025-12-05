import { MegaMenuItem } from './megamenu.component';

export const MEGAMENU_CONFIG: MegaMenuItem[] = [
  {
    title: 'Services', 
    children: [
      {
        title: 'AI Services',
        items: [
          {
            title: 'Large Language Model & GPT Integration Services',
            routerLink: ['/services/llm-integration'],
            description: 'Integrate advanced LLM capabilities into your applications'
          },
          {
            title: 'AI-Powered App and Web Development Services',
            routerLink: ['/services/ai-app-development'],
            description: 'Build intelligent applications with AI at their core'
          },
          {
            title: 'Machine Learning Product Development Services',
            routerLink: ['/services/machine-learning'],
            description: 'Create ML-powered products and solutions'
          },
          {
            title: 'Agentic AI Development Services',
            routerLink: ['/services/agentic-ai'],
            description: 'Develop autonomous AI agents for your business'
          },
          {
            title: 'Generative AI Development Services',
            routerLink: ['/services/generative-ai'],
            description: 'Leverage generative AI for content and innovation'
          }
        ]
      },
      {
        title: 'Solutions',
        items: [
          {
            title: 'AI Integration Solutions',
            routerLink: ['/solutions/ai-integration'],
            description: 'Comprehensive AI integration services'
          },
          {
            title: 'Enterprise AI Solutions',
            routerLink: ['/solutions/enterprise-ai'],
            description: 'Scalable AI solutions for enterprises'
          }
        ]
      }
    ]
  },
  {
    title: 'Products',
    children: [
      {
        title: 'Our Products',
        items: [
          {
            title: 'Milo Assistant',
            routerLink: ['/product/milo'],
            description: 'AI-powered assistant for your business needs'
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Resources',
        items: [
          {
            title: 'Case Studies',
            routerLink: ['/case-studies'],
            description: 'Explore our successful projects and client stories'
          },
          {
            title: 'Demos',
            routerLink: ['/portfolios'],
            description: 'See our work in action'
          },
          {
            title: 'Blog',
            routerLink: ['/blog'],
            description: 'Latest insights and updates'
          }
        ]
      },
      {
        title: 'Company Info',
        items: [
          {
            title: 'Contact',
            routerLink: ['/contact'],
            description: 'Get in touch with our team'
          },
          {
            title: 'Privacy Policy',
            routerLink: ['/privacy-policy'],
            description: 'Our privacy policy and data protection'
          },
          {
            title: 'Terms and Conditions',
            routerLink: ['/terms-and-conditions'],
            description: 'Terms of service and usage'
          }
        ]
      }
    ]
  }
];

