export type BestUser = {
  name: string;
  avatar: string;
  statistics: {
    rating: number;
    contents_edit: number;
    contents_new: number;
  };
};
