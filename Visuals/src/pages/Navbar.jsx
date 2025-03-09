import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Briefcase, LogOut, BarChart, MapPin } from "lucide-react";
import { ThemeToggle } from "../context/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">WildLife Watch</Link>

        <div className="flex items-center gap-6">
          <Link to="/about" className="flex items-center gap-2 hover:text-primary">
            <Info className="h-4 w-4" /> About
          </Link>

          <Link to="/work" className="flex items-center gap-2 hover:text-primary">
            <Briefcase className="h-4 w-4" /> Our Work
          </Link>

          <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary">
            <BarChart className="h-4 w-4" /> Dashboard
          </Link>

          <Link to="/map" className="flex items-center gap-2 hover:text-primary">
            <MapPin className="h-4 w-4" /> Maps
          </Link>

          <ThemeToggle />
          <Button variant="ghost" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
