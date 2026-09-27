export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: string,
    private readonly passwordHash: string,
  ) {}

  toPublic() {
    return { id: this.id, email: this.email, name: this.name };
  }

  getPasswordHash() {
    return this.passwordHash;
  }
}
