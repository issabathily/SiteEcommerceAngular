import {Component} from "@angular/core";
import { MenuItem } from "primeng/api";
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: "app-panel-menu",
  standalone: true,
  imports: [PanelMenuModule],
  template: `
      <p-panelMenu class="m"  [model]="items" styleClass="w-full" />


  `
})
export class PanelMenuComponent {

  public readonly items: MenuItem[] = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Admin',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/products/list']
      },
    {
      label : 'Contact ',
      icon : 'pi pi-user',
      routerLink: ['/contact']
    }
    ,
    {
      label : 'Vetement ',
      icon: 'pi pi-heart',
      routerLink: ['/contact']
    } ,
    {
      label : 'Informatique  ',
      icon: '',
      routerLink: ['/contact']
    } ,
    {
      label : ' wathch  ',
      icon: 'pi ',
      routerLink: ['/contact']
    }
  ]
}
