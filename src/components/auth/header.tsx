import { cn } from "@/utils/cn";

interface HeaderProps {
  label: string;
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold")}>Auth 🔐</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </header>
  );
};
