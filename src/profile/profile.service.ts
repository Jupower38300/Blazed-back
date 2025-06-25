import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/users.entity';
import { Industry } from 'src/industry/entities/industry.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Industry)
    private industryRepository: Repository<Industry>,
  ) {}

  /**
   * Créer un nouveau profil avec un nouvel utilisateur
   */
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    // Vérifier si l'email existe déjà
    const existingProfile = await this.profileRepository.findOne({
      where: { email: createProfileDto.email },
    });

    if (existingProfile) {
      throw new ConflictException('Email already exists');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await this.profileRepository.findOne({
      where: { username: createProfileDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Créer l'utilisateur d'abord
    const user = this.userRepository.create();
    const savedUser = await this.userRepository.save(user);

    // Créer le profil avec le même ID que l'utilisateur
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      user_id: savedUser.user_id,
      user: savedUser,
    });

    return await this.profileRepository.save(newProfile);
  }

  /**
   * Créer un profil pour un utilisateur existant
   */
  async createForExistingUser(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier si le profil existe déjà pour cet utilisateur
    const existingProfile = await this.profileRepository.findOne({
      where: { user_id: userId },
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await this.profileRepository.findOne({
      where: { email: createProfileDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await this.profileRepository.findOne({
      where: { username: createProfileDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      user_id: userId,
      user: user,
    });

    return await this.profileRepository.save(newProfile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user_id: id },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async findByEmail(email: string): Promise<Profile | null> {
    const profile = await this.profileRepository.findOne({
      where: { email },
      relations: ['user'],
    });

    // Ne lance plus d'exception ici
    return profile; // null si non trouvé
  }

  async findByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user_id: userId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(
        `Profil non trouvé pour l'utilisateur: ${userId}`,
      );
    }

    return profile;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user_id: id },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Vérifier l'unicité de l'email si elle est modifiée
    if (updateProfileDto.email && updateProfileDto.email !== profile.email) {
      const existingEmail = await this.profileRepository.findOne({
        where: { email: updateProfileDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    // Vérifier l'unicité du username si il est modifié
    if (
      updateProfileDto.username &&
      updateProfileDto.username !== profile.username
    ) {
      const existingUsername = await this.profileRepository.findOne({
        where: { username: updateProfileDto.username },
      });

      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }
    }

    Object.assign(profile, updateProfileDto);
    return await this.profileRepository.save(profile);
  }

  async remove(id: string): Promise<void> {
    const result = await this.profileRepository.delete({ user_id: id });

    if (result.affected === 0) {
      throw new NotFoundException('Profile not found');
    }
  }

  /**
   * Vérifier si un profil existe pour un utilisateur
   */
  async existsForUser(userId: string): Promise<boolean> {
    const count = await this.profileRepository.count({
      where: { user_id: userId },
    });
    return count > 0;
  }

  /**
   * Rechercher des profils par critères
   */
  async search(criteria: {
    firstName?: string;
    lastName?: string;
    status?: string;
    interests?: string;
  }): Promise<Profile[]> {
    const queryBuilder = this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user');

    if (criteria.firstName) {
      queryBuilder.andWhere('profile.firstName ILIKE :firstName', {
        firstName: `%${criteria.firstName}%`,
      });
    }

    if (criteria.lastName) {
      queryBuilder.andWhere('profile.lastName ILIKE :lastName', {
        lastName: `%${criteria.lastName}%`,
      });
    }

    if (criteria.status) {
      queryBuilder.andWhere('profile.status = :status', {
        status: criteria.status,
      });
    }

    if (criteria.interests) {
      queryBuilder.andWhere('profile.interests ILIKE :interests', {
        interests: `%${criteria.interests}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async getMatchingProfilesForIndustry(industryId: number): Promise<Profile[]> {
    // Récupération de l'industrie avec ses missions
    const industry = await this.industryRepository.findOne({
      where: { industry_id: industryId },
      relations: ['missions'],
    });

    if (!industry) {
      throw new NotFoundException('Industry not found');
    }

    const allMissions = industry.missions;

    // Extraire les critères des missions
    const neededDomains = new Set<string>();
    const neededSkills = new Set<string>();
    const neededSoftSkills = new Set<string>();
    const neededStacks = new Set<string>();
    const neededLangs = new Set<string>();
    const neededWorkTypes = new Set<string>();
    const neededWorkLevels = new Set<string>();

    for (const mission of allMissions) {
      mission.domains?.forEach((d) => neededDomains.add(d));
      mission.hardSkills?.forEach((s) => neededSkills.add(s));
      mission.softSkills?.forEach((s) => neededSoftSkills.add(s));
      mission.stacks?.forEach((s) => neededStacks.add(s));
      mission.langs?.forEach((l) => neededLangs.add(l));
      if (mission.workType) neededWorkTypes.add(mission.workType);
      if (mission.workLevel) neededWorkLevels.add(mission.workLevel);
    }

    // Définition des poids (weights)
    const weights = {
      domains: 10,
      hardSkills: 5,
      softSkills: 3,
      langs: 2,
      stacks: 3,
      workType: 2,
      workLevel: 3,
    };

    // Récupérer tous les profils
    const profiles = await this.profileRepository.find({
      relations: ['user'],
    });

    // Calcul du score avec pondérations
    const matchedProfiles = profiles
      .map((profile) => {
        let score = 0;

        // Domaines
        const domainMatch = profile.domaines?.filter((d) =>
          neededDomains.has(d),
        );
        score += (domainMatch?.length || 0) * weights.domains;

        // Hard skills
        const skillMatch = profile.hardSkills?.filter((s) =>
          neededSkills.has(s),
        );
        score += (skillMatch?.length || 0) * weights.hardSkills;

        // Soft skills
        const softSkillMatch = profile.softSkills?.filter((s) =>
          neededSoftSkills.has(s),
        );
        score += (softSkillMatch?.length || 0) * weights.softSkills;

        // Langues
        const langMatch = profile.langs?.filter((l) => neededLangs.has(l));
        score += (langMatch?.length || 0) * weights.langs;

        // Stack
        const stackMatch = profile.stacks?.filter((s) => neededStacks.has(s));
        score += (stackMatch?.length || 0) * weights.stacks;

        // Méthode de travail
        if (profile.workType && neededWorkTypes.has(profile.workType))
          score += weights.workType;

        // Niveau d'expérience
        if (profile.workLevel && neededWorkLevels.has(profile.workLevel))
          score += weights.workLevel;

        return { profile, score };
      })
      .filter((p) => p.score > 0) // On garde uniquement les profils pertinents
      .sort((a, b) => b.score - a.score) // Tri décroissant par score
      .map((p) => p.profile);

    return matchedProfiles;
  }
}
