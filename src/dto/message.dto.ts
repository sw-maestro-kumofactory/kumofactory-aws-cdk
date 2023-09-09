import { AwsComponentType } from '../type/aws-component.type';

export class MessageDto {
  id: string;
  type: AwsComponentType;
  options: any;
}
