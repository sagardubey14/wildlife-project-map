import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Briefcase, LogOut, BarChart, MapPin, LogIn } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "../context/userContext";


export default function Navbar() {

  const {user, setUser} = useUser();
  
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

          {user && <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary">
            <BarChart className="h-4 w-4" /> Dashboard
          </Link>}

          <Link to="/map" className="flex items-center gap-2 hover:text-primary">
            <MapPin className="h-4 w-4" /> Maps
          </Link>

          <ThemeToggle />
          {!user?
          <Link to="/auth">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2" >
            <LogIn className="h-4 w-4" /> 
            LogIn
          </Button>
          </Link>:
          <Link to="/auth">
          <Button 
            onClick = {()=>setUser("")}
            variant="ghost" 
            className="flex items-center gap-2" >
            <LogOut className="h-4 w-4" /> 
            Logout
          </Button>
          </Link>}
        </div>
      </div>
    </nav>
  );
}
