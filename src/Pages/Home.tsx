//components
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Navbar } from "@/components/ui/shadcn-io/navbar-08/Navbar";
import SVG from "@/components/ui/svg-comp";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import  LineBreak  from "@/components/my-comps/Linebreak";
import Footer from "@/components/my-comps/Footer";
// import { SimpleMorphExample } from "@/components/examples/MorphingSVGExample";


//icons
import HomeIcon from "@/components/my-comps/Home-Icon";
import Cart from "@/components/my-comps/Cart";
import ShopIcon from "@/components/my-comps/ShopIcon";
import GithubIcon from "@/components/my-comps/GithubIcon";
import CartSidePanel from "@/components/my-comps/CartSidePanel";

//images
import groceryImage from "@/assets/images/grocery.jpg";
import appleImage from "@/assets/images/apple.jpg";
import orangeImage from "@/assets/images/orange.jpg";

//functions and hooks
import { removeBg } from "@/scripts/removebg";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { get_items, get_all_items, get_stats, get_item_by_name, get_item_by_id } from '../../backend/scripts/grocery_item';
import { useAuth } from '../../backend/scripts/AuthContext';
import { logOut } from '../../backend/scripts/auth';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groceryItems, setGroceryItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch grocery items and process images
  useEffect(() => {
    async function fetchItems() {
      try {
        // Define search terms
        const searchTerms = ["apple", "orange", "banana", "strawberry", "avocado", "flour", "water", "chips"];
        
        // Fetch all items in parallel using Promise.all
        const results = await Promise.all(
          searchTerms.map(term => get_item_by_name(term))
        );
        
        // Get first match from each result and filter out nulls
        const fetchedItems = results
          .map(result => result[0])
          .filter(item => item);
        
        // Process each image through removeBg
        const processedItems = await Promise.all(
          fetchedItems.map(async (item) => {
            try {
              // Pass the image URL directly to removeBg
              const processedBuffer = await removeBg(item.image);
              
              // Convert ArrayBuffer to blob and create URL
              const processedBlob = new Blob([processedBuffer], { type: "image/png" });
              const processedUrl = URL.createObjectURL(processedBlob);
              
              return {
                title: item.name,
                src: processedUrl,
                description: item.description
              };
            } catch (error) {
              console.error(`Failed to process ${item.name}:`, error);
              // Fallback to original image
              return {
                title: item.name,
                src: item.image,
                description: item.description
              };
            }
          })
        );
        
        console.log("Processed items:", processedItems);
        setGroceryItems(processedItems);
      } catch (error) {
        console.error("Failed to fetch grocery items:", error);
        // Fallback to local images
        setGroceryItems([
          { title: "Apple", src: appleImage },
          { title: "Orange", src: orangeImage }
        ]);
      }
    }

    fetchItems();
    
    // Cleanup: revoke object URLs when component unmounts
    return () => {
      groceryItems.forEach(item => {
        if (item.src.startsWith('blob:')) {
          URL.revokeObjectURL(item.src);
        }
      });
    };
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout');
    }
  };

  const handleUsernameChange = async (newName: string) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: newName });
        toast.success('Username updated successfully');
      } catch (error) {
        console.error('Failed to update username:', error);
        toast.error('Failed to update username');
      }
    }
  };

  const handleUserItemClick = (item: string) => {
    if (item === 'logout') {
      handleLogout();
    }
  };

  const dockItems = [
    {
      title: "Home",
      icon: <HomeIcon />,
      href: "/",
    },

    {
      title: "Shop",
      icon: <ShopIcon />,
      href: "/shop",
    },
    {
      title: "Cart",
      icon: <Cart />,
      href: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleCartClick();
      },
    },
    {
        title: "Github",
        icon: <GithubIcon />,
        href: "https://github.com/Zephyrxx0"
    }
  ];


  return (
    <div className="w-full relative min-h-screen bg-background  ">
      <Navbar 
        userName={user?.displayName || user?.email?.split('@')[0] || 'User'}
        userEmail={user?.email || ''}
        userAvatar={user?.photoURL || undefined}
        onUserItemClick={handleUserItemClick}
        onUsernameChange={handleUsernameChange}
      />

      {/* Sticky Background */}
      <GridPattern
        width={80}
        height={80}
        className="fixed inset-0 stroke-foreground/50 fill-foreground/20 mask-image:radial-gradient(400px_circle_at_center,white,transparent) "
        // className = "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        strokeDasharray="5 10"
      />

      {/* Scrollable layer content is down from here */}
      <div className="relative flex min-h-screen w-full items-center justify-center p-20">


        <SVG
          svgName="Flower-1"
          scale="300"
          className="absolute top-20 left-20 "
        ></SVG>


        {/* Text Content */}
        <div className="absolute top-40 left-40 h-screen w-[40%] backdrop-blur-[4px] bg-background/15 pr-[25px] pl-[25px] pt-[15px]">
          <h1 className="text-border text-8xl">Nature's Basket</h1>

          <br />
          <br />
          <br />
          <br />

          <p className="text-foreground text-l max-w-[28rem]">
            Welcome to Nature's Basket, your all-in-one destination for fast,
            easy, and reliable online grocery shopping. From fresh fruits and
            vegetables to snacks, beverages, and household essentials -
            everything you need is just a few clicks away.
          </p>

          <br />
          <br />

          <p className="text-foreground text-l max-w-[28rem]">
            We understand that your time is valuable, which is why we&apos;ve
            made shopping effortless. Simply browse, order, and relax while we
            deliver your groceries right to your doorstep — fresh, on time, and
            hassle-free.
          </p>

          <br />
          <br />

          <p className="text-foreground text-l max-w-[28rem]">
            At Nature's Basket, we combine quality, convenience, and
            affordability to bring you the best grocery experience possible. Say
            goodbye to crowded stores and long queues — and hello to smarter
            shopping from the comfort of your home.
          </p>

        </div>

        {/* Image beside text content */}
        <img
          src={groceryImage}
          alt="Grocery image"
          className="absolute h-screen w-auto top-40 right-40 rounded-3xl ring-2 ring-border ring-offset-8 ring-offset-background z-10"
        />

        <br />
        <br />

      </div>
      
      {/* Featured Section */}
      <div className="relative w-full py-20 mt-50 ">
        <LineBreak/>

        <h1 className="text-4xl text-center mb-10 mt-15 font-[OnelySans]">
          <span className="text-border bg-foreground/10 px-4 py-2 rounded-2xl backdrop-blur-[5px]">Featured products</span>
        </h1>        
        
        <Carousel cards={groceryItems} />

      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} />
      </div>

      <CartSidePanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    <Footer />

    </div>
  );
}
