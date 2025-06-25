export class RegisterIndustryRequestDto {
  email: string;
  password: string;
  name: string;
  profileImageBase64?: string;
  size: string;
  valeurs?: string[];
}
