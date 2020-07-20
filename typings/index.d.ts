declare module "fish-djs" {
  import { User, Client, UserResolvable, ClientOptions } from "discord.js";
  export class FishClient extends Client {
    public constructor(options?: FishClientOptions);

    private _commandPrefix: string;

    public commandsPrefix: string;
    public options: FishClientOptions;
    public dev: User;
    public register: Promise<VoidFunction>;

    public isDev(user: UserResolvable): boolean;
  }

  export { FishClient as Client };

  export const Version: string;

  export interface FishClientOptions extends ClientOptions {
    commandsPrefix?: string;
    dev?: string;
  }
}
