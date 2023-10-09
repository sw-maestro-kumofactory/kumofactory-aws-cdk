import { AwsComponentType } from '../type/aws-component.type';
import { AwsTemplateType } from '../type/aws-template.type';

export class MessageDto {
  id: string;
  type: AwsComponentType | AwsTemplateType;
  options: any;
}
