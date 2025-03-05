import { Pipe, PipeTransform } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  releaseDate: Date;
}

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