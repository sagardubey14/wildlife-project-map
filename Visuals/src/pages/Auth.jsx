import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "../context/userContext";
import io from "socket.io-client";

export default function Auth() {
  const { theme, toggleTheme } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [otpTime, setOtpTime] = useState(false);
  const { apiUrl, setApiUrl, user, setUser, review, setReview } = useUser();
  const [emailOtp, setEmailOtp] = useState(null);
  const [phoneOtp, setPhoneOtp] = useState(null);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    deptId: "",
    password: "",
    confirmPassword: "",
  });
  const [otpData, setOtpData] = useState({ pin1: "", pin2: "" });
  const [socketInstance, setSocketInstance] = useState();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && socketInstance) {
      socketInstance.emit("message", { type: "phone", value });
    }
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOtpChange = (name, value) => {
    if (name === "pin2" && socketInstance) {
      socketInstance.emit("message", { type: "otp", value });
    }
    setOtpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if(!otpTime) return;
    if (emailOtp == "Done" && (review ?phoneOtp === "yes": true)) {
      setUser(registerData.username);
    }
  },[emailOtp, phoneOtp, otpData, registerData])

  useEffect(() => {
    if (!review) return;
    const socket = io("http://localhost:3000", {
      query: {
        user: "auth",
      },
    });
    socket.on("verify-to-auth", (msg) => {
      setPhoneOtp(msg);
      if (msg === "no") setError("Invalid OTP");
      else {
        setError(null);
      }
      setIsPending(false);
    });
    setSocketInstance(socket);
    return () => {
      socket.disconnect();
    };
  }, [review]);

  const handleOTP = async (data) => {
    if(data.pin1.lenght < 6) return;
    setIsPending(true);
    setError(null);
    console.log(emailOtp, emailOtp !== "Done");
    if (socketInstance) {
      socketInstance.emit("message", { type: "otpsubmit", value: "done" });
    }
    if(emailOtp === "Done") return;
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...registerData, otp:data.pin1}),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Registration Error:', error);
      setError("An unexpected error occurred. Please try again.");
    }
    if(emailOtp !== "Done"){
      if(emailOtp != data.pin1) {
        setError("Invalid OTP");
        setIsPending(false);
      }else{
        setEmailOtp("Done")
      }
    }
  };

  const login = async (email, password) => {
    setIsPending(true);
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "An error occurred. Please try again.");
        return;
      }
      const result = await response.json();
      console.log(result);
      setUser(result.username);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
        return;
      }
      const result = await response.json();
      // console.log(result);
      setEmailOtp(result.otp);
      setOtpTime(true);

    } catch (error) {
      console.error('Registration Error:', error);
      setError("An unexpected error occurred. Please try again.");
    } finally{
      setIsPending(false);
    }
  };
  
  function isValidPassword(password) {
    if (password.length < 8) {
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasNumber && hasSpecialChar;
  }

  const handleSubmit = async (data, isRegistering) => {
    setIsPending(true);
    setError(null);
    if (!isRegistering) {
      if (data.email === "dev" && data.password === "sagar") {
        setDialogOpen(true);
        setIsPending(false);
      } else {
        login(data.email, data.password)
      }
    } else {
      if(!isValidPassword(data.password)){
        setIsPending(false);
        setError("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.")
        return;
      }
      if(data.password !== data.confirmPassword){
        setIsPending(false);
        setError("Password and confirmation password do not match.")
        return;
      }
      if (socketInstance) {
        socketInstance.emit("message", { type: "registered", value: "done" });
      }
      register(data)
    }
  };

  function forgotPassword(){
    const email = loginData.email
    const regex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    if(!regex.test(loginData.email)){
      alert("Please Enter valid Email");
      return;
    }
    fetch("http://localhost:8000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    });
  }

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-0">
          <div className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg p-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter API URL</CardTitle>
                <CardDescription>
                  Please provide the API URL that you want to use.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label
                    htmlFor="apiUrl"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    API URL
                  </label>
                  <input
                    type="text"
                    id="apiUrl"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="Enter API URL"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review:
                  </label>
                  <RadioGroup onValueChange={setReview} value={review}>
                    <div className="flex gap-4">
                      <Label className="flex items-center gap-2 text-foreground">
                        <RadioGroupItem value="ON" checked={review === "ON"} />{" "}
                        ON
                      </Label>
                      <Label className="flex items-center gap-2 text-foreground">
                        <RadioGroupItem
                          value="OFF"
                          checked={review === "OFF"}
                        />{" "}
                        OFF
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setApiUrl(apiUrl);
                    setDialogOpen(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 mr-5 rounded-md hover:bg-red-600 transition-colors"
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
              <div>
                <CardTitle>Email OTP</CardTitle>
                <CardDescription>
                  Enter the OTP sent to your email
                </CardDescription>
                <InputOTP
                  maxLength={6}
                  name="pin1"
                  value={otpData.pin1}
                  onChange={(e) => handleOtpChange("pin1", e)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {review &&<div>
                <CardTitle>Phone Number OTP</CardTitle>
                <CardDescription>
                  Enter the OTP sent to your phone
                </CardDescription>
                <InputOTP
                  maxLength={6}
                  name="pin2"
                  value={otpData.pin2}
                  onChange={(e) => handleOtpChange("pin2", e)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>}
              {error && <p className="text-red-500">{error}</p>}
              <Button className="mt-5" disabled={isPending} onClick={() => handleOTP(otpData)}>
                Submit
              </Button>
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(loginData, false);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label>Email</label>
                      <Input
                        name="email"
                        value={loginData.email}
                        onChange={(e) => handleLoginChange(e)}
                      />
                    </div>
                    <div>
                      <label>Password</label>
                      <Input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) => handleLoginChange(e)}
                      />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isPending}
                    >
                      Login
                    </Button>
                    <p
                     onClick={forgotPassword}
                     className="text-blue-500 font-semibold hover:underline cursor-pointer">Forgot Password?</p>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(registerData, true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label>Username</label>
                      <Input
                        name="username"
                        value={registerData.username}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    <div>
                      <label>Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    <div>
                      <label>Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    <div>
                      <label>Dept ID</label>
                      <Input
                        name="deptId"
                        value={registerData.deptId}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    <div>
                      <label>Password</label>
                      <Input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    <div>
                      <label>Confirm Password</label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleRegisterChange(e)}
                      />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isPending}
                    >
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Right Column (Image Full Screen) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth.webp')" }}
      ></div>
    </div>
  );
}
