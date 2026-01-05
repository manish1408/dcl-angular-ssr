import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PhoneDropdownComponent } from '../common/phone-dropdown/phone-dropdown.component';
import { ScheduleCallCTAComponent } from '../common/schedule-call-cta/schedule-call-cta.component';
import { HomeService } from '../services/home.service';

declare var Swiper: any;

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule, PhoneDropdownComponent, ScheduleCallCTAComponent],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export class PortfolioDetailsComponent implements OnInit {
  constructor(
    private caseStudyService: CaseStudyService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private common: CommonService,
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private homeService: HomeService
  ) {}
  post: any;
  posts: any = [];
  slugName: string = '';
  imgCDN: string = environment.squidexAssets;
  isLoading: boolean = false;
  timeline:any;
  showLeadModal: boolean = false;
  leadForm!: FormGroup;
  isSubmittingLead: boolean = false;
  selectedCountry: any;
  readonly LEAD_STORAGE_KEY = 'portfolio_lead_submitted';
  showVideoModal: boolean = false;
  videoUrl: string = '';
  ctaDetails: any = [];

  async ngOnInit() {
    // Initialize the form
    this.initLeadForm();
    
    // Check if lead information has already been collected
    if (this.common.isBrowser()) {
      const leadSubmitted = localStorage.getItem(this.LEAD_STORAGE_KEY);
      if (!leadSubmitted) {
        this.showLeadModal = true;
        this.updateModalState();
      }
    }

    this.getCTA();

    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];

      this.caseStudyService
        .getPortfolioBySlug(this.slugName)
        .subscribe((resp: any) => {
          this.post = resp?.items[0].data;
          this.updateMetaTags(resp?.items[0].data);
          this.isLoading = false;
          
        });
      if (this.common.isBrowser()) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  getCTA() {
    this.homeService.getCTA().then((res) => {
      this.ctaDetails = res.items;
    });
  }

  initLeadForm() {
    this.leadForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]],
    });
  }

  hasError(controlName: keyof typeof this.leadForm.controls) {
    const control = this.leadForm.controls[controlName];
    return control.invalid && control.touched;
  }

  hasEmailFormatError() {
    return (
      this.leadForm.controls['email'].hasError('email') &&
      this.leadForm.controls['email'].touched
    );
  }

  onSubmitLead() {
    this.isSubmittingLead = true;
    this.leadForm.markAllAsTouched();

    if (this.leadForm.invalid || !this.selectedCountry) {
      this.isSubmittingLead = false;
      this.toastr.error('Please provide all the details');
      return;
    }

    const leadData = {
      ...this.leadForm.value,
      phone: this.selectedCountry?.phone[0] + ' ' + this.leadForm.value.phone,
      subject: 'Portfolio Details Lead',
      message: 'User viewed portfolio details page'
    };

    this.contactService.postContact(leadData).subscribe(
      (res: any) => {
        this.isSubmittingLead = false;
        if (res.success) {
          // Store in localStorage to prevent showing modal again
          if (this.common.isBrowser()) {
            localStorage.setItem(this.LEAD_STORAGE_KEY, 'true');
          }
          this.showLeadModal = false;
          this.updateModalState();
          this.toastr.success('Thank you for your interest!');
        } else {
          this.toastr.error('An error occurred while submitting');
        }
      },
      (error) => {
        this.isSubmittingLead = false;
        console.error('Error occurred:', error);
        this.toastr.error('An error occurred while submitting');
      }
    );
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  updateModalState() {
    if (this.common.isBrowser()) {
      if (this.showLeadModal) {
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
      } else {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }
    }
  }

  onGoBack() {
    this.showLeadModal = false;
    this.updateModalState();
    
    if (this.common.isBrowser()) {
      const currentUrl = window.location.pathname;
      
      // Check if there's history to go back to
      if (window.history.length > 1) {
        // Try to get referrer URL
        try {
          const referrer = document.referrer;
          if (referrer) {
            const referrerUrl = new URL(referrer);
            const referrerPath = referrerUrl.pathname;
            
            // If referrer path is different from current path, go back
            if (referrerPath !== currentUrl && referrerPath !== '') {
              this.location.back();
              return;
            }
          }
        } catch (e) {
          // If URL parsing fails, try going back anyway
          this.location.back();
          return;
        }
      }
      
      // If we reach here, either no history or previous route is same as current
      // Navigate to portfolios page
      this.router.navigate(['/portfolios']);
    }
  }


  scrollToSection() {
    const section = this.el.nativeElement.querySelector(
      '#case-details-section1'
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateMetaTags(blog: any) {
    const sanitizedContent = this.stripHtmlTags(blog.description.iv);
    this.title.setTitle(`Distinct Cloud Labs |  ${blog.title.iv}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `Distinct Cloud Labs | ${blog.title.iv}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${blog.title.iv}`,
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


  getThumbnailImageUrl(): string {
    if (this.post?.thumbnailImage?.iv && this.post.thumbnailImage.iv.length > 0) {
      return 'https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/' + this.post.thumbnailImage.iv[0];
    }
    return '';
  }

  getVideoUrl(): string {
    if (this.post?.video?.iv && this.post.video.iv.length > 0) {
      return this.imgCDN + this.post.video.iv[0];
    }
    return '';
  }

  getImageUrl(index: number): string {
    if (this.post?.image?.iv && this.post.image.iv.length > index) {
      return 'https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/' + this.post.image.iv[index];
    }
    return '';
  }

  openVideoModal() {
    this.videoUrl = this.getVideoUrl();
    if (this.videoUrl) {
      this.showVideoModal = true;
      this.updateVideoModalState();
      if (this.common.isBrowser()) {
        // Small delay to ensure modal is rendered before loading video
        setTimeout(() => {
          const videoElement = document.getElementById('portfolio-video-player') as HTMLVideoElement;
          if (videoElement) {
            videoElement.load();
          }
        }, 100);
      }
    }
  }

  closeVideoModal() {
    this.showVideoModal = false;
    this.updateVideoModalState();
    if (this.common.isBrowser()) {
      const videoElement = document.getElementById('portfolio-video-player') as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
  }

  updateVideoModalState() {
    if (this.common.isBrowser()) {
      if (this.showVideoModal) {
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
      } else {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }
    }
  }
 
}
