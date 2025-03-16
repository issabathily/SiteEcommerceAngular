import { Component, inject, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from "primeng/card";
import { ProductsService } from "../products/data-access/products.service";
import { Product } from "../products/data-access/product.model";
import { CurrencyPipe, DatePipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { ProductFormComponent } from "../products/ui/product-form/product-form.component";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    CardModule, RouterLink, ButtonModule, CurrencyPipe,
    DataViewModule, DatePipe, DialogModule, NgForOf,
    ProductFormComponent, RouterOutlet, PaginatorModule, NgIf, NgStyle, InputTextModule
  ],
})
export class HomeComponent implements OnInit {
  searchText: string = ''; // Texte de recherche
  public readonly appTitle = "SDIAGNE SHOP";
  addproduct!: string;
  private readonly productsService = inject(ProductsService);
  public products: Product[] = []; // Liste complète des produits
  public pagedProducts: Product[] = []; // Produits affichés dans la page courante
  public totalRecords: number = 0; // Nombre total de produits après filtrage
  public currentPage: number = 0; // Page actuelle (0-based)
  public rowsPerPage: number = 5; // Nombre de produits par page
  public pageSize: number = 10;

  ngOnInit() {
    this.productsService.get().subscribe((data: Product[]) => {
      this.products = data;
      this.totalRecords = this.products.length; // Initialisation du nombre total de produits
      this.updatePage(); // Initialiser la pagination
    });
    this.addproduct = 'Ajouter au Panier';
  }

  addToCart(product: Product) {
    this.productsService.addToCart(product);
    alert(`${product.name} ajouté au panier ✅`);
  }

  paginate(event: any) {
    this.currentPage = event.page;
    this.updatePage();
  }

  // Mettre à jour la pagination
  updatePage() {
    // Appliquer le filtrage avant la pagination
    const filteredProducts = this.filterProducts();

    // Calculer l'index de début et de fin pour les produits de la page actuelle
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;

    // Mettre à jour les produits paginés
    this.pagedProducts = filteredProducts.slice(start, end);
    this.totalRecords = filteredProducts.length; // Mettre à jour le total après filtrage
  }

  // Fonction de filtrage des produits en fonction de la recherche
  filterProducts(): Product[] {
    if (!this.searchText) {
      return this.products; // Retourner tous les produits si aucun texte de recherche
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
