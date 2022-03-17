import { IUser } from "../public-api";

export class InitializeAuthentication {
  static readonly type = "[Authentication] Initialize Authentication";
}

export class Logout {
  static readonly type = "[Authentication] Log the user out";
}
export class Authenticate {
  static readonly type = "[Authentication] Attempt to Authenticate a user";
}

export class SetUser {
  static readonly type = "[Authentication] Set the current user data";
  constructor(public readonly user: IUser | null) {}
}



export class GetUser {
  static readonly type = "[Authentication] Get the current user data";
}

export class LoadUser {
  static readonly type = "[Authentication] Load the current user data";
}
export class UnloadUser {
  static readonly type = "[Authentication] Unload the current user";
}
