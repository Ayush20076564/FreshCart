import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export const uploadProductImage = async (imageFile) => {
  if (!imageFile) {
    return "";
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (imageFile.size > maxSizeInBytes) {
    throw new Error("Image size must be less than 5MB.");
  }

  const fileExtension = imageFile.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.round(
    Math.random() * 100000
  )}.${fileExtension}`;

  const imageRef = ref(storage, `products/${fileName}`);

  await uploadBytes(imageRef, imageFile);

  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
};