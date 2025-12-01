
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert } from "@/ui";
import { ChevronLeft, UserIcon } from "lucide-react";



export default function Home() {
  return (
     <div className="flex flex-col max-w-md text-body-xl p-5 gap-y-10 mt-10">سیی
       <Alert variant={"solid"} color={"warning"} size={"xl"} title="جهت ارسال سفارش آدرس خود را ثبت کنید" rightIcon={<ChevronLeft size="20"/>} leftIcon={<UserIcon size="20"/>}/>

 <Alert variant={"solid"} color={"error"} size={"xl"} title="جهت ارسال سفارش آدرس خود را ثبت کنید" rightIcon={<ChevronLeft size="20"/>} leftIcon={<UserIcon size="20"/>}/>
 <Alert variant={"outline"} color={"info"} size={"sm"} title="جهت ارسال سفارش آدرس خود را ثبت کنید" rightIcon={<ChevronLeft size="20"/>} leftIcon={<UserIcon size="20"/>}/>
<Alert variant={"outline"} color={"primary"} size={"xl"} title="جهت ارسال سفارش آدرس خود را ثبت کنید" rightIcon={<ChevronLeft size="20"/>} leftIcon={<UserIcon size="20"/>}/>


</div>
    
  );
}
