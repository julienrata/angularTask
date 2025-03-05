import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceTransform',
  standalone: true
})
export class PriceTransformPipe implements PipeTransform {
  /**
   * Transform a price value with a discount and optional currency formatting
   * 
   * @param value - The original price value
   * @param discount - The discount rate (e.g., 0.1 for 10% off)
   * @param showCurrency - Whether to include the currency symbol
   * @returns The transformed price value
   */
  transform(value: number, discount: number = 0, showCurrency: boolean = true): string {
    if (value == null) {
      return '';
    }
    
    // Apply discount
    const discountedPrice = value * (1 - discount);
    
    // Format price
    return showCurrency 
      ? `$${discountedPrice.toFixed(2)}` 
      : discountedPrice.toFixed(2);
  }
}