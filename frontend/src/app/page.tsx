import { Plus, SplinePointerIcon } from "lucide-react";
import { Button } from "../ui";



export default function Home() {
  return (
     <div className="flex flex-col max-w-md p-5 gap-y-10 mt-10">

     
     <Button color="primary" variant={"solid"} size={"sm"}>عنوان دکمه</Button>
     <Button color="primary" variant={"solid"} size={"md"}>دکمه دوم</Button>
     <Button color="primary" variant={"solid"} size={"lg"}>  <Plus />دکمه سوم<Plus /></Button>
     <Button color="primary" variant={"solid"} size={"lg"} disabled>دکمه سوم</Button>
     <hr/>
      <Button color="primary" variant={"outline"} size={"sm"}>عنوان دکمه</Button>
     <Button color="primary" variant={"outline"} size={"md"}>دکمه دوم</Button>
     <Button color="primary" variant={"outline"} size={"lg"}>دکمه سوم</Button>
     <Button color="primary" variant={"outline"} size={"lg"} disabled>دکمه سوم</Button>
     
     <hr/>
           <Button color="primary" variant={"ghost"} size={"sm"}>عنوان دکمه</Button>
     <Button color="primary" variant={"ghost"} size={"md"}>دکمه دوم</Button>
     <Button color="primary" variant={"ghost"} size={"lg"}>دکمه سوم</Button>
     <Button color="primary" variant={"ghost"} size={"lg"} disabled> <Plus />دکمه سوم<Plus /></Button>
     
     <hr/>
     <Button color="secondary" variant={"solid"} size={"sm"}>عنوان دکمه</Button>
     <Button color="secondary" variant={"solid"} size={"md"}>دکمه دوم</Button>
     <Button color="secondary" variant={"solid"} size={"lg"}>دکمه سوم</Button>
     <Button color="secondary" variant={"solid"} size={"lg"} disabled>دکمه سوم</Button>
     <hr/>
      <Button color="secondary" variant={"outline"} size={"sm"}>عنوان دکمه</Button>
     <Button color="secondary" variant={"outline"} size={"md"}>دکمه دوم</Button>
     <Button color="secondary" variant={"outline"} size={"lg"}>دکمه سوم</Button>
     <Button color="secondary" variant={"outline"} size={"lg"} disabled>دکمه سوم</Button>
     
     <hr/>
           <Button color="secondary" variant={"ghost"} size={"sm"}>عنوان دکمه</Button>
     <Button color="secondary" variant={"ghost"} size={"md"}>دکمه دوم</Button>
     <Button color="secondary" variant={"ghost"} size={"lg"}>دکمه سوم</Button>
     <Button color="secondary" variant={"ghost"} size={"lg"} disabled>دکمه سوم</Button>
     

     <hr/>
     <Button color="primary" variant={"solid"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="primary" variant={"solid"} size={"iconMd"}>   <Plus /></Button>
     <Button color="primary" variant={"solid"} size={"iconLg"}>   <Plus /></Button>
     <Button color="primary" variant={"solid"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr/> 
     <Button color="primary" variant={"outline"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="primary" variant={"outline"} size={"iconMd"}>   <Plus /></Button>
     <Button color="primary" variant={"outline"} size={"iconLg"}>   <Plus /></Button>
     <Button color="primary" variant={"outline"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr />
      <Button color="primary" variant={"ghost"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="primary" variant={"ghost"} size={"iconMd"}>   <Plus /></Button>
     <Button color="primary" variant={"ghost"} size={"iconLg"}>   <Plus /></Button>
     <Button color="primary" variant={"ghost"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr />
         <hr/>
     <Button color="secondary" variant={"solid"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="secondary" variant={"solid"} size={"iconMd"}>   <Plus /></Button>
     <Button color="secondary" variant={"solid"} size={"iconLg"}>   <Plus /></Button>
     <Button color="secondary" variant={"solid"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr/> 
     <Button color="secondary" variant={"outline"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="secondary" variant={"outline"} size={"iconMd"}>   <Plus /></Button>
     <Button color="secondary" variant={"outline"} size={"iconLg"}>   <Plus /></Button>
     <Button color="secondary" variant={"outline"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr />
      <Button color="secondary" variant={"ghost"} size={"iconSm"}>  <Plus /> </Button>
     <Button color="secondary" variant={"ghost"} size={"iconMd"}>   <Plus /></Button>
     <Button color="secondary" variant={"ghost"} size={"iconLg"}>   <Plus /></Button>
     <Button color="secondary" variant={"ghost"} size={"iconLg"} disabled>  <Plus /> </Button>
     <hr />
  



<Button disabled>
  <SplinePointerIcon className="size-4" />
  Loading…
</Button>
</div>
    
  );
}
