import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { user, userAttributes, logout } = useAuth();

  // The ProtectedRoute component handles redirection if not authenticated
  // user should be present if this component renders (except briefly during transitions/loading which ProtectedRoute handles)
  if (!user) {
    return null;
  }

  return (
    <div className="container max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-neutral-50">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono mt-1">{user.userId}</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm font-mono mt-1">{userAttributes?.email || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-lg bg-neutral-50">
                <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                <p className="text-sm font-mono mt-1">{userAttributes?.email_verified === 'true' ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="destructive" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
