"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Frown } from "lucide-react";

export const SearchEmpty = () => {
  return (
    <div className="flex justify-center mt-10">
      <Alert variant="destructive" className="text-right w-full max-w-md">
        <Frown className="h-5 w-5 ml-2" />
        <AlertTitle>لم يتم العثور على نتائج</AlertTitle>
        <AlertDescription>
          تأكد من كتابة الاسم بشكل صحيح أو جرب مصطلحًا آخر.
        </AlertDescription>
      </Alert>
    </div>
  );
};
