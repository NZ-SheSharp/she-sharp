import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  ShieldCheck,
  KeyRound,
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Calendar,
  CalendarCheck,
  CalendarX,
  FileUp,
  Download,
  CreditCard,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/queries';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.VERIFY_EMAIL]: Mail,
  [ActivityType.REQUEST_PASSWORD_RESET]: KeyRound,
  [ActivityType.RESET_PASSWORD]: Lock,
  [ActivityType.ACCOUNT_LOCKED]: Lock,
  [ActivityType.ACCOUNT_UNLOCKED]: ShieldCheck,
  // New mentorship activity types
  [ActivityType.ACTIVATE_MENTOR_ROLE]: Users,
  [ActivityType.ACTIVATE_MENTEE_ROLE]: GraduationCap,
  [ActivityType.UPDATE_MENTOR_PROFILE]: Users,
  [ActivityType.UPDATE_MENTEE_PROFILE]: GraduationCap,
  [ActivityType.REQUEST_MENTOR]: UserCheck,
  [ActivityType.ACCEPT_MENTEE]: UserCheck,
  [ActivityType.REJECT_MENTEE]: UserX,
  [ActivityType.END_MENTORSHIP]: UserMinus,
  [ActivityType.SCHEDULE_MEETING]: Calendar,
  [ActivityType.COMPLETE_MEETING]: CalendarCheck,
  [ActivityType.CANCEL_MEETING]: CalendarX,
  [ActivityType.REGISTER_EVENT]: Calendar,
  [ActivityType.ATTEND_EVENT]: CalendarCheck,
  [ActivityType.UPLOAD_RESOURCE]: FileUp,
  [ActivityType.ACCESS_RESOURCE]: Download,
  [ActivityType.UPGRADE_MEMBERSHIP]: CreditCard,
  [ActivityType.CANCEL_MEMBERSHIP]: XCircle,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return 'You signed up';
    case ActivityType.SIGN_IN:
      return 'You signed in';
    case ActivityType.SIGN_OUT:
      return 'You signed out';
    case ActivityType.UPDATE_PASSWORD:
      return 'You changed your password';
    case ActivityType.DELETE_ACCOUNT:
      return 'You deleted your account';
    case ActivityType.UPDATE_ACCOUNT:
      return 'You updated your account';
    case ActivityType.VERIFY_EMAIL:
      return 'You verified your email';
    case ActivityType.REQUEST_PASSWORD_RESET:
      return 'You requested a password reset';
    case ActivityType.RESET_PASSWORD:
      return 'You reset your password';
    case ActivityType.ACCOUNT_LOCKED:
      return 'Your account was locked';
    case ActivityType.ACCOUNT_UNLOCKED:
      return 'Your account was unlocked';
    // New mentorship activity types
    case ActivityType.ACTIVATE_MENTOR_ROLE:
      return 'You activated your mentor role';
    case ActivityType.ACTIVATE_MENTEE_ROLE:
      return 'You activated your mentee role';
    case ActivityType.UPDATE_MENTOR_PROFILE:
      return 'You updated your mentor profile';
    case ActivityType.UPDATE_MENTEE_PROFILE:
      return 'You updated your mentee profile';
    case ActivityType.REQUEST_MENTOR:
      return 'You requested a mentor';
    case ActivityType.ACCEPT_MENTEE:
      return 'You accepted a mentee';
    case ActivityType.REJECT_MENTEE:
      return 'You rejected a mentee request';
    case ActivityType.END_MENTORSHIP:
      return 'You ended a mentorship';
    case ActivityType.SCHEDULE_MEETING:
      return 'You scheduled a meeting';
    case ActivityType.COMPLETE_MEETING:
      return 'You completed a meeting';
    case ActivityType.CANCEL_MEETING:
      return 'You cancelled a meeting';
    case ActivityType.REGISTER_EVENT:
      return 'You registered for an event';
    case ActivityType.ATTEND_EVENT:
      return 'You attended an event';
    case ActivityType.UPLOAD_RESOURCE:
      return 'You uploaded a resource';
    case ActivityType.ACCESS_RESOURCE:
      return 'You accessed a resource';
    case ActivityType.UPGRADE_MEMBERSHIP:
      return 'You upgraded your membership';
    case ActivityType.CANCEL_MEMBERSHIP:
      return 'You cancelled your membership';
    default:
      return 'Unknown action occurred';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Activity Log
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const formattedAction = formatAction(
                  log.action as ActivityType
                );

                return (
                  <li key={log.id} className="flex items-center space-x-4">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {formattedAction}
                        {log.ipAddress && ` from IP ${log.ipAddress}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(new Date(log.timestamp))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No activity yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                When you perform actions like signing in or updating your
                account, they'll appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
