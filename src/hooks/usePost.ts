import { createPostApi, getPostApi, updatePostApi } from "@/provider/post.api";
import {
  createPostSchema,
  updatePostSchema,
  type CreatePostForm,
  type UpdatePostForm,
} from "@/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// CreateUser hook
export const useCreatePost = () => {
  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { reset } = form;

  const onReset = () => {
    reset({
      title: "",
      description: "",
    });
  };

  const onSubmit = async (data: CreatePostForm) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      const res = await createPostApi(formData);
      const { message } = res.data;
      toast.success(message);
      onReset();
    } catch (err: any) {
      const res = err.response?.data;
      // Pydantic validation errors
      if (Array.isArray(res)) {
        res.forEach((e) => {
          form.setError(e.loc[0], {
            type: "server",
            message: e.msg,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { ...form, onSubmit, isLoading, onReset };
};

export const useUpdatePost = (postId?: number) => {
  const form = useForm<UpdatePostForm>({
    resolver: zodResolver(updatePostSchema),
  });

  const { reset, setError } = form;
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- FETCH & BIND ---------------- */
  useEffect(() => {
    if (!postId) return;

    getPostApi(postId).then((res) => {
      const post = res.data?.data;

      reset({
        title: post.title,
        description: post.description,
        status: post.status,
      });
    });
  }, [postId, reset]);

  /* ---------------- RESET ---------------- */
  const onReset = () => {
    reset({
      title: "",
      description: "",
      status: 0,
    });
  };

  /* ---------------- SUBMIT (UPDATE) ---------------- */
  const onSubmit = async (data: UpdatePostForm) => {
    if (!postId) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", data.status.toString());

      const res = await updatePostApi(postId, formData);
      const { message } = res.data;
      toast.success(message);
    } catch (err: any) {
      const res = err.response?.data;
      if (Array.isArray(res)) {
        res.forEach((e) => {
          setError(e.loc[0], {
            type: "server",
            message: e.msg,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    onSubmit,
    onReset,
    isLoading,
  };
};
