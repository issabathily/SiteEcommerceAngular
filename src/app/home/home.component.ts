import { Component, inject, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from "primeng/card";
import { ProductsService } from "../products/data-access/products.service";
import { Product } from "../products/data-access/product.model";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { ProductFormComponent } from "../products/ui/product-form/product-form.component";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    CardModule, RouterLink, ButtonModule, CurrencyPipe,
    DataViewModule, DatePipe, DialogModule, NgForOf,
    ProductFormComponent, RouterOutlet, PaginatorModule, NgIf, NgStyle
  ],
})
export class HomeComponent implements OnInit {
  public readonly appTitle = "SDIAGNE SHOP";

  private readonly productsService = inject(ProductsService);
  public products: Product[] = []; // Liste complète des produits
  public pagedProducts: Product[] = []; // Produits affichés dans la page courante
  public totalRecords: number = 0; // Nombre total de produits
  public currentPage: number = 2; // Page actuelle
  public rowsPerPage: number = 5; // Nombre de produits par page
  private a: any;

  ngOnInit() {
    this.productsService.get().subscribe((data: Product[]) => {
      this.products = data;
      this.totalRecords = this.products.length; // Mise à jour du total des produits
      this.updatePage();
    });
  }


  addToCart(product: Product) {
    this.productsService.addToCart(product);
    alert(`${product.name} ajout au panier ✅ `);
  }

  paginate(event: any) {
    this.currentPage = event.page;
    this.updatePage();
  }

  updatePage() {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.pagedProducts = this.products.slice(start, end);
  }

  // Au cas ou stok serait epuiser
  dalogue: any;
  test(item: any) {
    this.a = item
    if(this.a != 0){
      return false;

    }
    else {
      return true;
    }
  }


}

