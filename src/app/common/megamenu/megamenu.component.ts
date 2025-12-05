import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MegaMenuItem {
  title: string;
  link?: string;
  routerLink?: string[];
  children?: MegaMenuColumn[];
  rightPanel?: MegaMenuRightPanel;
}

export interface MegaMenuColumn {
  title?: string;
  items?: MegaMenuLink[];
  sections?: MegaMenuSection[];
  guide?: MegaMenuGuide;
}

export interface MegaMenuLink {
  title: string;
  link?: string;
  routerLink?: string[];
  description?: string;
  icon?: string;
  iconColor?: string;
  showExternalIcon?: boolean;
  imageUrl?: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuLink[];
}

export interface MegaMenuGuide {
  question: string;
  linkText: string;
  routerLink?: string[];
  link?: string;
}

export interface MegaMenuRightPanel {
  title: string;
  description: string;
  imageUrl?: string;
  notifications?: any[];
}

@Component({
  selector: 'app-megamenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.scss'
})
export class MegamenuComponent implements OnInit, OnChanges {
  @Input() menuItems: MegaMenuItem[] = [];
  @Input() isOpen: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<MegaMenuItem>();
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();

  activeItem: number | null = null;
  hoveredImageUrl: string | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Auto-select first item if only one menu item is provided
    if (this.menuItems.length === 1) {
      this.activeItem = 0;
    }
  }

  ngOnChanges() {
    // Reset active item when menu items change
    if (this.menuItems.length === 1) {
      this.activeItem = 0;
    } else if (this.menuItems.length > 0 && this.activeItem === null) {
      this.activeItem = 0;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu.emit();
    }
  }

  onMouseEnter() {
    this.mouseEnter.emit();
  }

  onMouseLeave() {
    this.mouseLeave.emit();
  }

  setActiveItem(index: number | null) {
    this.activeItem = index;
  }

  onMenuItemClick(item: MegaMenuItem) {
    this.menuItemClick.emit(item);
    if (item.routerLink || item.link) {
      this.closeMenu.emit();
    }
  }

  onLinkClick() {
    this.closeMenu.emit();
  }

  onMenuItemHover(imageUrl: string | undefined) {
    if (imageUrl) {
      this.hoveredImageUrl = imageUrl;
    }
  }

  onMenuItemLeave() {
    this.hoveredImageUrl = null;
  }
}

