import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OurServicesService } from '../../services/our-services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  serviceNav: any[] = [];
  productNav = [
    {
      title: 'Milo',
      slug: 'milo',
    },
  ];
  constructor(private ourServicesService: OurServicesService) {}

  hideSidebar() {
    const sidebar = document.querySelector('.sidebar-menu') as HTMLElement;
    sidebar.classList.remove('active');
  }

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.ourServicesService.getServices().subscribe((resp: any) => {
      const res = resp.items.map((item: any) => ({
        title: item.data.pageTitle.iv,
        slug: item.data.slug.iv,
      }));
      console.log(res);
      this.serviceNav = res;
    });
  }
}
