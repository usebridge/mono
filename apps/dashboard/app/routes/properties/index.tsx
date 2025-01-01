import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  ScrollArea,
  Separator,
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
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  AlignJustify,
  Bath,
  Bed,
  CalendarDays,
  Check,
  Download,
  EllipsisVertical,
  Minus,
  MoveDiagonal2,
  Ruler,
  Tag,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable } from "../../../components/data-table/data-table";
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

  function handleExport() {
    console.log("export");
  }

  const columns: ColumnDef<(typeof MOCK_PROPERTIES)[number]>[] = useMemo(
    () => [
      {
        accessorKey: "dateAvailable",
        header: "Available from",
        cell: ({ getValue }) => (
          <p className="text-sm text-muted-foreground">
            {format(getValue() as Date, "dd/MM/yyyy")}
          </p>
        ),
      },
      {
        id: "propertyDetails",
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
                  <h2 className="capitalize">{rowValues.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    - {rowValues.squareFootage} sq ft,{" "}
                    <span className="capitalize">{rowValues.propertyType}</span>
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

  // TODO: This would be nice to hold in local storage, we should create
  // a Zustand store or equivalent stateful managing hook to handle small
  // pieces that we want to persist. A store might be more hassle than worth
  // with the type sig requirements so a custom hook that infers could be really
  // nice depending on implementation.
  const [visibleColumns, setVisibleColumns] = useState({
    dateAvailable: true,
    propertyDetails: true,
    status: true,
    price: true,
  });

  function handleColumnSelection(column: string) {
    setVisibleColumns((prevColumns) => {
      return {
        ...prevColumns,
        // @ts-expect-error - needs fixing at some point
        [column]: !prevColumns[column],
      };
    });
  }

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
            <TabsList className="flex gap-1 items-center">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            <Button onClick={handleAddProperty} variant="outline">
              Add Property
            </Button>
          </div>

          <Separator />

          <TabsContent value="table">
            <div className="flex gap-2 justify-between items-center">
              <Input placeholder="Search properties" className="mb-4 w-64" />
              <div className="flex gap-x-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <AlignJustify />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {columns.map((col) => {
                      // FIX:
                      // @ts-expect-error this needs some type massaging somewhere, can be fixed later
                      const id = col?.accessorKey ?? col.id;
                      return (
                        <DropdownMenuItem
                          key={id}
                          onClick={() => handleColumnSelection(id)}
                        >
                          {/* @ts-expect-error - yeet */}
                          {visibleColumns[id] ? <Check /> : <Minus />}
                          {col.header}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={handleExport} variant="outline">
                  <Download />
                </Button>
              </div>
            </div>

            <DataTable
              data={DUPLICATED_MOCK_DATA}
              columns={columns}
              visibleColumns={visibleColumns}
              // FIX:
              // @ts-expect-error not arsed about this for now, will fix later
              setVisibleColumns={setVisibleColumns}
              onRowClick={(rowValue) => {
                setIsSheetOpen(true);
                setSelectedProperty(rowValue);
              }}
            />
          </TabsContent>

          <TabsContent value="cards">card content m8</TabsContent>
        </Tabs>

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
              <SheetTitle className="my-0">
                {selectedProperty?.title}
              </SheetTitle>
              <SheetDescription>
                {selectedProperty?.addressLine1}, {selectedProperty?.city},{" "}
                {selectedProperty?.postcode}
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
                <p className="text-muted-foreground">
                  {selectedProperty?.description}
                </p>
                <Separator className="my-3" />
                <div className="flex gap-2 p-3">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedProperty?.bedrooms} Beds
                  </span>
                </div>
                <div className="flex gap-2 p-3">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedProperty?.bathrooms} Baths
                  </span>
                </div>
                <div className="flex gap-2 p-3">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedProperty?.squareFootage} sq ft
                  </span>
                </div>
                <div className="flex gap-2 p-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Available{" "}
                    {new Date(
                      selectedProperty?.dateAvailable ?? "",
                    ).toLocaleDateString()}
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
                          £{selectedProperty?.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Property Type
                        </div>
                        <div className="font-medium capitalize">
                          {selectedProperty?.propertyType}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Sale Type
                        </div>
                        <div className="font-medium capitalize">
                          {selectedProperty?.saleType}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Status
                        </div>
                        <Badge
                          variant={
                            selectedProperty?.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {selectedProperty?.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Energy Rating
                        </div>
                        <div className="font-medium">
                          {selectedProperty?.energyEfficiencyRating}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          County
                        </div>
                        <div className="font-medium">
                          {selectedProperty?.county}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <h3 className="font-semibold">Full Address</h3>
                    <div className="text-muted-foreground">
                      <p>{selectedProperty?.addressLine1}</p>
                      {selectedProperty?.addressLine2 && (
                        <p>{selectedProperty?.addressLine2}</p>
                      )}
                      <p>{selectedProperty?.city}</p>
                      <p>{selectedProperty?.county}</p>
                      <p>{selectedProperty?.postcode}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
