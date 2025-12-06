import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PHONE_BOOK } from './phone-codes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../_directives/click-outside.directive';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule,ClickOutsideDirective],
  selector: 'app-phone-dropdown',
  templateUrl: './phone-dropdown.component.html',
  styleUrl: './phone-dropdown.component.scss',
})
export class PhoneDropdownComponent implements OnInit {
  countries: any = PHONE_BOOK;
  filteredCountries: any = PHONE_BOOK;
  searchTerm = '';
  dropdownOpen = false;
  @Input() defaultCountryCode: string = '+44'; // Default to UK
  selectedCountry: any = PHONE_BOOK[231];
  @Output() countrySelected = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    // Find the country with the default code
    const defaultCountry = PHONE_BOOK.find((country: any) => 
      country.phone[0] === this.defaultCountryCode
    );
    if (defaultCountry) {
      this.selectedCountry = defaultCountry;
    }
    this.countrySelected.emit(this.selectedCountry);
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  closeDropdown() {
    this.dropdownOpen = false;
  }
  onSearch() {
    this.filteredCountries = this.countries.filter((country: any) =>
      country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
    this.countrySelected.emit(this.selectedCountry);
  }
}
