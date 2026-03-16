export type Messages = {
  role: "user" | "assistant" | "system";
  content: string;
};

export class ChatMemory {
  private message: Messages[] = [];

  addMessage(meg: Messages) {
    this.message.push(meg);
  }

  getMessage() {
    return this.message;
  }
}
