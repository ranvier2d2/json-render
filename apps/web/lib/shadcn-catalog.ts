import { ActionSchema, createCatalog } from "@json-render/core";
import { z } from "zod";

export const shadcnCatalog = createCatalog({
  name: "Shadcn UI",
  components: {
    Badge: {
      props: z.object({
        label: z.string(),
        variant: z
          .enum(["default", "secondary", "destructive", "outline"])
          .optional(),
      }),
    },
    Button: {
      props: z.object({
        label: z.string(),
        variant: z
          .enum([
            "default",
            "destructive",
            "outline",
            "secondary",
            "ghost",
            "link",
          ])
          .optional(),
        size: z
          .enum(["default", "sm", "lg", "icon", "icon-sm", "icon-lg"])
          .optional(),
        action: ActionSchema.optional(),
      }),
    },
    Card: {
      props: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
      hasChildren: true,
    },
    Sheet: {
      props: z.object({}),
      hasChildren: true,
    },
    SheetTrigger: {
      props: z.object({
        text: z.string().optional(),
      }),
      hasChildren: true,
    },
    SheetContent: {
      props: z.object({
        side: z.enum(["top", "bottom", "left", "right"]).optional(),
      }),
      hasChildren: true,
    },
    SheetHeader: {
      props: z.object({}),
      hasChildren: true,
    },
    SheetFooter: {
      props: z.object({}),
      hasChildren: true,
    },
    SheetTitle: {
      props: z.object({
        text: z.string().optional(),
      }),
      hasChildren: true,
    },
    SheetDescription: {
      props: z.object({
        text: z.string().optional(),
      }),
      hasChildren: true,
    },
    SheetClose: {
      props: z.object({
        text: z.string().optional(),
      }),
      hasChildren: true,
    },
    Tabs: {
      props: z.object({
        value: z.string().optional(),
        defaultValue: z.string().optional(),
      }),
      hasChildren: true,
    },
    TabsList: {
      props: z.object({}),
      hasChildren: true,
    },
    TabsTrigger: {
      props: z.object({
        value: z.string(),
        label: z.string().optional(),
      }),
      hasChildren: true,
    },
    TabsContent: {
      props: z.object({
        value: z.string(),
      }),
      hasChildren: true,
    },
  },
});
