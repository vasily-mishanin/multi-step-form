import './StepBadge.scss';

type StepBadgeProps = {
  value: number;
  isActive: boolean;
};

export function StepBadge({ value, isActive }: StepBadgeProps) {
  const badgeClass = isActive ? 'step-badge active' : 'step-badge';
  return <div className={badgeClass}>{value}</div>;
}
