"use server";

import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courseCarouselItems } from "@/db/schema";

import { GetCarousel } from "./types";

cloudinary.config({
  cloud_name: "dfrb7mglo",
  api_key: "948178121471247",
  api_secret: "5pTBJnhaH6-iaF8V2BSMJX-D-bQ",
});

export interface CloudinaryImageResponse {
  public_id: string;
  secure_url: string;
  url: string;
}

export async function removeCarouselImage(
  carouselItem: Partial<GetCarousel["items"][number]>
) {
  try {
    if (carouselItem.id && carouselItem.appId) {
      await cloudinary.uploader.destroy(carouselItem?.appId, {
        resource_type: "image",
      });
      await db
        .delete(courseCarouselItems)
        .where(eq(courseCarouselItems.id, carouselItem.id));
      return { success: true, message: "" };
    }
    return { success: true, message: "Nothing to update!" };
  } catch {
    return {
      success: false,
      message: "Error while removing images!",
    };
  }
}

export async function uploadCarouselImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const carouselId = formData.get("carouselId") as string;
    const order = Number(formData.get("order")) ?? (0 as number);

    if (!file || !carouselId) {
      throw new Error("Missing image file or course ID.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryImageResponse>(
      (resolve, reject) => {
        const uploadStream: NodeJS.WritableStream =
          cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "courses",
              transformation: [{ quality: "auto", fetch_format: "webp" }],
            },
            (error: unknown, result: unknown) => {
              if (error) reject(error);
              else resolve(result as CloudinaryImageResponse);
            }
          );
        uploadStream.end(buffer);
      }
    );
    await db
      .insert(courseCarouselItems)
      .values({
        name: file.name,
        size: file.size,
        type: file.type,
        url: result.secure_url,
        appId: result.public_id,
        carouselId: carouselId,
        isActive: true,
        order: order,
      })
      .returning();
    revalidatePath(`/admin/courses`);

    return { success: true, message: "" };
  } catch {
    return {
      success: false,
      message: "Error while adding image!",
    };
  }
}
