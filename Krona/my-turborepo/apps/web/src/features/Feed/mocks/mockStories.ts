import type { Story } from "../types/story.types";

export const mockStories: Story[] = [
    { 
        id:"1", 
        username:"Barberia_",
        initials:"BA",
        time: "hace 2h",
        slides:[ {
            type: "video",
            url:"https://pixabay.com/es/videos/download/x-101956_medium.mp4"
            }
        ]  
    },
    { 
        id:"2",
        username:"Super_Pastel_",
        initials:"SP",
        time: "hace 1h",
        slides:[
            {
                type: "video",
                url: "https://media.istockphoto.com/id/1494392115/video/cake-manufacturer.mp4?s=mp4-640x640-is&k=20&c=8LJR0QZMep8z-IlrV9o7fIQ0-GHD41RyNvf_GqjrYOM="
            }
        ]  
    },
    { 
        id:"3",
        username:"rap_ratcl",
        initials:"RR",
        time: "hace 3h", 
        slides:[
            {
                type: "image",
                url: "https://rapratsupply.com/cdn/shop/files/60D6D4F6-858F-402C-874B-B4564FB2CAB2.png?v=1779256736&width=1920"
            }
        ]  
    },
    { 
        id:"4",
        username:"Viara",
        initials:"VR", 
        time: "hace 2m", 
        slides:[
            {
                type: "image",
                url: "https://viara.cl/cdn/shop/files/IMG-9703.png?v=1770652210&width=600"
            }
        ]  
    },
    { 
        id:"5", 
        username:"Mecanico_C.S.M",
        initials:"MC", 
        time: "hace 32m", 
        slides:[
            {
                type: "video",
                url: "https://pixabay.com/es/videos/download/video-164477_medium.mp4"
            }
        ]  
    },
    {
        id:"6", 
        username:"3D_woo",
        initials:"3D", 
        time: "hace 17h", 
        slides:[
            {
                type: "video",
                url:"https://pixabay.com/es/videos/download/x-101956_medium.mp4"
            }
        ]  
    },
    { 
        id:"7",
        username:"Tecnico_ip",
        initials:"TI", 
        time: "hace 20h", 
        slides:[
            {
                type: "video",
                url: "https://www.shutterstock.com/shutterstock/videos/3833683631/preview/stock-footage-learn-effective-phone-repair-techniques-as-skilled-technicians-disassemble-and-fix-a-smartphone-in.webm"
            }
            
        ] 
     },

];