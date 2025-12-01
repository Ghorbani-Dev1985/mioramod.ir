
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui";
import { UserIcon } from "lucide-react";



export default function Home() {
  return (
     <div className="flex flex-col max-w-md text-body-xl p-5 gap-y-10 mt-10">سیی
      <Accordion type="single" collapsible>

  <AccordionItem variant="primary" rounded="lg" shadow="lg" value="1">
    <AccordionTrigger
      title="تنظیمات حساب"

      rightText="۳"
      icon={<UserIcon />}
    />
    <AccordionContent size="sm" contentBg={"subtle"}>
      محتوای تنظیمات حساب
    </AccordionContent>
  </AccordionItem>
</Accordion>

</div>
    
  );
}
