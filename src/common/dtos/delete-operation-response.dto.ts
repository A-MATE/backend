import { ApiProperty } from '@nestjs/swagger';

export class DeleteOperationResponseDto {
  @ApiProperty({ description: 'The raw database result returned by the query' })
  readonly raw: any;

  @ApiProperty({
    description: 'Number of affected rows by the delete operation',
  })
  readonly affected?: number;
}
