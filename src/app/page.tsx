import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="from sky-400 bg-blue-gradient flex h-full w-full items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth 🔐
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className="font-medium">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
