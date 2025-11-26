import { CheckIcon, EyeIcon, LockIcon, PhoneIcon, Plus } from "lucide-react";
import { Button, Input, Switch } from "../ui";





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
     <div className="w-full flex flex-col gap-y-2 p-4">

     <Switch />
     <Switch disabled/>
     <Switch size={"md"}/>
     <Switch size={"md"} disabled/>
     </div>

<Input label="نام کاربری" variant={"fill"} size={"sm"} placeholder="نام خود را وارد کنید" iconLeft={<LockIcon />} helperText="مثال" disabled/>
<Input label="نام کاربری" size={"md"} placeholder="نام خود را وارد کنید" disabled/>
<Input label="نام کاربری" variant={"fill"} size={"lg"} placeholder="نام خود را وارد کنید" disabled/>


<Input
  label="رمز عبور"
  variant="fill"
  type="password"
  helperText="رمز عبور حداقل 8 کاراکتر می باشد"
  iconLeft={<LockIcon />}
  iconRight={<EyeIcon />}
/>


<Input
  label="ایمیل"
  variant="success"
  value="user@example.com"
  helperText="ایمیل فعال را وارد نمایید"
  iconLeft={<CheckIcon />}
/>

<Input
  label="شماره تماس"
  variant="error"
  placeholder="09123456789"
  helperText="شماره تماس معتبر نیست"
  iconLeft={<PhoneIcon />}
/>
</div>
    
  );
}
