"use client";

import type { Action } from "@json-render/core";
import type {
  ComponentRegistry,
  ComponentRenderProps,
} from "@json-render/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BadgeProps = {
  label?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
};

type ButtonProps = {
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  action?: Action;
};

type CardProps = {
  title?: string;
  description?: string;
};

type TabsProps = {
  value?: string;
  defaultValue?: string;
};

type TabsTriggerProps = {
  value: string;
  label?: string;
};

type TabsContentProps = {
  value: string;
};

type SheetContentProps = {
  side?: "top" | "bottom" | "left" | "right";
};

type SheetTextProps = {
  text?: string;
};

export const shadcnRegistry: ComponentRegistry = {
  Badge: ({ element }: ComponentRenderProps<BadgeProps>) => (
    <Badge variant={element.props.variant}>{element.props.label}</Badge>
  ),
  Button: ({ element, onAction }: ComponentRenderProps<ButtonProps>) => (
    <Button
      variant={element.props.variant}
      size={element.props.size}
      onClick={
        element.props.action
          ? () => onAction?.(element.props.action as Action)
          : undefined
      }
    >
      {element.props.label}
    </Button>
  ),
  Card: ({ element, children }: ComponentRenderProps<CardProps>) => (
    <Card>
      {element.props.title || element.props.description ? (
        <CardHeader>
          {element.props.title ? (
            <CardTitle>{element.props.title}</CardTitle>
          ) : null}
          {element.props.description ? (
            <CardDescription>{element.props.description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  ),
  Sheet: ({ children }: ComponentRenderProps) => <Sheet>{children}</Sheet>,
  SheetTrigger: ({
    element,
    children,
  }: ComponentRenderProps<SheetTextProps>) => (
    <SheetTrigger asChild={Boolean(children)}>
      {children ?? element.props.text ?? "Open"}
    </SheetTrigger>
  ),
  SheetContent: ({
    element,
    children,
  }: ComponentRenderProps<SheetContentProps>) => (
    <SheetContent side={element.props.side}>{children}</SheetContent>
  ),
  SheetHeader: ({ children }: ComponentRenderProps) => (
    <SheetHeader>{children}</SheetHeader>
  ),
  SheetFooter: ({ children }: ComponentRenderProps) => (
    <SheetFooter>{children}</SheetFooter>
  ),
  SheetTitle: ({ element, children }: ComponentRenderProps<SheetTextProps>) => (
    <SheetTitle>{children ?? element.props.text}</SheetTitle>
  ),
  SheetDescription: ({
    element,
    children,
  }: ComponentRenderProps<SheetTextProps>) => (
    <SheetDescription>{children ?? element.props.text}</SheetDescription>
  ),
  SheetClose: ({ element, children }: ComponentRenderProps<SheetTextProps>) => (
    <SheetClose>{children ?? element.props.text ?? "Close"}</SheetClose>
  ),
  Tabs: ({ element, children }: ComponentRenderProps<TabsProps>) => (
    <Tabs value={element.props.value} defaultValue={element.props.defaultValue}>
      {children}
    </Tabs>
  ),
  TabsList: ({ children }: ComponentRenderProps) => (
    <TabsList>{children}</TabsList>
  ),
  TabsTrigger: ({
    element,
    children,
  }: ComponentRenderProps<TabsTriggerProps>) => (
    <TabsTrigger value={element.props.value}>
      {children ?? element.props.label}
    </TabsTrigger>
  ),
  TabsContent: ({
    element,
    children,
  }: ComponentRenderProps<TabsContentProps>) => (
    <TabsContent value={element.props.value}>{children}</TabsContent>
  ),
};
