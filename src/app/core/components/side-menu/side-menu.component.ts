import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';

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
    }
  ];

  constructor(public router: Router,
    private accountService: AccountService) {

    let perfil = '';
    this.accountService.currentUser$.subscribe((user) => {
     perfil = user.perfil;
    });
    
    if (perfil === 'Administrador')
    this.dataSections.push({ label: 'Admin', icon: 'settings', link: 'usuarios', });

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
