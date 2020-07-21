declare module 'fish-djs' {
import { User, Client, UserResolvable, ClientOptions, Message, GuildMember, Snowflake, Channel, Role, VoiceState, MessageReaction, Emoji } from 'discord.js';
  export class FishClient extends Client {
    public constructor(options?: FishClientOptions);

    private _commandPrefix: string;

    public commandsPrefix: string;
    public options: FishClientOptions;
    public dev: User;
    public registerDefaults: VoidFunction;

    public isDev(user: UserResolvable): boolean;

    on(event: string, listener: Function): this;
    on(event: 'ready', listener: () => void): this;
    on(event: 'channelCreate', listener: (channel: Channel) => void): this;
    on(event: 'channelDelete', listener: (channel: Channel) => void): this;
    on(event: 'channelPinsUpdate', listener: (channel: Channel, time: Date) => void): this;
    on(event: 'channelUpdate', listener: (oldChannel: Channel, newChannel: Channel) => void): this;
    on(event: 'debug', listener: (info: string) => void): this;
    on(event: 'disconnect', listener: (event: any) => void): this;
    on(event: 'emojiCreate', listener: (emoji: Emoji) => void): this;
    on(event: 'emojiDelete', listener: (emoji: Emoji) => void): this;
    on(event: 'emojiUpdate', listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'guildBanAdd', listener: (guild: FishGuild, user: User) => void): this;
    on(event: 'guildBanRemove', listener: (guild: FishGuild, user: User) => void): this;
    on(event: 'guildCreate', listener: (guild: FishGuild) => void): this;
    on(event: 'guildDelete', listener: (guild: FishGuild) => void): this;
    on(event: 'guildMemberAdd', listener: (member: GuildMember) => void): this;
    on(event: 'guildMemberAvailable', listener: (member: GuildMember) => void): this;
    on(event: 'guildMemberRemove', listener: (member: GuildMember) => void): this;
    on(event: 'guildMembersChunk', listener: (members: Collection<Snowflake, GuildMember>, guild: FishGuild) => void): this;
    on(event: 'guildMemberSpeaking', listener: (member: GuildMember, speaking: boolean) => void): this;
    on(event: 'guildMemberUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
    on(event: 'guildUnavailable', listener: (guild: FishGuild) => void): this;
    on(event: 'guildUpdate', listener: (oldGuild: FishGuild, newGuild: FishGuild) => void): this;
    on(event: 'message', listener: (message: Message) => void): this;
    on(event: 'messageDelete', listener: (message: Message) => void): this;
    on(event: 'messageDeleteBulk', listener: (messages: Collection<Snowflake, Message>) => void): this;
    on(event: 'messageReactionAdd', listener: (messageReaction: MessageReaction, user: User) => void): this;
    on(event: 'messageReactionRemove', listener: (messageReaction: MessageReaction, user: User) => void): this;
    on(event: 'messageReactionRemoveAll', listener: (message: Message) => void): this;
    on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => void): this;
    on(event: 'reconnecting', listener: () => void): this;
    on(event: 'roleCreate', listener: (role: Role) => void): this;
    on(event: 'roleDelete', listener: (role: Role) => void): this;
    on(event: 'roleUpdate', listener: (oldRole: Role, newRole: Role) => void): this;
    on(event: 'typingStart', listener: (channel: Channel, user: User) => void): this;
    on(event: 'typingStop', listener: (channel: Channel, user: User) => void): this;
    on(event: 'userNoteUpdate', listener: (user: UserResolvable, oldNote: string, newNote: string) => void): this;
    on(event: 'userUpdate', listener: (oldUser: User, newUser: User) => void): this;
    on(event: 'voiceStateUpdate', listener: (oldState: VoiceState | undefined, newState: VoiceState) => void): this;
    on(event: 'warn', listener: (info: string) => void): this;
    on(event: 'PrefixChange', listener: (guild: FishGuild, prefix: string) => void): this;
    on(event: 'RegisterDefaults', listener: (commands: string[] | string) => void): this;
  }

  export { FishClient as Client };

  export const Version: string;

  export interface FishClientOptions extends ClientOptions {
    commandsPrefix?: string;
    dev?: string;
  }
}
