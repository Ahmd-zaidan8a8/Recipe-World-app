import { Button, FormLabel, Input } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../services/api-client";

interface Props {
  setSelectedImage: Dispatch<React.SetStateAction<string>>;
}
const UploadImage = ({ setSelectedImage }: Props) => {
  const { register, handleSubmit , reset } = useForm();
  const [isUploaded , setIsUploaded] = useState(false);

  const onSubmit = (data: FieldValues) => {
    const file = data.images[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    apiClient
      .post("recipes/upload", formData)
      .then((res: any) => {
        setSelectedImage(res.data.file.filename);
        setIsUploaded(true);
      } )
      .catch((err) => console.log(err));
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <FormLabel htmlFor="image">Upload an image</FormLabel>
      {!isUploaded && <Input {...register("images")} id="image" type="file" />}
      {isUploaded && <Input color="green" value="Your image is uploaded successfully." isReadOnly  />}
      <Button mt={3} mr={2} type="submit" colorScheme="teal" isDisabled={isUploaded}>
        Upload
      </Button>
      {isUploaded && <Button mt={3} onClick={() => setIsUploaded(false)} colorScheme="teal">
        change the image
      </Button>}
    </form>
  );
};

export default UploadImage;
