import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useTheme } from "@/context/ThemeContext";

const mockAuth = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === "admin" && data.password === "admin") {
        resolve({ user: { username: "admin" } });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });
};

export default function Auth() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const loginForm = useForm({ defaultValues: { username: "", password: "" } });
  const registerForm = useForm({ defaultValues: { username: "", password: "", role: "user" } });

  const handleSubmit = async (data, isRegistering) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await mockAuth(data);
      setUser(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Wildlife Watch</CardTitle>
            <CardDescription>Join us in protecting wildlife through technology</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit((data) => handleSubmit(data, false))} className="space-y-4">
                    <FormField name="username" control={loginForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="password" control={loginForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isPending}>Login</Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit((data) => handleSubmit(data, true))} className="space-y-4">
                    <FormField name="username" control={registerForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="password" control={registerForm.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isPending}>Register</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Column (Image Full Screen) */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b')" }}>
        {/* <div className="absolute top-4 right-4">
          <Button onClick={toggleTheme} className="bg-gray-800 text-white hover:bg-gray-700">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
