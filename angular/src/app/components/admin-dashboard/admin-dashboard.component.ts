import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/succulent.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  product: Product = {
    id: 0,
    nume: '',
    descriere: '',
    pret: 0,
    urlPoza: ''
  };
  products: Product[] = []; // Define the products array here

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data; // Populate the products array with the fetched products
      },
      error: (error) => console.error('There was an error fetching the products!', error)
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        console.log('Product added successfully', data);
        this.fetchProducts(); // Refresh the list after adding a new product
        // Optionally reset the form here
        this.product = { id: 0, nume: '', descriere: '', pret: 0, urlPoza: '' };
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  editProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        this.product = product; // Load the product into the form for editing
      },
      error: (error) => console.error('Error fetching product', error)
    });
  }

  saveProduct(): void {
    // Check if we're adding a new product or updating an existing one
    if (this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.fetchProducts(); // Refresh the list to show the updated product
          this.resetForm(); // Clear/reset the form after saving
        },
        error: (error) => console.error('There was an error updating the product', error)
      });
    } else {
      this.addProduct(); // If no ID, it's a new product, so call addProduct instead
    }
  }
  
  resetForm(): void {
    this.product = { id: 0, nume: '', descriere: '', pret: 0, urlPoza: '' }; // Reset the form model
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.products = this.products.filter(product => product.id !== productId); // Remove the product from the list
        },
        error: (error) => console.error('There was an error deleting the product', error)
      });
    }
  }
  
}