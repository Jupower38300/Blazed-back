export class RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  prefix?: string;
  password: string;
  username?: string;
  newsletter?: boolean;
  terms?: boolean;
  domaines: string[];
  profileImageBase64: string;
  profileTitle: string;
  dailyRate: number;
  locations?: string[];
  workType?: string;
  workMethod?: string;
  workLevel?: string;
  hardSkills?: string[];
  stacks?: string[];
  langs?: string[];
  speak?: string[];
  softSkills?: string[];
}
