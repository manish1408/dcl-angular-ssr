import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AIAgencyComponent } from './ai-agency/ai-agency.component';
import { AiPoweredMvpDevelopmentComponent } from './solutions/ai-powered-mvp-development/ai-powered-mvp-development.component';
import { AiPoweredProductDevelopmentComponent } from './solutions/ai-powered-product-development/ai-powered-product-development.component';
import { RescueStuckProjectsComponent } from './solutions/rescue-stuck-projects/rescue-stuck-projects.component';
import { HireVibeCodersComponent } from './solutions/hire-vibe-coders/hire-vibe-coders.component';
import { HireFractionalCtoComponent } from './solutions/hire-fractional-cto/hire-fractional-cto.component';
import { HireAiMlExpertsComponent } from './solutions/hire-ai-ml-experts/hire-ai-ml-experts.component';
import { N8nMakeAutomationComponent } from './solutions/n8n-make-automation/n8n-make-automation.component';
import { EnterpriseAiAutomationComponent } from './solutions/enterprise-ai-automation/enterprise-ai-automation.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { ContactComponent } from './contact/contact.component';
import { BasicDetailsComponent } from './schedule-call/basic-details/basic-details.component';
import { BudgetComponent } from './schedule-call/budget/budget.component';
import { ContactInformationComponent } from './schedule-call/contact-information/contact-information.component';
import { DurationComponent } from './schedule-call/duration/duration.component';
import { ItProfessionalsComponent } from './schedule-call/it-professionals/it-professionals.component';
import { StartDateComponent } from './schedule-call/start-date/start-date.component';
import { TechnologiesComponent } from './schedule-call/technologies/technologies.component';
import { BlogDetailsComponent } from './blog-details/blog-details/blog-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ThankYouComponent } from './schedule-call/thank-you/thank-you.component';
import { AllLeadsComponent } from './schedule-call/all-leads/all-leads.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ExperiseComponent } from './expertise/expertise/expertise.component';
import { DclSprintComponent } from './dcl-sprint/dcl-sprint.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { AiDevelopmentComponent } from './ai-development/ai-development.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { RagAsAServiceComponent } from './products/rag-as-a-service/rag-as-a-service.component';
import { AiVoiceCallingAgentsComponent } from './products/ai-voice-calling-agents/ai-voice-calling-agents.component';
import { AiSearchImplementationComponent } from './products/ai-search-implementation/ai-search-implementation.component';
import { AiCustomerSupportComponent } from './products/ai-customer-support/ai-customer-support.component';
import { WhatsappBusinessAiAgentComponent } from './products/whatsapp-business-ai-agent/whatsapp-business-ai-agent.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'ai-development-services', 
    component: AIAgencyComponent,
  },
  { 
    path: 'ai-development-services/', 
    component: AIAgencyComponent,
  },
  { path: 'n8n-agency', component: AIAgencyComponent },
  { path: 'dcl-sprint', component: DclSprintComponent },
  { path: 'solutions/ai-powered-product-development', component: AiPoweredProductDevelopmentComponent },
  { path: 'solutions/rescue-stuck-projects', component: RescueStuckProjectsComponent },
  { path: 'solutions/hire-vibe-coders', component: HireVibeCodersComponent },
  { path: 'solutions/hire-fractional-cto', component: HireFractionalCtoComponent },
  { path: 'solutions/hire-ai-ml-experts', component: HireAiMlExpertsComponent },
  { path: 'solutions/n8n-make-automation', component: N8nMakeAutomationComponent },
  { path: 'solutions/enterprise-ai-automation', component: EnterpriseAiAutomationComponent }, 
  { path: 'solutions/:type', component: AiPoweredMvpDevelopmentComponent },
  { path: 'expertise/:type', component: ExperiseComponent },
  { path: 'case-studies', component: CaseStudiesComponent },
  { path: 'case-study/:type', component: CaseDetailsComponent },
  { path: 'portfolios', component: PortfolioComponent },
  { path: 'demo/:type', component: PortfolioDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogsComponent },
  { path: 'blog/:type', component: BlogDetailsComponent },
  { path: 'assessment/basic-details', component: BasicDetailsComponent },
  { path: 'assessment/basic-details/:id', component: BasicDetailsComponent },
  { path: 'schedule-call/budget/:id', component: BudgetComponent },
  {
    path: 'schedule-call/contact-information/:id',
    component: ContactInformationComponent,
  },
  { path: 'schedule-call/duration/:id', component: DurationComponent },
  {
    path: 'schedule-call/it-professionals/:id',
    component: ItProfessionalsComponent,
  },
  { path: 'schedule-call/start-date/:id', component: StartDateComponent },
  { path: 'schedule-call/technologies/:id', component: TechnologiesComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'all-leads', component: AllLeadsComponent },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsConditionsComponent,
  },
  { path: 'ai-development', component: AiDevelopmentComponent },
  { path: 'services/:slug', component: ServicePageComponent },
  { path: 'product/rag-as-a-service', component: RagAsAServiceComponent },
  { path: 'product/ai-voice-calling-agents', component: AiVoiceCallingAgentsComponent },
  { path: 'product/ai-search-implementation', component: AiSearchImplementationComponent },
  { path: 'product/ai-customer-support', component: AiCustomerSupportComponent },
  { path: 'product/whatsapp-business-ai-agent', component: WhatsappBusinessAiAgentComponent },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
];

export const ssrTracking: Routes = [
  { path: 'solutions/ai-powered-product-development', component: AiPoweredProductDevelopmentComponent },
  { path: 'solutions/rescue-stuck-projects', component: RescueStuckProjectsComponent },
  { path: 'solutions/hire-vibe-coders', component: HireVibeCodersComponent },
  { path: 'solutions/hire-fractional-cto', component: HireFractionalCtoComponent },
  { path: 'solutions/hire-ai-ml-experts', component: HireAiMlExpertsComponent },
  { path: 'solutions/n8n-make-automation', component: N8nMakeAutomationComponent },
  { path: 'solutions/enterprise-ai-automation', component: EnterpriseAiAutomationComponent },
  { path: 'solutions/:type', component: AiPoweredMvpDevelopmentComponent },
  { path: 'expertise/:type', component: ExperiseComponent },
  { path: 'case-studies', component: CaseStudiesComponent },
  { path: 'case-study/:type', component: CaseDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogsComponent },
  { path: 'blog/:type', component: BlogDetailsComponent },
  { path: 'portfolios', component: PortfolioComponent },
  { path: 'demo/:type', component: PortfolioDetailsComponent },
  { path: 'assessment/basic-details', component: BasicDetailsComponent },
  { path: 'assessment/basic-details/:id', component: BasicDetailsComponent },
  { path: 'schedule-call/budget/:id', component: BudgetComponent },
  {
    path: 'schedule-call/contact-information/:id',
    component: ContactInformationComponent,
  },
  { path: 'schedule-call/duration/:id', component: DurationComponent },
  {
    path: 'schedule-call/it-professionals/:id',
    component: ItProfessionalsComponent,
  },
  { path: 'schedule-call/start-date/:id', component: StartDateComponent },
  { path: 'schedule-call/technologies/:id', component: TechnologiesComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'dcl-sprint', component: DclSprintComponent },
  { path: 'ai-development', component: AiDevelopmentComponent },
  { path: 'services/:slug', component: ServicePageComponent },
];
