import { Copy, ShareFat } from "@phosphor-icons/react";

import { copyToClipboard } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useLocation, useSearchParams } from "@remix-run/react";
import { hasValidSearchParams } from "@/lib/helpers";

export default function Share() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [withFilter, setWithFilter] = useState(true);

  useEffect(() => {
    // Can't access window object in SSR
    setOrigin(window.location.origin);
  }, [setOrigin]);

  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams] = useSearchParams();
  const validSearchParams = hasValidSearchParams(searchParams);
  const link = String(
    `${origin}${pathname}${validSearchParams && withFilter ? location.search : ""}`,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShareFat size={24} weight="duotone" />
          <span className="max-sm:sr-only">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Thank you for sharing the site!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={link} readOnly />
          </div>
          <Button
            onClick={() => {
              copyToClipboard(link);
              setOpen(false);
            }}
            type="submit"
            size="icon"
          >
            <span className="sr-only">Copy</span>
            <Copy size={24} weight="duotone" />
          </Button>
        </div>
        {pathname === "/" && validSearchParams && (
          <DialogFooter className={"sm:justify-start"}>
            <div className=" flex items-center space-x-2">
              <Checkbox
                id="filter"
                checked={withFilter}
                onCheckedChange={() => setWithFilter(!withFilter)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="filter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include filters
                </label>
              </div>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
