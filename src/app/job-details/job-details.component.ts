import { Component, ElementRef, OnInit } from '@angular/core';
import { CareersService } from '../services/careers.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PhoneDropdownComponent } from '../common/phone-dropdown/phone-dropdown.component';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, PhoneDropdownComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  constructor(
    private careersService: CareersService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {}

  job: any;
  jobs: any[] = [];
  slugName: string = '';
  imgCDN: string = environment.squidexAssets;
  isLoading: boolean = false;
  showApplyModal: boolean = false;
  applicationForm!: FormGroup;
  selectedCountry: any;
  resumeFile: File | null = null;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      coverLetter: ['']
    });

    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];

      this.careersService.getJobBySlug(this.slugName).subscribe({
        next: (resp: any) => {
          if (resp?.items && resp.items.length > 0) {
            this.job = resp.items[0].data;
            this.updateMetaTags(resp.items[0].data);
            this.getAllJobs();
          } else {
            this.job = this.getSampleJob();
            this.getAllJobs();
          }
          this.isLoading = false;
        },
        error: () => {
          this.job = this.getSampleJob();
          this.getAllJobs();
          this.isLoading = false;
        }
      });

      if (typeof window !== 'undefined') {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  getAllJobs() {
    this.careersService.fetchJobs().subscribe({
      next: (resp: any) => {
        this.jobs = resp?.items?.filter((item: any) => {
          return item.data.slug?.iv !== this.slugName;
        }) || [];
        this.jobs = this.jobs.slice(0, 3);
      },
      error: () => {
        this.jobs = this.getSampleJobs().filter((item: any) => {
          return item.data.slug?.iv !== this.slugName;
        }).slice(0, 3);
      }
    });
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#job-details-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateMetaTags(job: any) {
    const sanitizedContent = this.stripHtmlTags(job.description?.iv || '');
    this.title.setTitle(`Distinct Cloud Labs | ${job.title?.iv || 'Career Opportunity'}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `Distinct Cloud Labs | ${job.title?.iv || 'Career Opportunity'}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${job.title?.iv || 'Career Opportunity'}`,
      },
      {
        property: "twitter:description",
        content: sanitizedContent.substring(0, 160),
      },
    ]);
  }

  stripHtmlTags(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  private getSampleJob() {
    return {
      title: { iv: 'Senior AI Engineer' },
      description: { iv: 'Join our team to build cutting-edge AI solutions and work on innovative projects that transform businesses.' },
      thumbnail: { iv: [''] },
      applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
      slug: { iv: this.slugName },
      requirements: { iv: ['5+ years of experience in AI/ML', 'Strong Python skills', 'Experience with TensorFlow or PyTorch', 'Excellent problem-solving abilities'] },
      techStack: { iv: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes'] },
      whatWeOffer: { iv: ['Competitive salary', 'Health insurance', 'Remote work options', 'Professional development', 'Flexible hours'] },
      salary: { iv: '$120,000 - $180,000' },
      location: { iv: 'Remote / Hybrid' },
      type: { iv: 'Full-time' }
    };
  }

  private getSampleJobs() {
    return [
      {
        data: {
          title: { iv: 'Senior AI Engineer' },
          description: { iv: 'Join our team to build cutting-edge AI solutions and work on innovative projects that transform businesses.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'senior-ai-engineer' }
        }
      },
      {
        data: {
          title: { iv: 'Full Stack Developer' },
          description: { iv: 'Develop scalable web applications using modern technologies and contribute to our growing product portfolio.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'full-stack-developer' }
        }
      },
      {
        data: {
          title: { iv: 'Machine Learning Specialist' },
          description: { iv: 'Design and implement ML models that solve real-world problems and drive business value for our clients.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'machine-learning-specialist' }
        }
      }
    ];
  }

  openApplyModal() {
    this.showApplyModal = true;
  }

  closeApplyModal() {
    this.showApplyModal = false;
    this.applicationForm.reset();
    this.resumeFile = null;
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }

  onResumeSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('Resume file size should be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        this.toastr.error('Please upload a PDF or Word document');
        return;
      }
      this.resumeFile = file;
    }
  }

  hasError(controlName: keyof typeof this.applicationForm.controls) {
    const control = this.applicationForm.controls[controlName];
    return control.invalid && control.touched;
  }

  hasEmailFormatError() {
    return (
      this.applicationForm.controls['email'].hasError('email') &&
      this.applicationForm.controls['email'].touched
    );
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  onSubmitApplication() {
    this.applicationForm.markAllAsTouched();
    
    if (this.applicationForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    if (!this.resumeFile) {
      this.toastr.error('Please upload your resume');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('name', this.applicationForm.value.name);
    formData.append('email', this.applicationForm.value.email);
    formData.append('phone', this.selectedCountry?.phone?.[0] + this.applicationForm.value.phone);
    formData.append('coverLetter', this.applicationForm.value.coverLetter || '');
    formData.append('jobTitle', this.job?.title?.iv || '');
    formData.append('jobSlug', this.slugName);
    formData.append('resume', this.resumeFile);
    formData.append('type', 'job_application');

    const applicationData = {
      name: this.applicationForm.value.name,
      email: this.applicationForm.value.email,
      phone: this.selectedCountry?.phone?.[0] + this.applicationForm.value.phone,
      coverLetter: this.applicationForm.value.coverLetter || '',
      jobTitle: this.job?.title?.iv || '',
      jobSlug: this.slugName,
      type: 'job_application'
    };

    this.contactService.postContact(applicationData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res.success) {
          this.toastr.success('Application submitted successfully!');
          this.closeApplyModal();
        } else {
          this.toastr.error('An error occurred while submitting your application');
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastr.error('An error occurred while submitting your application');
      }
    });
  }
}
