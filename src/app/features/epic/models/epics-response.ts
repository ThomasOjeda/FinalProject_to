import { Epic } from 'src/models/epic';

export interface EpicsResponse {
  status: string;
  data: Epic[];
}
