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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, CommonModule, DataViewModule],
})
export class AppComponent implements OnInit {
  title = "SDIAGNE SHOP";
  private productsService = inject(ProductsService);
  cart = this.productsService.cart; //// 🛒 Signal du panier


  // Calculer la quantité totale dans le panier
  quantPanier = computed(() => this.cart().length);

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("Panier chargé :", this.cart());
  }

  removeFromCart(productId: number) {
    this.productsService.removeFromCart(productId);
  }

  onCheckOut() {
    console.log("Passer à la caisse avec :", this.cart());
  }

  Onquantite() {


  }

}
