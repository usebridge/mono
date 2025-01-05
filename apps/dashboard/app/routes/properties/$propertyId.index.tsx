import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ho/ui";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Heart,
  House,
  Share,
  SquareStack,
} from "lucide-react";
import { MOCK_PROPERTIES } from ".";

export const Route = createFileRoute("/properties/$propertyId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    console.log("params", params);
    return MOCK_PROPERTIES;
  },
});

function RouteComponent() {
  const data = useLoaderData({ from: "/properties/$propertyId/" });
  const property = data[1];
  console.log("data", data);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{property.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="space-y-4">
        <div>
          {/* <h2 className="text-4xl font-bold">{property.title}</h2> */}
          <div className="flex gap-3 items-end">
            <p className="font-bold text-3xl">
              £{property.price.toLocaleString()}
            </p>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary p-0 pt-1 underline gap-1"
            >
              Calculate mortgage <ArrowUpRight size={16} />
            </Button>
          </div>
          <p className="text-muted-foreground">
            {property.addressLine1}, {property.county}, {property.city},{" "}
            {property.postcode}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="h-96 overflow-hidden grid grid-cols-3 gap-2 items-start">
          <img
            src="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // TODO: Proper alt tags
            alt="Property visualisation"
            className="w-full h-full max-h-96 object-cover rounded-md shadow-sm col-span-2"
          />
          <div className="grid gap-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1670360211643-e9fff4b41628?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Property visualisation"
              className="w-full h-full max-h-72 object-cover rounded-md shadow-sm"
            />
            {/* This image and container controls the "view more images" behaviour but more visually   */}
            <div className="relative w-full h-full ">
              <img
                src="https://images.unsplash.com/photo-1605886290933-7ed7b3240d4a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Property visualisation"
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pr-4">
          <div className="flex gap-4 items-center">
            <Button
              size="sm"
              variant="link"
              className="flex gap-2 text-sm items-center font-thin text-muted-foreground hover:text-primary"
            >
              <Heart size={16} /> Save
            </Button>
            <Button
              size="sm"
              variant="link"
              className="flex gap-2 text-sm items-center font-thin text-muted-foreground hover:text-primary"
            >
              <Share size={16} /> Share
            </Button>
          </div>
          <div>
            <p className="font-thin text-sm text-muted-foreground">
              Date listed {format(new Date(property.listingDate), "dd/MM/yyyy")}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 grid-cols-3 px-4">
        <section className="space-y-6 col-span-2">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Property overview</h3>
            <p>{property.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">Notable features</h3>
            <div className="flex gap-8 items-center">
              <div className="flex gap-2 items-center">
                <House size={20} />
                <p className="text-secondary-foreground capitalize">
                  {property.propertyType}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <BedDouble size={20} />
                <p className="text-secondary-foreground">
                  {property.bedrooms} bedrooms
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Bath size={20} />
                <p className="text-secondary-foreground">
                  {property.bathrooms} bedrooms
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <SquareStack size={20} />
                <p className="text-secondary-foreground">
                  {property.squareFootage} square feet
                </p>
              </div>
            </div>
          </div>

          <div>
            {property.features.map((feature) => (
              <div className="flex gap-2 items-center" key={feature}>
                <ArrowRight size={16} />
                <p
                  key={feature}
                  className="font-thin text-secondary-foreground"
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="grid gap-4">
            <Button>Book a viewing</Button>
            <Button variant="outline">Contact the agent</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
