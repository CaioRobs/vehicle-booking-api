import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: 'jack@email.com can be used' })
  readonly email: string;

  @ApiProperty({ description: 'jackPW is the password' })
  readonly password: string;
}
