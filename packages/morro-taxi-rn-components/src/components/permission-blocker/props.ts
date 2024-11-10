export interface IPermissionBlockerProps {
  requireBackgroundLocation?: boolean;
  requireLocation?: boolean;
  requireNotification?: boolean;
  title: string;
  subtitle: string;
  alertTitle: string;
  alertSubtitle: string;
  children: any;
}
