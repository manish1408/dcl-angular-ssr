import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
declare var Calendly: any; 
@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss',
})
export class BasicDetailsComponent implements OnInit {
  basicDetailsForm!: FormGroup;
  id!: string;
  isLoading: boolean = false;
  calendlyLink=environment.calendlyLink;

  industryList = [
    {"Code": 47,"Groups": "corp, fin","Description": "Accounting"},
    {"Code": 94,"Groups": "man, tech, tran","Description": "Airlines/Aviation"},
    {"Code": 120,"Groups": "leg, org","Description": "Alternative Dispute Resolution"},
    {"Code": 125,"Groups": "hlth","Description": "Alternative Medicine"},
    {"Code": 127,"Groups": "art, med","Description": "Animation"},
    {"Code": 19,"Groups": "good","Description": "Apparel & Fashion"},
    {"Code": 50,"Groups": "cons","Description": "Architecture & Planning"},
    {"Code": 111,"Groups": "art, med, rec","Description": "Arts and Crafts"},
    {"Code": 53,"Groups": "man","Description": "Automotive"},
    {"Code": 52,"Groups": "gov, man","Description": "Aviation & Aerospace"},
    {"Code": 41,"Groups": "fin","Description": "Banking"},
    {"Code": 12,"Groups": "gov, hlth, tech","Description": "Biotechnology"},
    {"Code": 36,"Groups": "med, rec","Description": "Broadcast Media"},
    {"Code": 49,"Groups": "cons","Description": "Building Materials"},
    {"Code": 138,"Groups": "corp, man","Description": "Business Supplies and Equipment"},
    {"Code": 129,"Groups": "fin","Description": "Capital Markets"},
    {"Code": 54,"Groups": "man","Description": "Chemicals"},
    {"Code": 90,"Groups": "org, serv","Description": "Civic & Social Organization"},
    {"Code": 51,"Groups": "cons, gov","Description": "Civil Engineering"},
    {"Code": 128,"Groups": "cons, corp, fin","Description": "Commercial Real Estate"},
    {"Code": 118,"Groups": "tech","Description": "Computer & Network Security"},
    {"Code": 109,"Groups": "med, rec","Description": "Computer Games"},
    {"Code": 3,"Groups": "tech","Description": "Computer Hardware"},
    {"Code": 5,"Groups": "tech","Description": "Computer Networking"},
    {"Code": 4,"Groups": "tech","Description": "Computer Software"},
    {"Code": 48,"Groups": "cons","Description": "Construction"},
    {"Code": 24,"Groups": "good, man","Description": "Consumer Electronics"},
    {"Code": 25,"Groups": "good, man","Description": "Consumer Goods"},
    {"Code": 91,"Groups": "org, serv","Description": "Consumer Services"},
    {"Code": 18,"Groups": "good","Description": "Cosmetics"},
    {"Code": 65,"Groups": "agr","Description": "Dairy"},
    {"Code": 1,"Groups": "gov, tech","Description": "Defense & Space"},
    {"Code": 99,"Groups": "art, med","Description": "Design"},
    {"Code": 69,"Groups": "edu","Description": "Education Management"},
    {"Code": 132,"Groups": "edu, org","Description": "E-Learning"},
    {"Code": 112,"Groups": "good, man","Description": "Electrical/Electronic Manufacturing"},
    {"Code": 28,"Groups": "med, rec","Description": "Entertainment"},
    {"Code": 86,"Groups": "org, serv","Description": "Environmental Services"},
    {"Code": 110,"Groups": "corp, rec, serv","Description": "Events Services"},
    {"Code": 76,"Groups": "gov","Description": "Executive Office"},
    {"Code": 122,"Groups": "corp, serv","Description": "Facilities Services"},
    {"Code": 63,"Groups": "agr","Description": "Farming"},
    {"Code": 43,"Groups": "fin","Description": "Financial Services"},
    {"Code": 38,"Groups": "art, med, rec","Description": "Fine Art"},
    {"Code": 66,"Groups": "agr","Description": "Fishery"},
    {"Code": 34,"Groups": "rec, serv","Description": "Food & Beverages"},
    {"Code": 23,"Groups": "good, man, serv","Description": "Food Production"},
    {"Code": 101,"Groups": "org","Description": "Fund-Raising"},
    {"Code": 26,"Groups": "good, man","Description": "Furniture"},
    {"Code": 29,"Groups": "rec","Description": "Gambling & Casinos"},
    {"Code": 145,"Groups": "cons, man","Description": "Glass, Ceramics & Concrete"},
    {"Code": 75,"Groups": "gov","Description": "Government Administration"},
    {"Code": 148,"Groups": "gov","Description": "Government Relations"},
    {"Code": 140,"Groups": "art, med","Description": "Graphic Design"},
    {"Code": 124,"Groups": "hlth, rec","Description": "Health, Wellness and Fitness"},
    {"Code": 68,"Groups": "edu","Description": "Higher Education"},
    {"Code": 14,"Groups": "hlth","Description": "Hospital & Health Care"},
    {"Code": 31,"Groups": "rec, serv, tran","Description": "Hospitality"},
    {"Code": 137,"Groups": "corp","Description": "Human Resources"},
    {"Code": 134,"Groups": "corp, good, tran","Description": "Import and Export"},
    {"Code": 88,"Groups": "org, serv","Description": "Individual & Family Services"},
    {"Code": 147,"Groups": "cons, man","Description": "Industrial Automation"},
    {"Code": 84,"Groups": "med, serv","Description": "Information Services"},
    {"Code": 96,"Groups": "tech","Description": "Information Technology and Services"},
    {"Code": 42,"Groups": "fin","Description": "Insurance"},
    {"Code": 74,"Groups": "gov","Description": "International Affairs"},
    {"Code": 141,"Groups": "gov, org, tran","Description": "International Trade and Development"},
    {"Code": 6,"Groups": "tech","Description": "Internet"},
    {"Code": 45,"Groups": "fin","Description": "Investment Banking"},
    {"Code": 46,"Groups": "fin","Description": "Investment Management"},
    {"Code": 73,"Groups": "gov, leg","Description": "Judiciary"},
    {"Code": 77,"Groups": "gov, leg","Description": "Law Enforcement"},
    {"Code": 9,"Groups": "leg","Description": "Law Practice"},
    {"Code": 10,"Groups": "leg","Description": "Legal Services"},
    {"Code": 72,"Groups": "gov, leg","Description": "Legislative Office"},
    {"Code": 30,"Groups": "rec, serv, tran","Description": "Leisure, Travel & Tourism"},
    {"Code": 85,"Groups": "med, rec, serv","Description": "Libraries"},
    {"Code": 116,"Groups": "corp, tran","Description": "Logistics and Supply Chain"},
    {"Code": 143,"Groups": "good","Description": "Luxury Goods & Jewelry"},
    {"Code": 55,"Groups": "man","Description": "Machinery"},
    {"Code": 11,"Groups": "corp","Description": "Management Consulting"},
    {"Code": 95,"Groups": "tran","Description": "Maritime"},
    {"Code": 97,"Groups": "corp","Description": "Market Research"},
    {"Code": 80,"Groups": "corp, med","Description": "Marketing and Advertising"},
    {"Code": 135,"Groups": "cons, gov, man","Description": "Mechanical or Industrial Engineering"},
    {"Code": 126,"Groups": "med, rec","Description": "Media Production"},
    {"Code": 17,"Groups": "hlth","Description": "Medical Devices"},
    {"Code": 13,"Groups": "hlth","Description": "Medical Practice"},
    {"Code": 139,"Groups": "hlth","Description": "Mental Health Care"},
    {"Code": 71,"Groups": "gov","Description": "Military"},
    {"Code": 56,"Groups": "man","Description": "Mining & Metals"},
    {"Code": 35,"Groups": "art, med, rec","Description": "Motion Pictures and Film"},
    {"Code": 37,"Groups": "art, med, rec","Description": "Museums and Institutions"},
    {"Code": 115,"Groups": "art, rec","Description": "Music"},
    {"Code": 114,"Groups": "gov, man, tech","Description": "Nanotechnology"},
    {"Code": 81,"Groups": "med, rec","Description": "Newspapers"},
    {"Code": 100,"Groups": "org","Description": "Non-Profit Organization Management"},
    {"Code": 57,"Groups": "man","Description": "Oil & Energy"},
    {"Code": 113,"Groups": "med","Description": "Online Media"},
    {"Code": 123,"Groups": "corp","Description": "Outsourcing/Offshoring"},
    {"Code": 87,"Groups": "serv, tran","Description": "Package/Freight Delivery"},
    {"Code": 146,"Groups": "good, man","Description": "Packaging and Containers"},
    {"Code": 61,"Groups": "man","Description": "Paper & Forest Products"},
    {"Code": 39,"Groups": "art, med, rec","Description": "Performing Arts"},
    {"Code": 15,"Groups": "hlth, tech","Description": "Pharmaceuticals"},
    {"Code": 131,"Groups": "org","Description": "Philanthropy"},
    {"Code": 136,"Groups": "art, med, rec","Description": "Photography"},
    {"Code": 117,"Groups": "man","Description": "Plastics"},
    {"Code": 107,"Groups": "gov, org","Description": "Political Organization"},
    {"Code": 67,"Groups": "edu","Description": "Primary/Secondary Education"},
    {"Code": 83,"Groups": "med, rec","Description": "Printing"},
    {"Code": 105,"Groups": "corp","Description": "Professional Training & Coaching"},
    {"Code": 102,"Groups": "corp, org","Description": "Program Development"},
    {"Code": 79,"Groups": "gov","Description": "Public Policy"},
    {"Code": 98,"Groups": "corp","Description": "Public Relations and Communications"},
    {"Code": 78,"Groups": "gov","Description": "Public Safety"},
    {"Code": 82,"Groups": "med, rec","Description": "Publishing"},
    {"Code": 62,"Groups": "man","Description": "Railroad Manufacture"},
    {"Code": 64,"Groups": "agr","Description": "Ranching"},
    {"Code": 44,"Groups": "cons, fin, good","Description": "Real Estate"},
    {"Code": 40,"Groups": "rec, serv","Description": "Recreational Facilities and Services"},
    {"Code": 89,"Groups": "org, serv","Description": "Religious Institutions"},
    {"Code": 144,"Groups": "gov, man, org","Description": "Renewables & Environment"},
    {"Code": 70,"Groups": "edu, gov","Description": "Research"},
    {"Code": 32,"Groups": "rec, serv","Description": "Restaurants"},
    {"Code": 27,"Groups": "good, man","Description": "Retail"},
    {"Code": 121,"Groups": "corp, org, serv","Description": "Security and Investigations"},
    {"Code": 7,"Groups": "tech","Description": "Semiconductors"},
    {"Code": 58,"Groups": "man","Description": "Shipbuilding"},
    {"Code": 20,"Groups": "good, rec","Description": "Sporting Goods"},
    {"Code": 33,"Groups": "rec","Description": "Sports"},
    {"Code": 104,"Groups": "corp","Description": "Staffing and Recruiting"},
    {"Code": 22,"Groups": "good","Description": "Supermarkets"},
    {"Code": 8,"Groups": "gov, tech","Description": "Telecommunications"},
    {"Code": 60,"Groups": "man","Description": "Textiles"},
    {"Code": 130,"Groups": "gov, org","Description": "Think Tanks"},
    {"Code": 21,"Groups": "good","Description": "Tobacco"},
    {"Code": 108,"Groups": "corp, gov, serv","Description": "Translation and Localization"},
    {"Code": 92,"Groups": "tran","Description": "Transportation/Trucking/Railroad"},
    {"Code": 59,"Groups": "man","Description": "Utilities"},
    {"Code": 106,"Groups": "fin, tech","Description": "Venture Capital & Private Equity"},
    {"Code": 16,"Groups": "hlth","Description": "Veterinary"},
    {"Code": 93,"Groups": "tran","Description": "Warehousing"},
    {"Code": 133,"Groups": "good","Description": "Wholesale"},
    {"Code": 142,"Groups": "good, man, rec","Description": "Wine and Spirits"},
    {"Code": 119,"Groups": "tech","Description": "Wireless"},
    {"Code": 103,"Groups": "art, med, rec","Description": "Writing and Editing"}
   ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.basicDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      serviceMessage: ['', [Validators.required]],
      challenges: [''],
      industry:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initializeCalendly();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    // get api
    if (this.id) {
      this.isLoading = true;
      this.formDataService.getScheduleCallById(this.id).subscribe((res) => {
        this.isLoading = false;
        this.basicDetailsForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          serviceMessage: res.data.serviceMessage,
          challenges: res.data.challenges,
        });
      });
    }
  }
  initializeCalendly(): void {
    Calendly.initInlineWidget({
      url: this.calendlyLink, 
      parentElement: document.getElementById('calendly-inline-widget'), 
      prefill: {},
      utm: {}
    });

  }

  hasError(controlName: keyof typeof this.basicDetailsForm.controls) {
    const control = this.basicDetailsForm.controls[controlName];
    return control.invalid && control.touched;
  }
  hasEmailFormatError() {
    return (
      this.basicDetailsForm.controls['email'].hasError('email') &&
      this.basicDetailsForm.controls['email'].touched
    );
  }

  model: any;

	 search(text$: Observable<string>):any{
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.industryList.filter((v) => v.Description.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
  }
  onSubmit() {
    this.basicDetailsForm.markAllAsTouched();
    if (this.basicDetailsForm.valid) {

      const data = 
        {
          "name": this.basicDetailsForm.value.name,
          "email": this.basicDetailsForm.value.email,
          "businessAbout": this.basicDetailsForm.value.serviceMessage,
          "businessChallenges": this.basicDetailsForm.value.challenges,
          "businessIndustry": this.basicDetailsForm.value.industry
      }
      

      this.formDataService
        .saveScheduleCall(data)
        .subscribe((res) => {
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigateByUrl('/thank-you');
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };

      this.formDataService.setFormData(this.basicDetailsForm.value);
    } else if (this.basicDetailsForm.invalid) {
      if (this.basicDetailsForm.controls['email'].errors?.['email']) {
        this.toastr.error('Invalid email format');
      } else {
        this.toastr.error('Please provide all the details');
      }
    }
  }
}
