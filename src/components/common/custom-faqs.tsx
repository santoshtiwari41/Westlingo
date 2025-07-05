import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CustomSection from "./custom-section";

interface FAQ {
  id: string;
  description: string;
  title: string;
}

const CustomFaqs = ({
  items,
  title = "Frequenlty asked questions!",
  description = "Frequenlty asked questions!",
}: {
  title?: string;
  description?: string;
  items: FAQ[];
}) => {
  return (
    <CustomSection>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          {description}
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-background rounded-lg border px-6"
            >
              <AccordionTrigger className="py-6 text-left hover:no-underline">
                <span className="text-base font-semibold">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </CustomSection>
  );
};

export default CustomFaqs;
