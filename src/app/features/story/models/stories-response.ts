import { Story } from 'src/models/story';

export interface StoriesResponse {
  status: string;
  data: Story[];
}
