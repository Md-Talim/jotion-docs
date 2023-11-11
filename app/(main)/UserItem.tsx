import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";

const UserNameWithAvatar = ({
  imageUrl,
  fullName,
}: {
  imageUrl: string;
  fullName: string;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar className="h-5 w-5">
        <AvatarImage src={imageUrl} />
      </Avatar>
      <span className="line-clamp-1 text-start font-medium">
        {fullName}&apos;s Jotion
      </span>
    </div>
  );
};

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex w-full items-center p-3 text-sm hover:bg-primary/5">
          <UserNameWithAvatar
            imageUrl={user?.imageUrl!}
            fullName={user?.fullName!}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col gap-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          {/* User Name and profile photo */}
          <UserNameWithAvatar
            imageUrl={user?.imageUrl!}
            fullName={user?.fullName!}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
