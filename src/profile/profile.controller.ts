import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decorator'; // Importez le décorateur Public

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Rendre cette route publique
  @Public()
  @Get(':userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.profileService.findByUserId(userId);
  }

  // Gardez les autres routes protégées
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}
