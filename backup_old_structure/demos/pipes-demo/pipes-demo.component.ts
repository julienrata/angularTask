import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Import custom pipes
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { PriceTransformPipe } from './pipes/price-transform.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';

// Interface for our demo products
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  releaseDate: Date;
}

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterProductPipe,
    PriceTransformPipe,
    TitleCasePipe,
  ],
  templateUrl: './pipes-demo.component.html',
  styleUrl: './pipes-demo.component.scss',
})
export class PipesDemoComponent {
  titleCasePipe: string = ` @Pipe({ name: 'appTitleCase', standalone: true }) export class
            TitleCasePipe implements PipeTransform { transform(value: string):
            string { if (!value) return ''; // Split the string into words
            return value .toLowerCase() .split(' ') .map(word => { // Skip small
            words like 'a', 'an', 'the', 'and', etc. unless it's the first word
            const smallWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for',
            'nor', 'on', 'at', 'to', 'from', 'by', 'in']; return
            smallWords.includes(word) ? word : word.charAt(0).toUpperCase() +
            word.slice(1); }) .join(' '); } }`;
  filterPipe: string = `  
@Pipe({
  name: 'filterProduct',
  standalone: true
})
export class FilterProductPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string = '', category: string = ''): Product[] {
    if (!products || (!searchTerm && !category)) {
      return products;
    }

    return products.filter(product => {
      // Filter by search term
      const nameMatch = searchTerm ? 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) : 
        true;
      
      // Filter by category
      const categoryMatch = category ? 
        product.category === category : 
        true;
      
      // Both conditions must be met
      return nameMatch && categoryMatch;
    });
  }
}
`;
  trasformPipe: string = `@Pipe({ name: 'priceTransform', standalone: true }) export class
            PriceTransformPipe implements PipeTransform { transform(value:
            number, discount: number = 0, showCurrency: boolean = true): string
            { if (value == null) return ''; // Apply discount const
            discountedPrice = value * (1 - discount); // Format price return
            showCurrency ? discountedPrice.toFixed(2) :
            discountedPrice.toFixed(2); } }`;
  // Demo data
  currentDate = new Date();
  price = 42.5;
  message = 'Welcome to Angular Pipes';
  longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // For custom filter demo
  searchTerm = '';
  selectedCategory = '';

  products: Product[] = [
    {
      id: 1,
      name: 'laptop computer',
      price: 1299.99,
      category: 'electronics',
      inStock: true,
      releaseDate: new Date(2023, 3, 15),
    },
    {
      id: 2,
      name: 'wireless headphones',
      price: 149.95,
      category: 'electronics',
      inStock: false,
      releaseDate: new Date(2022, 7, 10),
    },
    {
      id: 3,
      name: 'running shoes',
      price: 89.99,
      category: 'sports',
      inStock: true,
      releaseDate: new Date(2023, 1, 5),
    },
    {
      id: 4,
      name: 'coffee maker',
      price: 59.99,
      category: 'home',
      inStock: true,
      releaseDate: new Date(2022, 5, 20),
    },
    {
      id: 5,
      name: 'yoga mat',
      price: 29.95,
      category: 'sports',
      inStock: true,
      releaseDate: new Date(2023, 0, 12),
    },
  ];

  get categories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  // For the transform pipe demo
  applyDiscount(price: number): number {
    return price * 0.9; // 10% discount
  }
}
