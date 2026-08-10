import type { Story } from "../types/story.types";

export const mockStories: Story [] = [
    { 
        id:"1", 
        username:"Barberia_",
        avatar: "https://media.istockphoto.com/id/95421130/photo/neon-beauty-salon-sign.jpg?s=2048x2048&w=is&k=20&c=pXlgOby4OckSxSdBbmF69RQM05tkQylbbQKs_egnUd4=",
        initials:"BA",      
        time: "hace 2h",
        slides:[ {
            type: "video",
            url:"https://media.istockphoto.com/id/2213588347/video/barbers-opening-and-cleaning-the-barbershop.mp4?s=mp4-640x640-is&k=20&c=cRxQlPjeoxJiq_lals-cv9GfuWpW5gH439u9FeX10zY="
            }
        ]  
    },
    { 
        id:"2",
        username:"Super_Pastel_",
        avatar: "https://media.istockphoto.com/id/482852297/vector/bakery-design.jpg?s=2048x2048&w=is&k=20&c=o9h3IfKMGdRZdALH2dWD1YTgkfOL41EH6mnPI-OFDfA=",
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
        avatar: "https://media.istockphoto.com/id/1212330475/vector/clothes-and-accessories-logo-round-linear-of-clothes-hanger-on-white.jpg?s=2048x2048&w=is&k=20&c=SXyhw8YDGzZ9Au1owIfGAWtrBUA-VGXnYYitVm87IWU=",
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
        avatar: "https://media.istockphoto.com/id/1252976100/vector/luxury-beauty-eye-lashes-cosmetic-symbol-icon-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=CI0d4BUa_oZCfyI3-jQpOjPpyBmvoXjlKIyvlyo6W9M=",
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
        avatar: "https://media.istockphoto.com/id/1277509220/vector/shield-repair-logo-design-mechanic-tools-in-shield-vector-icon-car-repair-service-wrench.jpg?s=2048x2048&w=is&k=20&c=HyEvTLFl3ktwnlR8YCPnykdk5CPmdTDv8Jp5r2biMIU=",
        initials:"MC", 
        time: "hace 32m", 
        slides:[
            {
                type: "video",
                url: "https://www.pexels.com/es-es/download/video/14514408/"
            }
        ]  
    },
    {
        id:"6", 
        username:"3D PRINTER",
        avatar: "https://media.istockphoto.com/id/1408868161/vector/3d-printer-circle-badge-modern-logo-vector-icon-design-line-style.jpg?s=2048x2048&w=is&k=20&c=xY6H2BL3bOvAKQ9QBGcVtb0x6V9-vOxTOrUJOoJV6Z8=",
        initials:"3D", 
        time: "hace 17h", 
        slides:[
            {
                type: "video",
                url:"https://www.pexels.com/es-es/download/video/35598609/"
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