import { GridPattern } from "../components/ui/shadcn-io/grid-pattern";
import UserLogin from "../components/my-comps/Login-Card";
import SVG from "../components/ui/svg-comp";
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function Login() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background p-20">
      <GridPattern
        width={ 80 }
        height={ 80 }
        className="absolute inset-0 stroke-foreground/50 fill-foreground/20 mask-image:radial-gradient(400px_circle_at_center,white,transparent)"
        // className = "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        strokeDasharray="5 10"
      />

      <SVG svgName="Star-2" scale="200px" color="#FDFFD4" className="fixed top-5 right-5 opacity-95" />

      <SVG svgName="Star-2" scale="200px" color="#FDFFD4" className="fixed bottom-5 left-5 opacity-95" />

      <SVG svgName="Star-1" scale="700px" color="#FDFFD4" className="fixed animate-spin-slow-5" />

      <div className="fixed top-12 left-38 scale-500" >
        <EncryptedText text="Gro-Story" />
      </div>

      <UserLogin />
    </div>
  );
}
