import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TestimonialServiceMilo } from "../../services/testimonial.service.Milo";
import { OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-testimonial",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./testimonial.component.html",
  styleUrl: "./testimonial.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent implements OnInit {
  testimonials: any[] = [];
  isLoading: boolean = true;
  skeletonArray = new Array(3);
  slidesPerView: number = 2;
  screenWidth!: number;

  @HostListener("window:resize")
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth >= 480 && this.screenWidth <= 992) {
      this.slidesPerView = 2;
    }
  }

  constructor(
    private testimonialServiceMilo: TestimonialServiceMilo,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getScreenWidth();
    this.getTestimonials();
  }
  // sanitizeHtml(htmlContent: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  // }

  sanitizeHtml(htmlContent: string): SafeHtml {
  // Parse the HTML content
  const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
  
  // Select all images
  const images = doc.querySelectorAll('img');
  
  // Apply fixed dimensions to each image
  images.forEach(img => {
    img.setAttribute('width', '70');
    img.setAttribute('height', '20');
    
    // Optional: Add CSS to ensure dimensions are applied
    // img.style.width = '312px';
    // img.style.height = '220px';
    // img.style.objectFit = 'cover'; // Ensures image fills the space without distortion
  });
  
  // Convert back to HTML string and sanitize
  const modifiedHtml = doc.body.innerHTML;
  return this.sanitizer.bypassSecurityTrustHtml(modifiedHtml);
}

  getTestimonials(): void {
    this.testimonialServiceMilo.getTestimonials().subscribe((response: any) => {
      console.log("resp", response);
      this.testimonials = response?.items || [];
      this.isLoading = false;
    });
  }
  getInitials(name: string): string {
    if (!name) {
      return ""; // Fallback if name is not available
    }
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials.toUpperCase();
  }
}
