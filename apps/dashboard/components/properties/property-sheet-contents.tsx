import {
  Badge,
  Button,
  ScrollArea,
  Separator,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ho/ui";
import {
  Bath,
  Bed,
  CalendarDays,
  EllipsisVertical,
  MoveDiagonal2,
  Ruler,
  X,
} from "lucide-react";

type PropertySheetContentProps = {
  // TODO: Type this correctly
  property: Record<string, any>;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PropertySheetContents({
  property,
  setIsSheetOpen,
}: PropertySheetContentProps) {
  return (
    <SheetContent
      showCloseBtn={false}
      onOverlayClick={() => setIsSheetOpen(false)}
    >
      <div className="flex gap-2 justify-between items-center mb-4">
        <h4 className="text-lg">Property details</h4>

        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <MoveDiagonal2 />
          </Button>
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
          <SheetTitle className="my-0">{property?.title}</SheetTitle>
          <SheetDescription>
            {property?.addressLine1}, {property?.city}, {property?.postcode}
          </SheetDescription>
        </SheetHeader>
      </div>

      <Tabs className="mt-5" defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="w-full" value="details">
            Details
          </TabsTrigger>
          {/* TODO: Viewings tab and content that relates to this property */}
          <TabsTrigger className="w-full" value="viewings">
            Viewings
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="space-y-3">
          <TabsContent value="overview">
            <p className="text-muted-foreground">{property?.description}</p>
            <Separator className="my-3" />
            <div className="flex gap-2 p-3">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {property?.bedrooms} Beds
              </span>
            </div>
            <div className="flex gap-2 p-3">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {property?.bathrooms} Baths
              </span>
            </div>
            <div className="flex gap-2 p-3">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {property?.squareFootage} sq ft
              </span>
            </div>
            <div className="flex gap-2 p-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                Available{" "}
                {new Date(property?.dateAvailable ?? "").toLocaleDateString()}
              </span>
            </div>
          </TabsContent>
          {/* TODO: Align this with the Overview content styles and layout */}
          <TabsContent value="details" className="px-6 mt-2">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Price
                    </div>
                    <div className="font-medium">
                      £{property?.price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Property Type
                    </div>
                    <div className="font-medium capitalize">
                      {property?.propertyType}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Sale Type
                    </div>
                    <div className="font-medium capitalize">
                      {property?.saleType}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Status
                    </div>
                    <Badge
                      variant={
                        property?.status === "active" ? "default" : "secondary"
                      }
                    >
                      {property?.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Energy Rating
                    </div>
                    <div className="font-medium">
                      {property?.energyEfficiencyRating}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      County
                    </div>
                    <div className="font-medium">{property?.county}</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <h3 className="font-semibold">Full Address</h3>
                <div className="text-muted-foreground">
                  <p>{property?.addressLine1}</p>
                  {property?.addressLine2 && <p>{property?.addressLine2}</p>}
                  <p>{property?.city}</p>
                  <p>{property?.county}</p>
                  <p>{property?.postcode}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </SheetContent>
  );
}
