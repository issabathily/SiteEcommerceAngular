import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProductsService {
    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";

    private readonly _products = signal<Product[]>([]);
    public readonly products = this._products.asReadonly();

    // ✅ Charger le panier depuis localStorage au démarrage
    private readonly _cart = signal<Product[]>(this.loadCartFromLocalStorage());
    public readonly cart = this._cart.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError(() => this.http.get<Product[]>("assets/products.json")),
            tap((products) => this._products.set(products))
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => of(true)),
            tap(() => this._products.update(products => [product, ...products]))
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => of(true)),
            tap(() => this._products.update(products =>
                products.map(p => p.id === product.id ? product : p)
            ))
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => of(true)),
            tap(() => this._products.update(products =>
                products.filter(product => product.id !== productId)
            ))
        );
    }


    /***  Gestion du Panier  ***/

    public addToCart(product: Product): void {
        this._cart.update(cart => {
            const updatedCart = [...cart, product];
            this.saveCartToLocalStorage(updatedCart); // Sauvegarde
            return updatedCart;
        });
    }

    public removeFromCart(productId: number): void {
        this._cart.update(cart => {
            const updatedCart = cart.filter(product => product.id !== productId);
            this.saveCartToLocalStorage(updatedCart); // Sauvegarde
            return updatedCart;
        });
    }

    /*** ✅ Sauvegarde et récupération du panier ***/

    private saveCartToLocalStorage(cart: Product[]): void {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    private loadCartFromLocalStorage(): Product[] {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    }


    // *** buton augementer panier ***

    public incrementQuantity(productId: number): void {
    this._cart.update(cart => {
        const updatedCart = cart.map(product =>
            product.id === productId ? { ...product, augemente: (product.augemente || 1) + 1 } : product
        );
        this.saveCartToLocalStorage(updatedCart);
        return updatedCart;
    });
}

public decrementQuantity(productId: number): void {
    this._cart.update(cart => {
        const updatedCart = cart.map(product =>
            product.id === productId ? { ...product, augemente: Math.max((product.augemente || 1) - 1, 0) } : product
        )

        this.saveCartToLocalStorage(updatedCart);
        return updatedCart;
    });
}

}




