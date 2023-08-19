export interface SearchResult {
  type: number;
  data: {
    _id: string;
    parent: string;
    name: string;
    description: string;
    icon?: string;
  };
}
