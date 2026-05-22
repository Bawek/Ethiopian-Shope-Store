'use client';

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
const FilterLayout = () => {
    const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];
  return (
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Product Suggestions">
              {products.map((product, index) => (
                <CommandItem key={index}>{product}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        
  );
};

export default FilterLayout;
