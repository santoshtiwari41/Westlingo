import { useState } from "react";

import { Edit2Icon, PlusCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditFaqDialog from "@/modules/admin/common/faqs/components/dialog/edit-faq-dialog";
import NewFaqItemDialog from "@/modules/admin/common/faqs/components/dialog/new-faq-item-dialog";
import FaqItemActions from "@/modules/admin/common/faqs/components/faq-item-actions";
import { OneOfFaqParent } from "@/types/types";

import type { GetFaq } from "../types";

interface FaqsPreviewProps {
  faq: GetFaq;
  parentRef: OneOfFaqParent;
}
const FaqsPreview = ({ faq, parentRef }: FaqsPreviewProps) => {
  const [open, setOpen] = useState(false);
  const [isEditFaqOpen, setIsEditFaqOpen] = useState(false);

  return (
    <div>
      <NewFaqItemDialog open={open} onOpenChange={setOpen} faq={faq} />
      <EditFaqDialog
        open={isEditFaqOpen}
        onOpenChange={setIsEditFaqOpen}
        initialValues={faq}
        parentRef={parentRef}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{faq.title}</CardTitle>
          <CardDescription>{faq.description}</CardDescription>
          <Badge
            variant={faq.isActive ? "default" : "destructive"}
            className="text-sm"
          >
            {faq.isActive ? "Active Course" : "Inactive Course"}
          </Badge>
          <CardAction className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditFaqOpen(true)}
            >
              <Edit2Icon />
            </Button>
            <Button size="icon" onClick={() => setOpen(true)}>
              <PlusCircleIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {faq.items.map((item) => (
              <FaqItemActions key={item.id} data={faq} selectedFaq={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqsPreview;
