export class User {
  id: string;
  email: string;
  name: string;
  password: string;

  constructor(user?: User) {
    if (user) this.set(user);
  }

  set(user: User) {
    try {
      this.id = user.id;
      this.email = user.email;
      this.name = user.name;
      this.password = user.password;
    } catch (error) {
      console.log(error);
    }
  }

  static async fromString(stringUser: string): Promise<User | null> {
    try {
      const parsed_user = JSON.parse(stringUser);

      if (!parsed_user) {
        return null;
      }

      const user = new User();

      user.id = parsed_user.id;
      user.email = parsed_user.email;
      user.name = parsed_user.name;
      user.password = parsed_user.password;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
