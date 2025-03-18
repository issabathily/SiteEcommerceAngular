import {
  Component, inject, OnInit, signal, computed
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CommonModule } from "@angular/common";
import { ProductsService } from "./products/data-access/products.service";
import { DataViewModule } from "primeng/dataview";
import { Product } from "./products/data-access/product.model";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, CommonModule, DataViewModule, ChipsModule, FormsModule],
})
export class AppComponent implements OnInit {
  title = "SDIAGNE SHOP";
  identifier = true
  private productsService = inject(ProductsService);
  cart = this.productsService.cart; //// 🛒 Signal du panier


  // Calculer la quantité totale dans le panier
  quantPanier = computed(() => this.cart().length);
  quantite=0;
  searchText: any;

  constructor(private router: Router) {

    setTimeout(()=>{
this.identifier=false;
    },4000)



  }



  ngOnInit() {
    console.log("Panier chargé :", this.cart());
  }


  increment(productId: number) {
    this.productsService.incrementQuantity(productId);
}

  removeFromCart(productId: number) {
    this.productsService.removeFromCart(productId);
  }

  onCheckOut() {
    console.log("Passer à la caisse avec :", this.cart());
  }



   getblog(){
    if (this.identifier){
      return 'none'
    }
    else return 'block'
  }

  get_opcity() {
    if(this.identifier){
        return '100%'
    }
    else return '5%'
  }

  identification() {
    this.identifier = true;
    this.router.navigate(['/contact']);
  }



decrement(productId: number) {
    this.productsService.decrementQuantity(productId);
}

  messages() {
    alert('Votre Demande est en cour de traitement  ✅');
  }
}
