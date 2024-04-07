"use client";
import React, {  useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  MenuDataRequestBody,
  MenuDataResponseBody,
} from "../../../../../types/ApiMenuType";

import AddSubMenuData from "@/components/Admin/Menu/AddSubMenuData";
import { NavChild } from "../../../../../types/NavbarType";

import useApi from "@/hooks/api/useApi";
import Loading from "@/components/shared/Loading";


const CreateMenu = () => {
  const [img, setImg] = useState<File | undefined>(undefined);
  const [type, setType] = useState<"food" | "beverage">("food");
  const apiPost = useApi<MenuDataResponseBody>({
    key: ["menu"],
    method: "POST",
    url: `/${type || "food"}`,
    customConfig: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
  const validation = useFormik<
    Omit<MenuDataRequestBody, "image" | "order"> & {
      order: string | number;
      image?: any;
    }
  >({
    initialValues: {
      title: "",
      slug: "",
      children: [],
      order: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      slug: yup.string().required("Slug is required"),
      children: yup.array().of(yup.object()),
      order: yup.number().min(0),
    }),
    onSubmit: (values) => {
      const form = new FormData();
      form.append("title", values.title);
      form.append("slug", values.slug);
      form.append("order", values.order.toString());
      if (img) {
        form.append("image", img);
      }

      form.append("children", JSON.stringify(values.children));

      apiPost.post?.mutateAsync(form);
    },
  });

  return apiPost.post?.isPending ? (
    <Loading />
  ) : (
    <div className="flex flex-col text-black py-6 gap-2 px-4 bg-green-300 my-4 rounded-md">
      {apiPost.post?.isSuccess ? (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Success!</span>
        </div>
      ) : (
        <></>
      )}
      {/* TITLE */}
      <label
        className={`input input-bordered flex items-center gap-2 w-full ${
          validation.errors.title ? "input-error" : ""
        }`}
      >
        Title
        <input
          type="text"
          className="grow"
          value={validation.values.title}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          name="title"
          placeholder="Enter title"
        />
      </label>
      {/* SLUG */}
      <label
        className={`input input-bordered flex items-center gap-2 w-full ${
          validation.errors.slug ? "input-error" : ""
        }`}
      >
        Slug
        <input
          type="text"
          className="grow"
          value={validation.values.slug}
          name="slug"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          placeholder="Enter slug"
        />
      </label>
      <label
        className={`input input-bordered flex items-center gap-2 w-full ${
          validation.errors.order ? "input-error" : ""
        }`}
      >
        Order
        <input
          type="number"
          className="grow"
          value={validation.values.order}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          name="order"
          min={0}
          placeholder="Enter order"
        />
      </label>
      {/* TYPE */}
      <select
        className="select select-bordered w-full"
        onChange={(e) => setType(e.target.value as "food" | "beverage")}
        value={type}
      >
        <option value="food">Food</option>
        <option value="beverage">Beverage</option>
      </select>
      {/* IMAGE */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e?.target?.files?.[0])}
        className={`file-input file-input-bordered w-full`}
      />
      {/* CHILDREN */}

      <AddSubMenuData
        changeHandler={(value: NavChild[]) =>
          validation.setFieldValue("children", value)
        }
      />

      {/* Submit button */}
      <div
        onClick={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
        className="w-full btn-neutral btn"
      >
        Create
      </div>
    </div>
  );
};

export default CreateMenu;
