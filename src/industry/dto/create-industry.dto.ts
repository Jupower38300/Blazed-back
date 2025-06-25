import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateIndustryDto {
  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  password_hash?: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  profileImageBase64: string;

  @IsString()
  size: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  valeurs?: string[];

  @IsUUID()
  userId: string;
}
