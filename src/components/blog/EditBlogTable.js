import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import Header from "../Header";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import axios from "axios";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import Image from "next/image";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const EditBlogTable = ({ singleBlog, id }) => {
  console.log(singleBlog);
  const router = useRouter();
  const [content, setContent] = useState("");
  const { updatedSuccess } = useContext(MiscellaneousContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const handleAllField = watch();

  useEffect(() => {
    console.log(singleBlog);
    reset(singleBlog);
  }, [singleBlog]);

  const [images, setImages] = useState();
  const onChange = (imageList) => {
    setImages(imageList);
  };

  useEffect(() => {
    reset(singleBlog);
  }, [singleBlog]);

  const updateBlog = async () => {
    const formData = new FormData();
    formData.append("title", handleAllField.title);
    formData.append("category", handleAllField.category);
    formData.append("featured", handleAllField.featured);
    formData.append("bestPick", handleAllField.bestPick);
    formData.append("description", content);
    if (images) {
      formData.append("thumbnail", images[0].file, images[0].file.name);
    }

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, formData);
      updatedSuccess();
      reset();
      console.log("Form has been submitted");
      router.push("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header pageTitle={`Blog / ${id}`} />

      <div>
        <form
          onSubmit={handleSubmit(updateBlog)}
          className="customCard p-3 overflow_hidden">
          <h4>Edit Blog </h4>
          <p className="customPrimaryTxtColor">To subscribe to this website, please enter your email address here. We will send updates occasionally.</p>

          <div className="row ">
            <label
              htmlFor="title"
              className="form-label p_zero_first_cap mt-3 h6 ">
              Title
            </label>
            <input
              className=" input_field_style form-control form-control-lg px-2 border-0  rounded-0"
              {...register("title", { required: "title is required" })}
              placeholder="title"
            />
            {errors.title && <p className="form_hook_error">{`${errors.title.message}`}</p>}
          </div>

          <div className="row">
            <label
              htmlFor="formFile"
              className="form-label px-0 mt-2 h6 ">
              Banner Image
            </label>

            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={["jpg", "png", "jpeg", "webp"]}>
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                <div className="upload__image-wrapper  px-0  w-100">
                  <button
                    type="button"
                    className=" input_field_style form-control form-control-lg mb-0  border-0  rounded-0"
                    onClick={onImageUpload}
                    {...dragProps}>
                    Select New Banner
                  </button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item margin_minus  d-flex gap-3">
                      <div className="banner_table_image_div">
                        <Image
                          src={image.data_url}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>

                      <div className="image-item__btn-wrapper">
                        <button
                          type="button"
                          onClick={() => onImageRemove(index)}
                          className="btn btn-danger btn rounded-0">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            {handleAllField.thumbnail && (
              <Image
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SECURE}${handleAllField.thumbnail}`}
                alt=""
                width="80"
                height={80}
                className="img-fluid custom-border-radius-50-per"
              />
            )}
          </div>

          <div className="row">
            <label
              htmlFor="category"
              className="form-label p_zero_first_cap mt-3 h6 ">
              Category
            </label>
            <input
              className=" input_field_style form-control form-control-lg px-2 border-0  rounded-0"
              {...register("category", { required: "category is required" })}
              placeholder="category"
            />
            {errors.category && <p className="form_hook_error">{`${errors.category.message}`}</p>}
          </div>

          <div className="row ">
            <label
              htmlFor="featured"
              className="form-label mt-3 p_zero_first_cap h6 ">
              Featured Blog
            </label>

            <select
              {...register("featured", { required: "featured is required" })}
              className="form-select input_field_style form-control form-control-lg mb-0  border-0  rounded-0"
              aria-label="Select featured">
              <option
                selected
                value={"Null"}>
                Select Featured or Not
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.featured && <p className="form_hook_error">{`${errors.featured.message}`}</p>}
          </div>

          <div className="row ">
            <label
              htmlFor="bestPick"
              className="form-label mt-3 p_zero_first_cap h6 ">
              Best Pick
            </label>

            <select
              {...register("bestPick", { required: "bestPick is required" })}
              className="form-select input_field_style form-control form-control-lg mb-0  border-0  rounded-0"
              aria-label="Select bestPick">
              <option
                selected
                value={"Null"}>
                Select bestPicB or Not
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.bestPick && <p className="form_hook_error">{`${errors.bestPick.message}`}</p>}
          </div>

          <div className="row">
            <label
              htmlFor="description"
              className="form-label p_zero_first_cap mt-3 h6 ">
              Description
            </label>

            <JoditEditor
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>

          <div className="mt-3 d-flex justify-content-end  gap-2">
            <Button
              type="submit"
              className="customCard px-4">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogTable;
