import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsAlphanumeric()
  @MaxLength(14)
  userName: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;

  @ApiProperty({ description: '姓名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '性别' })
  @IsString()
  gender: string;

  @ApiProperty({ description: '手机号码' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '角色' })
  @IsString()
  role: string;
}
