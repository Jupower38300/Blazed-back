export class CreateMissionDto {
  name: string;
  payment: number;
  description: string;
  deadline: Date;
  tags?: string;
  status: string;
  interests?: string;

  industryId: number;
  userId: string;

  domaines?: string[];
  locations?: string[];
  workType?: string;
  workMethod?: string;
  workLevel?: string;
  groupType?: string;
}
