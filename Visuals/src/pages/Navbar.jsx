import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Info, Briefcase, LogOut, BarChart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-primary">WildLife Watch</a>

        <div className="flex items-center gap-6">
          <a href="/about" className="flex items-center gap-2 hover:text-primary">
            <Info className="h-4 w-4" /> About
          </a>

          <a href="/work" className="flex items-center gap-2 hover:text-primary">
            <Briefcase className="h-4 w-4" /> Our Work
          </a>

          <a href="/dashboard" className="flex items-center gap-2 hover:text-primary">
            <BarChart className="h-4 w-4" /> Dashboard
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Maps
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="/map">User Map</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
