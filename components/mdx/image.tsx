import Image from "next/image";

const ImageComponent = ({
  imgSrc,
  alt,
  caption,
  layout = "responsive",
  width = 700,
  height = 400,
  blurDataURL,
}: {
  imgSrc: string;
  alt: string;
  caption?: string;
  layout?: "fill" | "responsive";
  width?: number;
  height?: number;
  blurDataURL?: string;
}) => {
  return (
    <div className="relative" style={{ width: "100%", height: "auto", display: "block" }}>
      <Image
        src={imgSrc}
        alt={alt}
        layout={layout}
        width={width}
        height={height}
        style={{ objectFit: layout === "fill" ? "cover" : "contain" }}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
      {caption && (
        <div className="text-sm text-muted-foreground mt-[-12px] mb-4">
          {caption}
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
