export interface IUser {
  name: string;
  role: string;
  authFlow: string;
  email: string;
  address?: string;
  phone?: string;
  salt?: string;
  unsubscribed: boolean;
  refreshTokens: { token: string }[];
  wallet?: {
    publicAddress: string;
    networkId: number;
  };
  characters?: string[];
  accountType: string;
  isManuallyControlledPremiumAccount: boolean;
  pushNotificationToken?: string | null;
  channelId?: string | null;
  createdAt: string;
  updatedAt: string;
}
