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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { data, Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "../context/userContext";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [otpTime, setOtpTime] = useState(false);
  const navigate = useNavigate();
  const {apiUrl, setApiUrl, user, setUser} = useUser();

  const loginForm = useForm({ defaultValues: { username: "", password: "" } });
  const registerForm = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      deptId: "",
      password: "",
      confirmPassword: "",
    },
  });
  const otpForm = useForm({
    defaultValues: {
      pin1: "",
      pin2: "",
    },
  });
  

  const handleSubmit = async (data, isRegistering) => {
    setIsPending(true);
    setError(null);
    console.log(data);
    if (!isRegistering){
      if(data.username === "dev" && data.password === "sagar")
        setDialogOpen(true);
      navigate("/home");
    } 
    setOtpTime(true);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-0">
          <div className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg">
            <Card>
              <CardHeader>
                <CardTitle>Enter API URL</CardTitle>
                <CardDescription>
                  Please provide the API URL that you want to use.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e)=>setApiUrl(e.target.value)}
                  placeholder="Enter API URL"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </CardContent>
              <div className="p-4 flex justify-end">
                <button
                  onClick={()=>{
                    setApiUrl(apiUrl);
                    setDialogOpen(false);
                  }}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={()=>setDialogOpen(false)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
      <div className="w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Wildlife Watch</CardTitle>
            <CardDescription>
              Join us in protecting wildlife through technology
            </CardDescription>
          </CardHeader>
          {otpTime && (
            <CardContent>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(data=>console.log(data))
                }
                className="w-2/3 space-y-6"
              >
                <FormField
                  name="pin1"
                  control={otpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="pin2"
                  control={otpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your Gmail.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          )}
          {!otpTime && (
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit((data) =>
                        handleSubmit(data, false)
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        name="username"
                        control={loginForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="password"
                        control={loginForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && <p className="text-red-500">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isPending}
                      >
                        Login
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit((data) =>
                        handleSubmit(data, true)
                      )}
                      className="space-y-4"
                    >
                      {/* Username */}
                      <FormField
                        name="username"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        name="email"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone Number */}
                      <FormField
                        name="phone"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Dept ID */}
                      <FormField
                        name="deptId"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dept ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        name="password"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Confirm Password */}
                      <FormField
                        name="confirmPassword"
                        control={registerForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && <p className="text-red-500">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isPending}
                      >
                        Register
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Right Column (Image Full Screen) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth.jpeg')" }}
      ></div>
    </div>
  );
}
