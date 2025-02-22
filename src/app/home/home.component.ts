import {Component, inject, OnInit} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import {ProductsService} from "../products/data-access/products.service";
import {Product} from "../products/data-access/product.model";
import {identifierName} from "@angular/compiler";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {ProductFormComponent} from "../products/ui/product-form/product-form.component";
const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, CurrencyPipe, DataViewModule, DatePipe, DialogModule, NgForOf, ProductFormComponent, RouterOutlet],
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public readonly appTitle = "SDIAGNE SHOP";

  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;
  protected readonly identifierName = identifierName;


  addToCart(product: Product) {
    this.productsService.addToCart(product);
    alert(product.name);
  }


}
