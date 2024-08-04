import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


function BlogButton() {
  return (
    <Link href="/">
      <Button variant="ghost" size="sm">
        /Blog
      </Button>
    </Link>
  );
}

export default BlogButton;
