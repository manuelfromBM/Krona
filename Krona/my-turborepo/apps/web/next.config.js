import path from "node:path";
import { fileURLToPath } from "node:url";

//ACA SE AGREGA LOS DOMINIOS DE LAS IAMGENES SEGUN SU THHPS O TIPOCO //NOMBRE

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  transpilePackages: ["@packages/services"],
=======
    outputFileTracingRoot: repoRoot,
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
>>>>>>> develop
};

export default nextConfig;
