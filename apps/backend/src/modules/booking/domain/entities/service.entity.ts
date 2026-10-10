export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly duration: number,
    public readonly price: number,
    public readonly providerId: string,
    public readonly createdAt: Date,
  ) {}

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      duration: this.duration,
      price: this.price,
      providerId: this.providerId,
    };
  }
}
