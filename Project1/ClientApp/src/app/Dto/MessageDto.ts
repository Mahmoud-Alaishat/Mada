export class MessageDto {
  public sender: string = '';
  public receiver: string = '';
  public msgText: string = '';
  public chatId: number;
  public messageDate: Date;
}
