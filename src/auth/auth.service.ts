import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { UsersService } from 'src/users/users.service'; // You'll need this
import { User } from 'src/users/users.entity';
import { IndustryService } from 'src/industry/industry.service';
import { Industry } from 'src/industry/entities/industry.entity';
import { RegisterIndustryRequestDto } from './dtos/register-industry-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private industryService: IndustryService,
  ) {}

  async validateUser(email: string, password: string): Promise<Profile> {
    const profile = await this.profileService.findByEmail(email);
    if (!profile) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    const isMatch = await bcrypt.compare(password, profile.password_hash);
    if (!isMatch) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    return profile;
  }

  async login(profile: Profile): Promise<AccessToken> {
    const payload = {
      email: profile.email,
      id: profile.user_id,
      accountType: 'freelance',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: profile.user_id,
    };
  }

  async register(userDto: RegisterRequestDto): Promise<AccessToken> {
    const existingProfile = await this.profileService.findByEmail(
      userDto.email,
    );
    if (existingProfile) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = new User();

    const newProfile = new Profile();
    newProfile.email = userDto.email;
    newProfile.password_hash = hashedPassword;
    newProfile.firstName = userDto.firstName;
    newProfile.lastName = userDto.lastName;
    newProfile.phone = userDto.phone;
    newProfile.prefix = userDto.prefix;
    newProfile.newsletter = userDto.newsletter;
    newProfile.terms = userDto.terms;
    newProfile.domaines = userDto.domaines;
    newProfile.profileImageBase64 = userDto.profileImageBase64;
    newProfile.profileTitle = userDto.profileTitle;
    newProfile.dailyRate = userDto.dailyRate;
    newProfile.locations = userDto.locations;
    newProfile.workType = userDto.workType;
    newProfile.workMethod = userDto.workMethod;
    newProfile.workLevel = userDto.workLevel;
    newProfile.hardSkills = userDto.hardSkills;
    newProfile.stacks = userDto.stacks;
    newProfile.langs = userDto.langs;
    newProfile.speak = userDto.speak;
    newProfile.softSkills = userDto.softSkills;

    newProfile.username =
      userDto.username ||
      `${userDto.firstName}_${userDto.lastName}`.toLowerCase();

    newUser.profile = newProfile;

    const savedUser = await this.usersService.create(newUser);

    return this.login(savedUser.profile);
  }

  async validateIndustry(email: string, password: string): Promise<Industry> {
    const industry = await this.industryService.findByEmail(email);
    if (!industry) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    const isMatch = await bcrypt.compare(password, industry.password_hash);
    if (!isMatch) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    return industry;
  }

  async loginIndustry(industry: Industry): Promise<AccessToken> {
    const payload = {
      email: industry.email,
      id: industry.user.user_id, // Access user_id through the user relation
      accountType: 'industry',
    };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: industry.user.user_id,
    };
  }

  async registerIndustry(
    industryDto: RegisterIndustryRequestDto,
  ): Promise<AccessToken> {
    // Check if email exists in either profiles or industries
    const existingProfile = await this.profileService.findByEmail(
      industryDto.email,
    );
    if (existingProfile) {
      throw new BadRequestException('Email already exists');
    }

    const existingIndustry = await this.industryService.findByEmail(
      industryDto.email,
    );
    if (existingIndustry) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(industryDto.password, 10);

    const newUser = new User();
    const newIndustry = new Industry();

    // Set industry properties
    newIndustry.email = industryDto.email;
    newIndustry.password_hash = hashedPassword;
    newIndustry.name = industryDto.name;
    newIndustry.profileImageBase64 = industryDto.profileImageBase64 || '';
    newIndustry.size = industryDto.size;
    newIndustry.valeurs = industryDto.valeurs || [];

    // Link industry to user
    newUser.industry = newIndustry;

    const savedUser = await this.usersService.create(newUser);
    return this.loginIndustry(savedUser.industry);
  }
}
