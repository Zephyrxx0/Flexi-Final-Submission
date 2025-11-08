"use client";
import React from "react";
import { cn } from "@/lib/utils";

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
    } catch (error) {
      console.error("sign up failed", error)
    }
  };

  return (
    <div className="shadow-input mx-auto w-[100%] max-w-md rounded-none bg-card/90 backdrop-blur-[2.5px] p-4 md:rounded-2xl md:p-8 border-2 border-[#FDFFD4]">
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
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
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
      navigate("/home")  // Use imported function
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="shadow-input mx-auto w-[100%] max-w-md rounded-none bg-card/90 backdrop-blur-[2.5px] p-4 md:rounded-2xl md:p-8 border-2 border-[#FDFFD4]">
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
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
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
