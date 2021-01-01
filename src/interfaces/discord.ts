import { InteractionResponseType, InteractionType } from 'discord-interactions';
import type { GuildMember, MessageEmbed } from 'discord.js';

export interface ApplicationCommand {
  id: string;
  application_id: string;
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOption {
  type: number;
  name: string;
  description: string;
  default?: boolean;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
}

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export interface ApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

export interface Interaction {
  id: string;
  type: InteractionType;
  data?: ApplicationCommandInteractionData;
  guild_id: string;
  channel_id: string;
  member: GuildMember;
  token: string;
  version: number;
}

export interface ApplicationCommandInteractionData {
  id: string;
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  value?: string;
  options?: ApplicationCommandInteractionDataOption[];
}

export interface InteractionResponse {
  type: InteractionResponseType;
  data?: InteractionApplicationCommandCallbackData;
}

export interface InteractionApplicationCommandCallbackData {
  tts?: boolean;
  content: string;
  embeds?: MessageEmbed[];
  allowed_mentions?: AllowedMentions;
}

export type AllowedMentionTypes = 'roles' | 'users' | 'everyone';

export interface AllowedMentions {
  parse: AllowedMentionTypes[];
  roles?: string[];
  users?: string[];
  repliec_user?: boolean;
}
