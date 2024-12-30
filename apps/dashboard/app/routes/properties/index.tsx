import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../components/data-table/data-table";
import { useMemo, useState } from "react";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ho/ui";
import { useWindowEvent } from "../../../hooks/use-window-event";

export const Route = createFileRoute("/properties/")({
  component: RouteComponent,
});

const MOCK_PROPERTIES = [
  {
    id: "0000-0000-0000-0000",
    agentId: "0000-0000-0000-0000",
    title: "Sivalrid",
    description:
      "Sivalrid is a property located in the heart of the city. It is a detached house with a large yard and a large backyard. It is located in the heart of the city and is surrounded by other properties.",
    propertyType: "detached",
    saleType: "sale",
    price: 100000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1000,
    addressLine1: "123 Main St",
    addressLine2: "Suite 100",
    city: "New York",
    postcode: "10001",
    county: "New York",
    features: ["Garden", "Pool", "Patio"],
    energyEfficiencyRating: 80,
    status: "active",
    dateAvailable: "2023-01-01",
  },
];

const DUPLICATED_MOCK_DATA = new Array(10).fill(MOCK_PROPERTIES[0]);

function RouteComponent() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<(typeof MOCK_PROPERTIES)[number]>();

  useWindowEvent("keydown", (ev) => {
    if (isSheetOpen && ev.key === "Escape") {
      setIsSheetOpen(false);
    }
  });

  function handleAddProperty() {
    console.log("add property");
  }

  const columns: ColumnDef<(typeof MOCK_PROPERTIES)[number]>[] = useMemo(
    () => [
      {
        accessorKey: "dateAvailable",
        header: "Available from",
        // TODO: Date-fns to format this
      },
      {
        id: "property-details",
        header: "Property details",
        cell: ({ row }) => {
          const rowValues = row.original;

          return (
            <div className="flex gap-2 items-center">
              <img
                src="https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cover of the property"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <div className="flex gap-1 items-center mb-2">
                  <h2 className="capitalize">{rowValues.propertyType}</h2>
                  <p className="text-sm text-muted-foreground">
                    - {rowValues.squareFootage} sq ft
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {rowValues.addressLine1}, {rowValues.city},{" "}
                  {rowValues.postcode}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const rowValues = row.original;

          // TODO: Style based on status value
          return (
            <Badge
              className="py-1 text-xs capitalize text-teal-600"
              variant="secondary"
            >
              {rowValues.status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          const rowValues = row.original;

          return (
            <p>
              {rowValues.price.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP",
              })}
            </p>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Properties</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Sheet open={isSheetOpen}>
        <Tabs defaultValue="table" className="mt-6 space-y-6">
          <div className="flex justify-between">
            <TabsList className="flex gap-4 items-center w-fit">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            <Button onClick={handleAddProperty} variant="outline">
              Add Property
            </Button>
          </div>

          <TabsContent value="table">
            <DataTable
              data={DUPLICATED_MOCK_DATA}
              columns={columns}
              onRowClick={(rowValue) => {
                setIsSheetOpen(true);
                setSelectedProperty(rowValue);
              }}
            />
          </TabsContent>
          <TabsContent value="cards">card content m8</TabsContent>
        </Tabs>

        <SheetContent
          onOverlayClick={() => setIsSheetOpen(false)}
          onCloseClick={() => setIsSheetOpen(false)}
        >
          <SheetHeader>
            <SheetTitle>Property information</SheetTitle>
            <SheetDescription>
              {selectedProperty?.title}
              <br />
              {selectedProperty?.addressLine1}, {selectedProperty?.city},{" "}
              {selectedProperty?.postcode}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
