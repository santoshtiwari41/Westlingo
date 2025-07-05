"use server";

import { v2 as cloudinary } from "cloudinary";

export interface UploadResult {
  name: string;
  type: string;
  size: string;
  appId: string;
  url: string;
  config: unknown;
}
export interface CloudinaryImageResponse {
  public_id: string;
  secure_url: string;
  url: string;
  bytes: number;
}

cloudinary.config({
  cloud_name: "dfrb7mglo",
  api_key: "948178121471247",
  api_secret: "5pTBJnhaH6-iaF8V2BSMJX-D-bQ",
});

export async function uploadToCloudinary(
  formData: FormData,
  folder = "documents"
): Promise<UploadResult | { error: string }> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { error: "File is missing." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const resourceType = file.type.startsWith("image/") ? "image" : "raw";

    const result = await new Promise<CloudinaryImageResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: resourceType,
            folder: folder,
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      }
    );

    return {
      name: file.name,
      type: file.type,
      size: String(result.bytes),
      appId: result.public_id,
      url: result.secure_url,
      config: result,
    };
  } catch (error) {
    console.log(error);
    return { error: "Upload failed. Please try again." };
  }
}
