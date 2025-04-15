import {
  Button,
  Separator,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  buttonVariants,
} from "@ho/ui";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { EllipsisVertical, MoveDiagonal2, X } from "lucide-react";
import type { MOCK_PROPERTIES } from "~/src/routes/properties";
import { DATE_FORMAT } from "~/utils/consts";

type PropertySheetContentProps = {
  // TODO: Type this correctly
  property: (typeof MOCK_PROPERTIES)[0];
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUnmount?: () => void;
};

export function PropertySheetContents({
  property,
  setIsSheetOpen,
}: PropertySheetContentProps) {
  return (
    <SheetContent
      className="w-2/5 md:max-w-lg h-full flex flex-col"
      showCloseBtn={false}
      onOverlayClick={() => setIsSheetOpen(false)}
    >
      <div className="flex gap-2 justify-between items-center">
        <h4 className="text-lg">Property details</h4>

        <div className="flex gap-2 items-center">
          <Link
            to="/properties/$propertyId"
            params={{ propertyId: property.id }}
            preload="render"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <MoveDiagonal2 />
          </Link>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
          <Button
            onClick={() => setIsSheetOpen(false)}
            variant="ghost"
            size="icon"
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <img
          src="https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cover of the property"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <SheetHeader className="space-y-0">
          <SheetTitle className="my-0">{property.title}</SheetTitle>
          <SheetDescription>
            {property.addressLine1}, {property.city}, {property.postcode}
          </SheetDescription>
        </SheetHeader>
      </div>

      <Tabs className="flex flex-col flex-grow" defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="w-full" value="viewings">
            Viewings
          </TabsTrigger>
          <TabsTrigger className="w-full" value="documents">
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex flex-col pt-3 space-y-6">
          <p className="text-muted-foreground">{property.description}</p>
          <Separator className="my-3" />
          <div className="grid gap-x-2 md:gap-y-8 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Price:
              </p>
              <p>£{property.price.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Listing Date:
              </p>
              <p className="capitalize">
                {format(property.listingDate, DATE_FORMAT.date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Available from:
              </p>
              <p className="capitalize">
                {format(property.dateAvailable, DATE_FORMAT.date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Listing Type:
              </p>
              <p className="capitalize">{property.saleType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Property Type:
              </p>
              <p className="capitalize">{property.propertyType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Council Tax Band:
              </p>
              <p className="capitalize">{property.councilTaxBand}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Bedrooms:
              </p>
              <p>{property.bedrooms}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Bathrooms:
              </p>
              <p>{property.bathrooms}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Energy Rating:
              </p>
              <p className="capitalize">{property.energyEfficiencyRating}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
                Square Footage:
              </p>
              <p className="capitalize">{property.squareFootage}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="viewings"
          className="flex flex-col flex-grow h-full justify-between pt-3 space-y-6"
        >
          <div className="flex-1">List of viewings to go in here...</div>
          <Button variant="outline" className="w-full">
            New viewing
          </Button>
        </TabsContent>
      </Tabs>
    </SheetContent>
  );
}
