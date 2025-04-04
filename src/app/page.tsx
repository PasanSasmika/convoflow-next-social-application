import ModeToggle from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
   <div className="m-4">
    
    <SignedOut>
              <SignInButton mode="modal">
                <Button>
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button variant={"secondary"}>
              Click me
            </Button>
            <ModeToggle/>
   </div>
  );
}
