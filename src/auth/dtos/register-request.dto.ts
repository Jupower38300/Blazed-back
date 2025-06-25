import {
  IsString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsIn(['freelance', 'industry'], {
    message: 'accountType doit être "freelance" ou "industry"',
  })
  accountType: 'freelance' | 'industry';

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MaxLength(128, { message: 'Mot de passe trop long' })
  password: string;

  // Champs communs éventuels (par exemple newsletter/terms)
  @ValidateIf(
    (o) => o.accountType === 'freelance' || o.accountType === 'industry',
  )
  @IsBoolean({ message: 'newsletter doit être booléen' })
  @IsOptional()
  newsletter?: boolean;

  @ValidateIf(
    (o) => o.accountType === 'freelance' || o.accountType === 'industry',
  )
  @IsBoolean({ message: 'terms doit être booléen' })
  @IsOptional()
  terms?: boolean;

  // --- Pour freelance ---
  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'firstName doit être une chaîne' })
  @IsNotEmpty({ message: 'firstName est requis pour un compte freelance' })
  firstName?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'lastName doit être une chaîne' })
  @IsNotEmpty({ message: 'lastName est requis pour un compte freelance' })
  lastName?: string;

  // Exemple de validations pour téléphone + préfixe
  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'prefix doit être une chaîne' })
  @IsNotEmpty({ message: 'prefix est requis pour un compte freelance' })
  prefix?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'phone doit être une chaîne' })
  @IsNotEmpty({ message: 'phone est requis pour un compte freelance' })
  phone?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'profileImageBase64 doit être une chaîne' })
  @IsNotEmpty({
    message: 'profileImageBase64 est requis pour un compte freelance',
  })
  profileImageBase64?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'profileTitle doit être une chaîne' })
  @IsOptional()
  profileTitle?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsNumber({}, { message: 'dailyRate doit être un nombre' })
  @IsOptional()
  dailyRate?: number;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'domaines doit être un tableau de chaînes' })
  @ArrayNotEmpty({ message: 'Au moins un domaine pour freelance' })
  @IsOptional()
  domaines?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'locations doit être un tableau de chaînes' })
  @IsOptional()
  locations?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'workType doit être une chaîne' })
  @IsOptional()
  workType?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'workMethod doit être une chaîne' })
  @IsOptional()
  workMethod?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'workLevel doit être une chaîne' })
  @IsOptional()
  workLevel?: string;

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'hardSkills doit être un tableau' })
  @IsOptional()
  hardSkills?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'stacks doit être un tableau' })
  @IsOptional()
  stacks?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'langs doit être un tableau' })
  @IsOptional()
  langs?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'speak doit être un tableau' })
  @IsOptional()
  speak?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsArray({ message: 'softSkills doit être un tableau' })
  @IsOptional()
  softSkills?: string[];

  @ValidateIf((o) => o.accountType === 'freelance')
  @IsString({ message: 'username doit être une chaîne' })
  @IsOptional()
  username?: string;

  // --- Pour industry ---
  @ValidateIf((o) => o.accountType === 'industry')
  @IsString({ message: 'name doit être une chaîne' })
  @IsNotEmpty({
    message: 'Le nom de l’entreprise est requis pour un compte industry',
  })
  name?: string;

  @ValidateIf((o) => o.accountType === 'industry')
  @IsString({ message: 'size doit être une chaîne' })
  @IsNotEmpty({
    message: 'La taille de l’entreprise est requise pour un compte industry',
  })
  size?: string;

  @ValidateIf((o) => o.accountType === 'industry')
  @IsArray({ message: 'valeurs doit être un tableau de chaînes' })
  @ArrayNotEmpty({
    message:
      'Au moins une valeur doit être sélectionnée pour un compte industry',
  })
  valeurs?: string[];
}
