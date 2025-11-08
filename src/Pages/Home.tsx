import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";
import { FloatingDock } from "@/components/ui/floating-dock";

import HomeIcon from "@/components/my-comps/Home-Icon";
import Cart from "@/components/my-comps/Cart";

export default function Home() {

    const dockItems = [
        {
            title: "Home",
            icon: <HomeIcon />,
            href: "/"
        },

        {
            title: "Cart",
            icon: <Cart />,
            href: "/checkout"
        }
    ]

    return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background p-20">
      <GridPattern
        width={80}
        height={80}
        className="absolute inset-0 stroke-foreground/50 fill-foreground/20 mask-image:radial-gradient(400px_circle_at_center,white,transparent)"
        // className = "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        strokeDasharray="5 10"
      />
    <div > Home page </div>

    <FloatingDock items={dockItems}>

    </FloatingDock>
    </div>

  );
}
