import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {  IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [RouterModule, CommonModule, NgMultiSelectDropDownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent implements OnInit{
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  requirementForm :FormGroup = new FormGroup({
  
      selectedItems: new FormControl('')
  
  })
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
      // { item_id: 6, item_text: 'Amazon EC2' },
      // { item_id: 7, item_text: 'Amazon ECS' },
      // { item_id: 8, item_text: 'Angular 2' },
      // { item_id: 9, item_text: 'Angular JS' },
      // { item_id: 10, item_text: 'Ansible' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings.IDropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
