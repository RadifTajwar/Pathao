
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toBase64 } from "@/utils/toBase64";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];

const boardSchema = z.object({
  title: z.string().min(1, "Board title is required"),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      { message: "Max file size is 1MB." }
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      { message: "Only JPG, PNG, SVG allowed." }
    ),
});

interface CreateBoardFormProps {
  onCreate: (board: { id: string; title: string; image?: string }) => void;
}

export const CreateBoardForm = ({ onCreate }: CreateBoardFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
      image: undefined,
    },
  });

  const isPending = form.formState.isSubmitting;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (values: z.infer<typeof boardSchema>) => {
    let base64Image: string | undefined;

    if (values.image instanceof File) {
      base64Image = await toBase64(values.image);
    } else {

      base64Image = "/coffee.jpg";
    }

    const newBoard = {
      id: Date.now().toString(),
      title: values.title,
      image: base64Image,
    };

    onCreate(newBoard); // Pass to parent or save in localStorage etc.
    form.reset();
    setPreview(null);
  };


  return (<>

    
    <Card className="max-w-screen-xl mx-auto h-full border-none shadow-none px-6">
      <CardHeader className="flex px-7 pt-7 ">
        <CardTitle className="text-xl font-bold">Create a new Board</CardTitle>
      </CardHeader>

      <div className="px-7 pb-7">
        <Separator />
      </div>

      <CardContent className="p-7 border-2 border-dashed border-gray-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <p>Board Title</p>
                  <FormControl>
                    <Input placeholder="Enter Board Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-5">
                <Avatar className="w-16 h-16">
                  {preview ? (
                    <AvatarImage src={preview} alt="Preview" />
                  ) : (
                    <AvatarFallback>B</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-sm">Board Icon</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, SVG or JPEG, max 1mb
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => inputRef.current?.click()}
                    disabled={isPending}
                    className="mt-2 w-fit"
                  >
                    Upload Image
                  </Button>
                  <input
                    className="hidden"
                    type="file"
                    accept=".jpg, .png, .jpeg, .svg"
                    ref={inputRef}
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </div>
              </div>

            </div>


            <div className="flex flex-wrap justify-between  ">
              <Button type="button" variant="outline" className="p-6 mb-2">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="p-6">
                Create Board
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  </>
  );
};
