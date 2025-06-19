import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { UsersService } from 'src/users/users.service'; // You'll need this
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private jwtService: JwtService,
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
      // Ajoutez d'autres données nécessaires
    };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: profile.user_id, // Ajoutez l'ID dans la réponse
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
}
