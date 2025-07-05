import ImagesUpload from "@/components/common/images-upload";

import { GetCarousel } from "../../types";

interface CarouselItemFormProps {
  carousel: GetCarousel;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: GetCarousel["items"][number];
}

const CarouselItemForm = ({ carousel }: CarouselItemFormProps) => {
  return <ImagesUpload images={carousel.items} carouselId={carousel.id} />;
};

export default CarouselItemForm;
