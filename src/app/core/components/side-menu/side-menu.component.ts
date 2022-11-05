import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public dataSections: DataSection[] = [
    {
      label: 'Início',
      icon: 'home',
      link: 'inicio',
    },
    {
      label: 'Doações',
      icon: 'volunteer_activism',
      link: 'doacoes',
    },
    {
      label: 'Voluntários',
      icon: 'person_add',
      link: 'voluntarios',
    },
    {
      label: 'Admin',
      icon: 'settings',
      link: 'cadastro-usuario',
    }
  ];

  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUrl();
      }
    });
  }

  ngOnInit(): void {
    this.dataSections.forEach((section) => {
      section.selected = false;
    });
  }

  checkUrl() {
    this.dataSections.forEach((section: DataSection) => {
      if (this.router.url.indexOf(section.link) != -1) {
        section.selected = true;
      } else {
        section.selected = false;
      }
    });
  }

  openSection(link: string) {
    this.router.navigate([`/${link}`]);
  }
}

interface DataSection {
  label: string;
  icon: string;
  link: string;
  selected?: boolean;
}
