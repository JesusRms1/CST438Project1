 // temp_recipe.tsx
 export interface Recipe {
    Nationality: string;
    Name: string;
    Protein: string;
  }
  
  export const recipes: Recipe[] = [
    {
      Nationality: 'Mexican',
      Name: 'Tacos al Pastor',
      Protein: 'Pork',
    },
    {
      Nationality: 'Mexican',
      Name: 'Chiles en Nogada',
      Protein: 'Ground Beef and Pork',
    },
    {
      Nationality: 'Mexican',
      Name: 'Enchiladas Verdes',
      Protein: 'Chicken',
    },
    {
      Nationality: 'Japanese',
      Name: 'Ramen',
      Protein: 'Pork (Chashu)',
    },
    {
      Nationality: 'Japanese',
      Name: 'Sushi (Nigiri)',
      Protein: 'Tuna or Salmon',
    },
  ];
  