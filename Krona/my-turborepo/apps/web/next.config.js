//ACA SE AGREGA LOS DOMINIOS DE LAS IAMGENES SEGUN SU THHPS O TIPOCO //NOMBRE

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rapratsupply.com",
            }, 
            {
                protocol: "https",
                hostname: "viara.cl",
            },
            {
                protocol: "https",
                hostname: "media.istockphoto.com"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            
        ],
    },
};

export default nextConfig;
