import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";

export default function Notes() {
    return (
        <div className="min-h-screen bg-background">
            <GridPattern
                width={80}
                height={80}
                className="fixed inset-0 stroke-foreground/50 fill-foreground/20 mask-image:radial-gradient(400px_circle_at_center,white,transparent) "
                // className = "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                strokeDasharray="5 10"
            />

            <div className="text-4xl">
                Notes
            </div>
            <br />
            <br />
            <div className="italics">
                to be done...
            </div>
        </div>
    );
}
