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
        label: 'Produits',
        icon: 'pi pi-barcode',
        routerLink: ['/products/list']
      },
    {
      label : 'contact ',
      icon: 'pi pi-user',
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
      icon: 'pi pi-heart',
      routerLink: ['/contact']
    } ,
    {
      label : ' wathch  ',
      icon: 'pi ',
      routerLink: ['/contact']
    }
  ]
}
