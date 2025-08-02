import { GoHome, GoHomeFill ,GoCheckCircle,GoCheckCircleFill} from "react-icons/go";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    active: GoHomeFill,
  },
  {
    label: "Boards",
    href: "/boards",
    icon: GoCheckCircle,
    active: GoCheckCircleFill,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col gap-y-2">
      {routes.map((item) => {
        const isActive = false; // Replace with your actual logic (e.g., using usePathname())
        const IconComponent = isActive ? item.active : item.icon;
        <Separator className="my-2 " />;
        return (
          <Link key={item.href} href={item.href}>
            <div
             
              className={cn("flex items-center gap-2.5 p-2.5 rounded-md font-normal text-md hover:text-primary transition text-neutral-500"
                , isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}>
            
              <IconComponent className="size-5 text-neutral-500 size-xs" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
