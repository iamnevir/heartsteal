"use client";
import { api } from "@/convex/_generated/api";
import {  useQuery } from "convex/react";
import ImageSkeleton from "../image-skeleton";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ModelItem } from "../model-detail";

const ModelList = () => {
    const models=useQuery(api.model.getmodels)
    if(models===undefined){
        return <ImageSkeleton grid={4}/>
    }
    if(!models){
        return null
    }
  return (
    <div
      className={cn(
        " grid  gap-4 sm:pr-2 py-2 sm:py-10 xl:grid-cols-4 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4",
       
      )}
    >
     {models.map((item, index) => (
        <ModelItem item={item} key={index}/>
      ))}
    </div>
  );
};

export default ModelList;
