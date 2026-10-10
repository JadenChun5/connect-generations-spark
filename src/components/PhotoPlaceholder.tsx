interface PhotoPlaceholderProps {
  children: string;
}

const PhotoPlaceholder = ({ children }: PhotoPlaceholderProps) => (
  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border-2 border-dashed border-primary bg-photo p-8 text-center text-base leading-relaxed text-foreground">
    <p className="max-w-[320px]">{children}</p>
  </div>
);

export default PhotoPlaceholder;