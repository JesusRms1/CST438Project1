// types.ts
//for moving data 
export type RootStackParamList = {
    SearchPage: undefined; // No parameters needed for SearchPage
    Results: { recipeName: string; filter: string | null }; // Define expected parameters for Results screen
  };
  