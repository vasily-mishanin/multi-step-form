export type Step = {
  name: string;
  title: string;
};

export type PlanType = 'year' | 'month';
export type PlanTitle = 'Arcade' | 'Advanced' | 'Pro';

export interface IPlan {
  title: PlanTitle;
  planType: PlanType;
  price: number;
  currency: string;
  marketingMessage: string;
}
