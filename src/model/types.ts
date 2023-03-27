export type Step = {
  name: string;
  title: string;
};

export type PlanType = 'month' | 'year';
export type PlanTitle = 'Arcade' | 'Advanced' | 'Pro';

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

export interface IPlan {
  planTitle: PlanTitle | null;
  planType: PlanType;
  price: number;
  currency: string;
  marketingMessage: string;
}

export interface IAddOns {
  onlineService: { checked: boolean; price: number };
  largerStorage: { checked: boolean; price: number };
  customizableProfile: { checked: boolean; price: number };
}

export interface IFormData {
  user: IUser;
  plan: IPlan;
  addOns: IAddOns;
}
