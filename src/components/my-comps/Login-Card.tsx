"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

//Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

//Firebase
import { signUp, logIn } from "../../../backend/scripts/auth";

//Routing
import { useNavigate } from "react-router-dom";

//Props Structure for Sign-up and Log-in forms
interface FormProps {
  onNavigate: () => void;
}

function SignupForm({ onNavigate }: FormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    try{
      await signUp(email, password);
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("sign up failed", error);
      
      // Handle specific Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        toast.error("Account already exists with this email");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (error.code === "auth/missing-password") {
        toast.error("Please enter a password");
      } else if (error.code === "auth/missing-email") {
        toast.error("Please enter an email address");
      } else {
        toast.error("Sign up failed. Please try again");
      }
    }
  };

  return (
    <div className="shadow-input mx-auto w-[100%] max-w-md rounded-none bg-card/90 backdrop-blur-[2.5px] p-4 md:rounded-2xl md:p-8 border-2 border-accent">
      <h2 className="text-xl font-bold text-foreground">
        Welcome to Gro-Story
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Get your groceries in dash!
      </p>

      <form className="my-8 text-amber-950" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="signup-email">Email Address</Label>
          <Input
            id="signup-email"
            placeholder="Enter Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            placeholder="Enter Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_oklch(var(--primary-foreground)/.25)_inset,0px_-1px_0px_0px_oklch(var(--primary-foreground)/.25)_inset]"
          type="submit"
        >
          Sign Up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </form>

      <div
        className="text-foreground text-center cursor-pointer hover:text-primary transition-colors"
        onClick={onNavigate}
      >
        Login
      </div>
    </div>
  );
}

function LoginForm({ onNavigate }: FormProps) {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      await logIn(email, password);
      toast.success("Login successful!");
      navigate("/home")  // Use imported function
    } catch (error: any) {
      console.error("Login failed", error);
      
      // Handle specific Firebase error codes
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        toast.error("Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (error.code === "auth/missing-password") {
        toast.error("Please enter a password");
      } else if (error.code === "auth/missing-email") {
        toast.error("Please enter an email address");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Please try again later");
      } else if (error.code === "auth/user-disabled") {
        toast.error("This account has been disabled");
      } else {
        toast.error("Login failed. Please try again");
      }
    }
  };

  return (
    <div className="shadow-input mx-auto w-[100%] max-w-md rounded-none bg-card/90 backdrop-blur-[2.5px] p-4 md:rounded-2xl md:p-8 border-2 border-accent">
      <h2 className="text-xl font-bold text-foreground">
        Welcome to Gro-Story
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Get your groceries in dash!
      </p>

      <form className="my-8 text-amber-950" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="login-email">Email Address</Label>
          <Input
            id="login-email"
            placeholder="Enter Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            placeholder="Enter Your password"
            type="password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_oklch(var(--primary-foreground)/.25)_inset,0px_-1px_0px_0px_oklch(var(--primary-foreground)/.25)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </form>

      <div
        className="text-foreground text-center cursor-pointer hover:text-primary transition-colors"
        onClick={onNavigate}
      >
        Create an account
      </div>
    </div>
  );
}

//Login+Signup Carousel
export default function UserLogin() {
  //setting the api to scroll by clickng text
  const [api, setApi] = React.useState<CarouselApi>();

  const goToSignup = () => {
    api?.scrollTo(1);
  };

  const goToLogin = () => {
    api?.scrollTo(0);
  };

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>
          {" "}
          <LoginForm onNavigate={goToSignup} />{" "}
        </CarouselItem>
        <CarouselItem>
          {" "}
          <SignupForm onNavigate={goToLogin} />{" "}
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

//Extra Components
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
